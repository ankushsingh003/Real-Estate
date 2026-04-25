import express from 'express';
import { getProperties, getPropertyDetails } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/search', getProperties);
router.get('/details/:id', getPropertyDetails);

export default router;
