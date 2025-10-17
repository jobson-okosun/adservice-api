import axios from 'axios';
import { GEOAPIFY } from '../../config/config.js';

export const getAutocomplete = async (req, res, next) => {
    try {
        const { text } = req.query;
        if (!text) {
            throw createError('Search query is required', 400);
        }

        const url = `${ GEOAPIFY.GEOAPIFY_BASE_URL }/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${ GEOAPIFY.GEOAPIFY_API_KEY }`;
        const response = await axios.get(url);

        res.json(response.data);
    } catch (err) {
        next(err);
    }
};

export const getDistance = async (req, res, next) => {
    try {
        const { pickup, destination } = req.body;
        if (!pickup || !destination) {
            throw createError('Pickup and destination are required', 400);
        }

        const url = `${ GEOAPIFY.GEOAPIFY_BASE_URL }/routematrix?apiKey=${ GEOAPIFY.GEOAPIFY_API_KEY }`;
        const requestBody = {
            mode: 'drive',
            units: "imperial",
            sources: [{ location: [pickup.lon, pickup.lat] }],
            targets: [{ location: [destination.lon, destination.lat] }]
        };

        const response = await axios.post(url, requestBody);
        res.json(response.data);
    } catch (err) {
        next(err);
    }
};