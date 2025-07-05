import dbConnect from './mongodb';
import SiteSetting from '@/models/SiteSetting';

export async function checkDatabase() {
  try {
    await dbConnect();
    
    // Check all site settings
    const settings = await SiteSetting.find({});
    
    // Check if there's any setting with artistImageUrl
    const settingWithImage = await SiteSetting.findOne({ artistImageUrl: { $exists: true } });
    
    return {
      allSettings: settings,
      settingWithImage
    };
  } catch (error) {
    console.error('Database check error:', error);
    throw error;
  }
} 