# Real Estate Property Pages — Setup Instructions

## Files to Replace

| Output File | Destination in your project |
|---|---|
| `PropertyCard.jsx` | `frontend/src/components/PropertyCard.jsx` |
| `Properties.jsx` | `frontend/src/pages/Properties.jsx` |
| `PropertyDetails.jsx` | `frontend/src/pages/PropertyDetails.jsx` |

## API Used: "Realty in US" (RapidAPI)

The app uses the **Realty in US** API by `apidojo` on RapidAPI.

**Subscribe here:** https://rapidapi.com/apidojo/api/realty-in-us

1. Go to the link above and click **Subscribe to Test**
2. Copy your RapidAPI key
3. In both `Properties.jsx` and `PropertyDetails.jsx`, replace the key at the top:
   ```js
   const RAPID_API_KEY = 'YOUR_KEY_HERE';
   ```

## What Each File Does

### PropertyCard.jsx
- Shows property thumbnail, price, beds/baths/sqft
- Displays status badge (For Sale / For Rent / Sold / Pending)
- Shows live stats: views, interested buyers, bid count
- Favorite button with animation
- Price/sqft calculated inline

### Properties.jsx
- Fetches real listings via `properties/v3/list`
- Tabs: For Sale / For Rent / Recently Sold
- Grid / List view toggle
- Graceful fallback with sample cards if API is not subscribed
- Parses city + state from `?location=City, ST` query param

### PropertyDetails.jsx
- Fetches via `properties/v3/detail?property_id=<id>`
- Full photo gallery with room labels (Living Room, Kitchen, Bathroom, Balcony, Ceiling, etc.)
- Thumbnail strip with show more/less toggle
- Owner / Agent card with real contact info from API
- Bid section: place bids, see active bids list
- Listing Activity: total views, interested buyers, saves, inquiries
- Days on market, MLS ID, neighborhood
- Price History timeline
- Property features & full details table
- Contact form + Schedule Tour widget
- At-a-glance sidebar summary

## No Changes Needed in App.jsx

The routing `/property/:id` already exists in your App.jsx and works as-is.

