'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface InquiryFormData {
  name: string;
  mobile: string;
  message: string;
}

interface InquiryFormProps {
  paintingId?: string;
  paintingTitle?: string;
  onSuccess?: () => void;
}

export default function InquiryForm({ paintingId, paintingTitle, onSuccess }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>();

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          paintingId,
          paintingTitle,
        }),
      });

      if (response.ok) {
        toast.success('Your inquiry has been sent successfully!');
        reset();
        onSuccess?.();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {paintingTitle && (
        <div className="bg-secondary-50 p-3 rounded-lg">
          <p className="text-sm text-secondary-600">
            <span className="font-medium">Inquiring about:</span> {paintingTitle}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className="input-field"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-secondary-700 mb-1">
          Mobile Number *
        </label>
        <input
          type="tel"
          id="mobile"
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: 'Please enter a valid mobile number'
            }
          })}
          className="input-field"
          placeholder="Your mobile number"
        />
        {errors.mobile && (
          <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', { 
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
            maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
          })}
          className="input-field resize-none"
          placeholder="Tell us about your interest in this piece, any questions you have, or if you'd like to discuss a custom commission..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-secondary-500 text-center">
        We'll get back to you within 24-48 hours. Your information is secure and will only be used to respond to your inquiry.
      </p>
    </form>
  );
} 