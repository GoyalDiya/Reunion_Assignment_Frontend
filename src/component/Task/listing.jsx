import React, { useEffect } from 'react';
import { useTaskContext } from './task.context';
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

export const Listing = () => {
  const { searchKey, priority, fetchData, list, setList, setTask, setIsModalOpen } = useTaskContext(); 

  useEffect(() => {
    fetchData(); 
  }, [priority, searchKey]);

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setList(prevList => prevList.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete the task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };
  

  const handleEdit = (task) => {
    localStorage.setItem('editTask', JSON.stringify(task));
    setTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      
      {list.length > 0 ? (
        <ul className="space-y-4">
          {list.map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500"><strong>Priority:</strong> {task.priority}</p>
                <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
              </div>

              {/* Edit and Delete buttons */}
              <div className="flex justify-end mt-2 space-x-2">
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                >
                  <MdDeleteOutline />
                </button>
                <button 
                  onClick={() => handleEdit(task)}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
                >
                  <FiEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks found</p>  
      )}
    </div>
  );
};
