import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useTaskContext } from './task.context';
import { TaskForm } from './TaskForm';
import { AiOutlineClose } from 'react-icons/ai'; 

export const FilterBar = () => {
  const { searchKey, setSearchKey, priority, setPriority, isModalOpen, setIsModalOpen } = useTaskContext();
  

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  // Handle priority select change
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between w-2/3 mx-auto mt-5">
      <div className="flex gap-5">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchKey}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        
        {/* Priority filter */}
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="p-2 border rounded-md"
        >
          <option value="">Sort by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Add Task Button */}
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded-md flex items-center">
        <FaPlus className="mr-2" /> Add Task
      </button>

      {/* Modal for adding task */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              {/* Close Button inside Modal */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose />
              </button>

              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <TaskForm closeModal={closeModal}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
