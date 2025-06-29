import dbConnect from './mongodb';
import Painting from '@/models/Painting';

export interface CategoryData {
  name: string;
  description: string;
  image: string;
  href: string;
  count: string;
}

export async function getCategoryData(): Promise<CategoryData[]> {
  await dbConnect();

  const categories = [
    { key: 'landscape', name: 'Landscapes', description: 'Breathtaking natural scenes' },
    { key: 'portrait', name: 'Portraits', description: 'Capturing human emotion' },
    { key: 'abstract', name: 'Abstract', description: 'Modern artistic expression' },
    { key: 'still-life', name: 'Still Life', description: 'Timeless beauty in objects' }
  ];

  const categoryData: CategoryData[] = [];

  for (const category of categories) {
    // Get count for this category
    const count = await Painting.countDocuments({ category: category.key });
    
    // Get a featured image for this category (first featured piece, or first piece if no featured)
    const featuredImage = await Painting.findOne({ 
      category: category.key 
    }).sort({ featured: -1, createdAt: -1 });

    categoryData.push({
      name: category.name,
      description: category.description,
      image: featuredImage?.imageUrl || `/uploads/default-${category.key}.jpg`,
      href: `/gallery?category=${category.key}`,
      count: `${count} piece${count !== 1 ? 's' : ''}`
    });
  }

  return categoryData;
} 