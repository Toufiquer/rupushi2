import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().regex(/^\d{10}$/, { message: 'Mobile number must be 10 digits' }),
  address: z.string().optional(),
  deliveryOption: z.enum(['standard', 'express']),
});

type FormData = z.infer<typeof formSchema>;

const FormComponent: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mobile: '',
      address: '',
      deliveryOption: 'standard',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock API response - in real app, replace with actual API call
      console.log('Form submitted:', data);

      setSubmitSuccess(true);
      // Reset form or redirect user as needed
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitSuccess(false);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="px-6 py-8">
        <motion.h2
          className="text-2xl font-bold text-start text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Customer Information
        </motion.h2>

        {submitSuccess === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
          >
            Form submitted successfully!
          </motion.div>
        )}

        {submitSuccess === false && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {errorMessage || 'An error occurred during submission.'}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className="relative">
              <input
                type="text"
                id="name"
                {...register('name')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                  ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>
          </div>

          <div>
            <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
              Your Mobile Number <span className="text-red-500">*</span>
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className="relative">
              <input
                type="tel"
                id="mobile"
                {...register('mobile')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all
                  ${errors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                placeholder="Enter your mobile number"
              />
              {errors.mobile && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.mobile.message}
                </motion.p>
              )}
            </motion.div>
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Your Complete Address
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className="relative">
              <textarea
                id="address"
                {...register('address')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                rows={3}
                placeholder="Enter your complete address"
              />
            </motion.div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Delivery Charge</label>
            <div className="space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <label
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all
                  bg-green-100 border-green-300`}
                >
                  <input
                    type="radio"
                    value="standard"
                    {...register('deliveryOption')}
                    className="form-radio h-5 w-5 text-green-600"
                  />
                  <span className="ml-2 text-gray-700">Standard Delivery - ৳130</span>
                </label>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <label
                  className="flex items-center p-3 border rounded-lg cursor-pointer transition-all
                  bg-gray-100 border-gray-300"
                >
                  <input
                    type="radio"
                    value="express"
                    {...register('deliveryOption')}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Express Delivery - ৳60</span>
                </label>
              </motion.div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              'Submit Form'
            )}
          </motion.button>
        </form>
      </div>

      {/* Floating help button for user satisfaction */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => alert('Help functionality would be implemented here')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FormComponent;
