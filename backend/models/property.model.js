import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  type: { type: String, enum: ['sale', 'rent'], required: true },
  category: { type: String, default: 'Residential' }, // Apartment, Villa, etc.
  images: [{ type: String }],
  features: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const Property = mongoose.model('Property', propertySchema);
