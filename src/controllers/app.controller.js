import { getOrgConfig } from "../loaders/config-loader.js"

export const getOrganizationData = (req, res) => {
    const { address, phone, email, pricing } = getOrgConfig()

    const data = { address, phone, email, pricing }
    res.status(200).json({ messagge: 'successful', data})
}