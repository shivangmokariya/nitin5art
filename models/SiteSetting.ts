import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema({
  heroImageUrl: { type: String, required: false },
  artistImageUrl: { type: String, required: false },
  aboutText: { type: String, required: false },
  artistName: { type: String, required: false },
  artistExperience: { type: String, required: false },
  faviconUrl: { type: String, required: false },
});

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema); 