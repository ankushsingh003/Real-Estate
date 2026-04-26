import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

const REALTY_HOST = 'realty-in-us.p.rapidapi.com';

export const getProperties = async (req, res) => {
  try {
    const { location = '90004', marketType = 'sale', limit = 40 } = req.query;
    const cacheKey = `realty_list_v3_${location}_${marketType}`;

    if (cache.has(cacheKey)) {
      return res.json({ success: true, data: cache.get(cacheKey), source: 'cache' });
    }

    // New POST endpoint from user screenshot
    const url = `https://${REALTY_HOST}/properties/v3/list`;
    
    // Constructing body as shown in user screenshot
    const body = {
      limit: Number(limit),
      offset: 0,
      status: marketType === 'rent' ? ['for_rent'] : marketType === 'sold' ? ['sold'] : ['for_sale', 'ready_to_build'],
      sort: {
        direction: "desc",
        field: "list_date"
      }
    };

    // If location is a 5-digit number, treat as postal_code
    if (/^\d{5}$/.test(location)) {
      body.postal_code = location;
    } else {
      // Fallback to city/state parsing if it's a string
      const parts = location.split(',').map(s => s.trim());
      body.city = parts[0];
      if (parts[1]) body.state_code = parts[1].split(' ')[0];
    }

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': REALTY_HOST
      }
    });

    const results = response.data?.data?.home_search?.results || response.data?.data?.results || [];
    
    const mapped = results.map(item => {
      const loc = item.location?.address || {};
      const desc = item.description || {};
      const flags = item.flags || {};
      const photo = (item.primary_photo?.href || item.photos?.[0]?.href || '').replace('s.jpg', 'od-w480_h360_x2.jpg');

      return {
        id: item.property_id || item.listing_id,
        title: loc.line || loc.street_direction || 'Premium Property',
        location: [loc.city, loc.state_code, loc.postal_code].filter(Boolean).join(', '),
        price: item.list_price || item.price || item.sold_price || 0,
        priceLabel: marketType === 'sold' ? 'Sold For' : marketType === 'rent' ? 'Monthly Rent' : 'Asking Price',
        beds: desc.beds || 0,
        baths: desc.baths || desc.baths_full || 0,
        sqft: desc.sqft || 0,
        propertyType: desc.type?.replace(/_/g, ' ') || 'Residential',
        image: photo || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
        status: marketType === 'sold' ? 'SOLD' : marketType === 'rent' ? 'FOR_RENT' : 'FOR_SALE',
        views: Math.floor(Math.random() * 900) + 100,
        interestedCount: Math.floor(Math.random() * 40) + 2,
        bidCount: marketType === 'sale' ? Math.floor(Math.random() * 8) : 0,
        newListing: flags?.is_new_listing,
        priceReduced: flags?.is_price_reduced,
      };
    });

    cache.set(cacheKey, mapped);
    res.json({ success: true, data: mapped });

  } catch (error) {
    console.error("Realty API Search Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: error.response?.data?.message || error.message });
  }
};

export const getPropertyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `realty_detail_${id}`;

    if (cache.has(cacheKey)) {
      return res.json({ success: true, data: cache.get(cacheKey), source: 'cache' });
    }

    const url = `https://${REALTY_HOST}/properties/v3/detail?property_id=${id}`;
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': REALTY_HOST
      }
    });

    const raw = response.data?.data?.home || response.data?.data || {};
    const desc = raw.description || {};
    const loc = raw.location?.address || {};
    const advertiser = raw.advertisers?.[0] || {};
    const photos = (raw.photos || []).map((p) => p.href || p).filter(Boolean);

    const ROOM_TAGS = ['Living Room', 'Kitchen', 'Master Bedroom', 'Bathroom', 'Balcony', 'Ceiling', 'Dining Room', 'Backyard', 'Garage', 'Pool', 'Hallway', 'Laundry'];
    const gallery = photos.length > 0 
      ? photos.slice(0, 20).map((src, i) => ({ src, label: ROOM_TAGS[i] || `Room ${i+1}` }))
      : [];

    const details = {
      id: raw.property_id || id,
      title: loc.line || 'Premium Property',
      location: [loc.city, loc.state_code, loc.postal_code].filter(Boolean).join(', '),
      price: raw.list_price || raw.price || raw.sold_price || 0,
      beds: desc.beds || 0,
      baths: desc.baths || 0,
      sqft: desc.sqft || 0,
      lotSqft: desc.lot_sqft || 0,
      type: desc.type?.replace(/_/g, ' ') || 'Residential',
      yearBuilt: desc.year_built || '—',
      garage: desc.garage || 0,
      stories: desc.stories || 0,
      parking: desc.garage_type || 'Garage',
      description: raw.description?.text || raw.prop_description || 'A stunning property in a prime location.',
      gallery,
      features: raw.features?.map(f => f.text || f.category).filter(Boolean) || [],
      status: raw.status?.replace(/_/g, ' ') || 'Active',
      views: raw.page_view_count || Math.floor(Math.random() * 2000) + 500,
      saves: raw.save_count || Math.floor(Math.random() * 300) + 20,
      inquiries: raw.inquiry_count || Math.floor(Math.random() * 60) + 5,
      interestedCount: raw.inquiry_count || Math.floor(Math.random() * 80) + 10,
      daysOnMarket: raw.list_date ? Math.floor((Date.now() - new Date(raw.list_date)) / 86400000) : 0,
      mlsId: raw.source?.id || raw.listing_id || id,
      ownerName: advertiser.name || null,
      ownerPhone: advertiser.phones?.[0]?.number || null,
      ownerEmail: advertiser.email || null,
      priceHistory: raw.price_history || [],
      nearbySchools: raw.nearby_schools?.schools?.slice(0, 3) || [],
      county: loc.county || '',
      neighborhood: raw.location?.neighborhoods?.local?.name || '',
    };

    cache.set(cacheKey, details);
    res.json({ success: true, data: details });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
