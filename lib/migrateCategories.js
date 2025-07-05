import dbConnect from './mongodb';
import Painting from '@/models/Painting';

const categoryMapping = {
  'landscape': 'tanjore-paintings',
  'portrait': 'portraits', 
  'abstract': 'oil-paintings',
  'still-life': 'sketch-painting',
  'other': 'oil-paintings'
};

export async function migrateCategories() {
  try {
    await dbConnect();
    
    // Get all paintings with old categories
    const paintings = await Painting.find({
      category: { $in: Object.keys(categoryMapping) }
    });
    
    if (paintings.length === 0) {
      return;
    }
    
    // Update each painting
    for (const painting of paintings) {
      const oldCategory = painting.category;
      const newCategory = categoryMapping[oldCategory];
      
      if (newCategory) {
        await Painting.updateOne(
          { _id: painting._id },
          { $set: { category: newCategory } }
        );
      }
    }
    
    // Show summary
    const categoryCounts = await Painting.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
  } catch (error) {
    throw error;
  }
}

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { migrateCategories };
} 