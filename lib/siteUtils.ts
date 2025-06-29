import dbConnect from './mongodb';
import SiteSetting from '@/models/SiteSetting';

export interface SiteSettings {
  heroImageUrl: string;
  artistImageUrl: string;
  aboutText: string;
  artistName: string;
  artistExperience: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await dbConnect();
  
  const settings = await SiteSetting.findOne();
  
  return {
    heroImageUrl: settings?.heroImageUrl || '/uploads/default-hero.jpg',
    artistImageUrl: settings?.artistImageUrl || '/uploads/default-artist.jpg',
    aboutText: settings?.aboutText || 'With over 15 years of experience in paint sketch artistry, I\'ve dedicated my life to capturing the world\'s beauty through color and texture. Each piece is created with passion and attention to detail, ensuring that every artwork tells a unique story.',
    artistName: settings?.artistName || 'Professional Artist',
    artistExperience: settings?.artistExperience || '15+ Years Experience'
  };
} 