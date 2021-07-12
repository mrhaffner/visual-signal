import React from 'react';
import Task from './Task';
import { TaskInterface } from '../../initial-data';

interface InnerListProps {
  tasks: TaskInterface[];
}

const TaskList = React.memo(({ tasks }: InnerListProps) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
));

export default TaskList;
