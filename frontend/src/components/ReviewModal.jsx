import React, { useState } from 'react';
import { FiStar, FiX } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewModal = ({ order, url, token, setShowReviewModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReview = async () => {
    if (rating === 0) return toast.error("Please select a rating to continue! ⭐");
    
    setIsSubmitting(true);
    
    const reviewData = {
      foodId: order.items[0]._id, 
      rating,
      comment,
      userId: order.userId,
      userName: `${order.address.firstName} ${order.address.lastName}`
    };

    try {
      const response = await axios.post(url + "/api/review/add", reviewData, { headers: { token } });
      if (response.data.success) {
        toast.success("Thank you for your feedback! It helps us serve you better. ❤️");
        setShowReviewModal(false);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all'>
      <div className='bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300'>
        
        {/* Close Button */}
        <button 
          onClick={() => setShowReviewModal(false)} 
          className='absolute top-6 right-6 text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300'
        >
          <FiX size={24} />
        </button>

        {/* Title Section */}
        <div className='text-center mb-8'>
            <h3 className='text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2'>
              Rate Your <span className='text-orange-600'>Experience</span>
            </h3>
            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]'>
              Order ID: #{order._id.slice(-6)}
            </p>
        </div>
        
        {/* Star Rating Section */}
        <div className='flex gap-3 mb-10 justify-center'>
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar 
              key={star} 
              size={36} 
              className={`cursor-pointer transition-all duration-200 hover:scale-125 ${
                rating >= star ? 'fill-orange-600 text-orange-600' : 'text-gray-200'
              }`} 
              onClick={() => setRating(star)} 
            />
          ))}
        </div>

        {/* Feedback Input */}
        <textarea 
          className='w-full border-2 border-gray-100 p-6 rounded-[2rem] outline-none font-bold text-xs tracking-widest bg-gray-50/50 mb-8 h-40 transition-all focus:border-orange-500/20 focus:bg-white placeholder:text-gray-300 uppercase' 
          placeholder='How was the taste? share your thoughts...' 
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button 
          onClick={submitReview} 
          disabled={isSubmitting}
          className='bg-orange-600 text-white w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-orange-100 active:scale-95 disabled:bg-gray-400'
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;