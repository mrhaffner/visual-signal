import React from 'react';
import Task from './Task';
import { TaskInterface } from '../../board-data';

interface Props {
  tasks: TaskInterface[];
}

const TaskList = React.memo(({ tasks }: Props) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
));

export default TaskList;
