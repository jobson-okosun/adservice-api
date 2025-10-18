import { getOrgConfig } from "../loaders/config-loader.js";
export var getOrganizationData = function getOrganizationData(req, res) {
  var _getOrgConfig = getOrgConfig(),
    address = _getOrgConfig.address,
    phone = _getOrgConfig.phone,
    email = _getOrgConfig.email,
    pricing = _getOrgConfig.pricing;
  var data = {
    address: address,
    phone: phone,
    email: email,
    pricing: pricing
  };
  res.status(200).json({
    messagge: 'successful',
    data: data
  });
};