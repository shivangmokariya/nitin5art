import dbConnect from './mongodb';
import Painting from '@/models/Painting';

export interface SiteStats {
  totalPaintings: number;
  totalViews: number;
  averageRating: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  await dbConnect();

  // Get total paintings count
  const totalPaintings = await Painting.countDocuments();

  // Get total views across all paintings
  const totalViews = await Painting.aggregate([
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$views' }
      }
    }
  ]);

  // For now, we'll use a default rating since we don't have a rating system yet
  // In the future, you could add a Rating model and calculate the average
  const averageRating = 4.9;

  return {
    totalPaintings,
    totalViews: totalViews[0]?.totalViews || 0,
    averageRating
  };
} 