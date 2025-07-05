import mongoose from 'mongoose';

export interface IInquiry extends mongoose.Document {
  name: string;
  mobile: string;
  message: string;
  paintingId?: mongoose.Types.ObjectId;
  paintingTitle?: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new mongoose.Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Please provide your mobile'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [2000, 'Message cannot be more than 2000 characters'],
    },
    paintingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Painting',
    },
    paintingTitle: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Create index for status and date
InquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema); 