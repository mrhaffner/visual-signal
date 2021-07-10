import React from 'react';
import Column from './Column'
import { ColumnInterface, TasksInterface } from '../../initial-data';

interface InnerListProps {
    column: ColumnInterface
    taskMap: TasksInterface
    index: number
}

const ColumnList = React.memo(({ column, taskMap, index }: InnerListProps) => {
    //make this generic or use a type guard???
    const tasks = column.taskIds.map(taskId => taskMap[taskId as keyof TasksInterface]);
  
    return (
      <Column column={column} tasks={tasks} index={index}/>
    )
})

export default ColumnList