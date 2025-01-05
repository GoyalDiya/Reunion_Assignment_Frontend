import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState("");
  const [priority, setPriority] = useState("");
  const [list, setList] = useState([]); 
  const [task, setTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://reunion-assignment-backend.onrender.com/api/tasks`);
      const data = await response.json();
      let filteredTasks = data;

      if (priority !== "") {
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
      }

      if (searchKey !== "") {
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(searchKey.toLowerCase())
        );
      }

      setList(filteredTasks); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  console.log({task});

  return (
    <TaskContext.Provider value={{ searchKey, setSearchKey, priority, setPriority, fetchData, list, setList, task, setTask, isModalOpen, setIsModalOpen }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
