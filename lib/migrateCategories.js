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
    
    console.log('🔄 Starting category migration...');
    
    // Get all paintings with old categories
    const paintings = await Painting.find({
      category: { $in: Object.keys(categoryMapping) }
    });
    
    console.log(`📊 Found ${paintings.length} paintings to migrate`);
    
    if (paintings.length === 0) {
      console.log('✅ No paintings need migration');
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
        console.log(`✅ Migrated "${painting.title}" from "${oldCategory}" to "${newCategory}"`);
      }
    }
    
    console.log('🎉 Category migration completed successfully!');
    
    // Show summary
    const categoryCounts = await Painting.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📈 Current category distribution:');
    categoryCounts.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} paintings`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { migrateCategories };
} 