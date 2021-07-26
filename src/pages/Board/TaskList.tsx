import React from 'react';
import Task from './Task';
import { TaskInterface } from '../../board-data';

interface Props {
  tasks: TaskInterface[];
  columnId: string;

  deleteTask: (columnId: string, taskId: string) => void;
}

const TaskList = React.memo(({ tasks, columnId, deleteTask }: Props) => (
  <>
    {tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        columnId={columnId}
        deleteTask={deleteTask}
      />
    ))}
  </>
));

export default TaskList;
