import mongoose from 'mongoose';

export interface IPainting extends mongoose.Document {
  title: string;
  description: string;
  category: string;
  medium: string;
  size: string;
  imageUrl: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    alt: string;
    keywords: string[];
  };
  featured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PaintingSchema = new mongoose.Schema<IPainting>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      // enum: ['tanjore-paintings', 'sketch-painting', 'oil-paintings', 'portraits'],
    },
    medium: {
      type: String,
      // required: [true, 'Please provide the medium'],
      trim: true,
    },
    size: {
      type: String,
      // required: [true, 'Please provide the size'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    seo: {
      title: {
        type: String,
        required: [true, 'Please provide an SEO title'],
        maxlength: [60, 'SEO title cannot be more than 60 characters'],
      },
      description: {
        type: String,
        required: [true, 'Please provide an SEO description'],
        maxlength: [160, 'SEO description cannot be more than 160 characters'],
      },
      alt: {
        type: String,
        required: [true, 'Please provide alt text for the image'],
        maxlength: [125, 'Alt text cannot be more than 125 characters'],
      },
      keywords: [{
        type: String,
        trim: true,
      }],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search functionality
PaintingSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
  'seo.keywords': 'text',
});

// Create compound index for category and featured
PaintingSchema.index({ category: 1, featured: 1 });

export default mongoose.models.Painting || mongoose.model<IPainting>('Painting', PaintingSchema); 