import mongoose from "mongoose";
import toJSON from "../connections/plugins/to-json.js";

const OrganizationConfigSchema = new mongoose.Schema({
  email: {
    no_reply: { type: String, required: true },
    customer: { type: String, required: true },
  },
  appName: String
}, { timestamps: true });

OrganizationConfigSchema.plugin(toJSON);

export default mongoose.model('organization_config', OrganizationConfigSchema);
