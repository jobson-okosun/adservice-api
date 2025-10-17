import express from 'express';
import { getOrganizationData } from '../controllers/app.controller.js';
var router = express.Router();
router.get('/', getOrganizationData);
export default router;