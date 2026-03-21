import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

  // URL of the backend server
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  /**
   * Fetch all food items from the database
   * This function sends a GET request to the backend
   */
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to retrieve food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Backend server might be offline");
    }
  }

  /**
   * Remove a food item by its unique ID
   * @param {string} foodId - The ID of the item to be deleted
   */
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      
      // Re-fetch the list to update the UI after deletion
      await fetchList();
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error occurred while removing the item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error");
    }
  }

  // Load the food list immediately when the component is rendered
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col w-[70%] ml-[5vw] mt-[50px] text-[#6d6d6d]'>
      <p className='mb-4 font-bold text-lg'>All Foods List</p>
      
      <div className="list-table">
        {/* Table Header Definitions */}
        <div className="list-table-format title hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Map through the list and render each food item */}
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 border border-gray-300 text-sm hover:bg-gray-50">
              <img className='w-[50px] rounded' src={`${url}/images/` + item.image} alt={item.name} />
              <p className='font-medium'>{item.name}</p>
              <p>{item.category}</p>
              <p className='text-orange-600 font-semibold'>${item.price}</p>
              {/* Click X to trigger the removeFood function */}
              <p onClick={() => removeFood(item._id)} className='cursor-pointer text-red-600 font-bold text-center hover:scale-110 transition-transform'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List