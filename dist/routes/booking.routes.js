import express from "express";
import { getAutocomplete, getDistance } from "../services/geoapify/controller.js";
import { protect } from "../middlewares/auth.middleware.js";
var router = express.Router();
router.get('/autocomplete', protect, getAutocomplete).post('/distance', protect, getDistance);
export default router;