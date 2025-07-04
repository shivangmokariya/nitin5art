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
    { key: 'tanjore-paintings', name: 'Tanjore Paintings', description: 'Traditional South Indian art with rich colors and gold leaf' },
    { key: 'sketch-painting', name: 'Sketch Paintings', description: 'Detailed pencil and charcoal artwork' },
    { key: 'oil-paintings', name: 'Oil Paintings', description: 'Classic oil on canvas masterpieces' },
    { key: 'portraits', name: 'Portraits', description: 'Capturing human emotion and character' }
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