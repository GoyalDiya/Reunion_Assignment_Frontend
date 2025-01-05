import React from 'react'
import { FilterBar } from './filter-bar'
import { Listing } from './listing'
import { TaskProvider } from './task.context'

export const TaskManagement = () => {
  return (
    <TaskProvider>
        <FilterBar/>
        <Listing/>
    </TaskProvider>
  )
}
