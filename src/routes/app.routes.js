import express from 'express';
import { getOrganizationData } from '../controllers/app.controller.js';

const router = express.Router();

router
    .get('/', getOrganizationData) 

export default router;
