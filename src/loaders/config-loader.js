import organizationConfig from "../models/organization-config.js";

let orgConfigCache = null;

export const loadOrgConfig = async () => {
    if (!orgConfigCache) {
        orgConfigCache = await organizationConfig.findOne();
        if (!orgConfigCache) {
            throw new Error('Organization config not found in database');
        }
    }
    return orgConfigCache;
};

export const getOrgConfig = () => {
    if (!orgConfigCache) {
        throw new Error('Organization config has not been loaded yet');
    }
    return orgConfigCache.toObject();
};
