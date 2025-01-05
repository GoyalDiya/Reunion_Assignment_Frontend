import React, { useEffect, useState } from 'react';
import { useTaskContext } from './task.context';

export const TaskForm = ({ closeModal }) => {
  const { fetchData, task } = useTaskContext(); 
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 'Pending',
    priority: 'Medium',
  });

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(task) {
        const response1 = await fetch(`http://localhost:8000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(taskDetails),
      });
      if (response1.ok) {
        closeModal();
        fetchData();
      } else {
        console.error('Failed to create task');
      }
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDetails),
      });

      if (response.ok) {
        closeModal();
        fetchData();
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    if (task) {
      setTaskDetails({
        title: task.title,
        description: task.description,
        startTime: task.startTime,
        endTime: task.endTime,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-semibold">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskDetails.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold">Description</label>
        <textarea
          id="description"
          name="description"
          value={taskDetails.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block font-semibold">Start Time</label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={taskDetails.startTime}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block font-semibold">End Time</label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={taskDetails.endTime}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="status" className="block font-semibold">Status</label>
        <select
          id="status"
          name="status"
          value={taskDetails.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="priority" className="block font-semibold">Priority</label>
        <select
          id="priority"
          name="priority"
          value={taskDetails.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
        Add Task
      </button>
    </form>
  );
};
