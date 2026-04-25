import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

const RAPID_API_KEY = process.env.RAPID_API_KEY || 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
const RAPID_API_HOST = 'redfin-com-data.p.rapidapi.com';

export const getProperties = async (req, res) => {
  try {
    const { location, marketType = 'sale', limit = 20 } = req.query;
    const cacheKey = `properties_${location}_${marketType}_${limit}`;

    // Check Cache
    if (cache.has(cacheKey)) {
      return res.json({ success: true, data: cache.get(cacheKey), source: 'cache' });
    }

    const endpoint = marketType === 'rent' ? 'property/search-rent' : marketType === 'sold' ? 'properties/search-sold' : 'properties/search-sale';
    const url = `https://${RAPID_API_HOST}/${endpoint}?location=${encodeURIComponent(location || 'California')}&limit=${limit}`;

    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    });

    const result = response.data.data || [];
    
    const mapped = result.map(item => {
      const home = item.homeData || item;
      const rental = item.rentalExtension || {};
      const info = home.propertyInfo || {};
      const pId = home.propertyId || home.listingId;
      
      const finalImage = item.imgSrc || 
                         `https://ssl.cdn-redfin.com/photo/8/islphoto/${pId}_0.jpg` ||
                         home.photosInfo?.poster || 
                         home.staticMapUrl ||
                         "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200";

      return {
        id: pId,
        title: home.addressInfo?.formattedStreetLine || home.streetAddress || "Premium Property",
        location: home.addressInfo ? `${home.addressInfo.city}, ${home.addressInfo.state}` : "Location Available",
        price: home.priceInfo?.amount || rental.rentPriceRange?.min || home.price || 0,
        beds: info.bedrooms || rental.bedRange?.min || home.beds || 0,
        baths: info.bathrooms || rental.bathRange?.min || home.baths || 0,
        sqft: info.sqft || rental.sqftRange?.min || home.squareFootage || 0,
        type: home.propertyType || (marketType === 'rent' ? "Apartment" : "Residential"),
        image: finalImage,
        status: marketType.toUpperCase(),
        url: home.url
      };
    });

    cache.set(cacheKey, mapped);
    res.json({ success: true, data: mapped, source: 'api' });

  } catch (error) {
    console.error("Backend Properties Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `details_${id}`;

    if (cache.has(cacheKey)) {
      return res.json({ success: true, data: cache.get(cacheKey), source: 'cache' });
    }

    // Try plural first
    let response;
    try {
      response = await axios.get(`https://${RAPID_API_HOST}/properties/get-details?propertyId=${id}`, {
        headers: { 'x-rapidapi-key': RAPID_API_KEY, 'x-rapidapi-host': RAPID_API_HOST }
      });
    } catch (e) {
      // Fallback to singular
      response = await axios.get(`https://${RAPID_API_HOST}/property/get-details?propertyId=${id}`, {
        headers: { 'x-rapidapi-key': RAPID_API_KEY, 'x-rapidapi-host': RAPID_API_HOST }
      });
    }

    const rawData = response.data.data || response.data;
    const data = rawData.homeData || rawData;
    const rental = rawData.rentalExtension || {};
    const pId = rawData.propertyId || id;
    
    const cdnGallery = [0, 1, 2, 3, 4].map(i => `https://ssl.cdn-redfin.com/photo/8/islphoto/${pId}_${i}.jpg`);

    const details = {
      id: pId,
      title: data.addressInfo?.formattedStreetLine || data.streetAddress || "Premium Estate",
      location: data.addressInfo ? `${data.addressInfo.city}, ${data.addressInfo.state} ${data.addressInfo.zip}` : "Location Available",
      price: data.priceInfo?.amount || rental.rentPriceRange?.min || data.price || 0,
      beds: data.propertyInfo?.bedrooms || rental.bedRange?.min || data.beds || 0,
      baths: data.propertyInfo?.bathrooms || rental.bathRange?.min || data.baths || 0,
      sqft: data.propertyInfo?.sqft || rental.sqftRange?.min || data.squareFootage || 0,
      type: data.propertyType || "Residential",
      description: data.description || rental.description || data.remarks || "Experience the pinnacle of modern living with this stunning architectural masterpiece.",
      gallery: (data.photosInfo?.imgSrcs && data.photosInfo.imgSrcs.length > 0) ? data.photosInfo.imgSrcs : cdnGallery,
      features: data.amenities || ["Central Air", "Fireplace", "High Ceilings", "Smart Home Ready"],
      status: data.propertyStatus || "Active"
    };

    cache.set(cacheKey, details);
    res.json({ success: true, data: details });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
