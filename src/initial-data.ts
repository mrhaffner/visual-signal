export interface TaskInterface {
  id: string;
  content: string;
}

//make this generic????
export interface TasksInterface {
  'task-1': TaskInterface;
  'task-2': TaskInterface;
  'task-3': TaskInterface;
  'task-4': TaskInterface;
}

export interface ColumnInterface {
  id: string;
  title: string;
  taskIds: string[];
}

//make this generic????
export interface ColumnsInterface {
  'column-1': ColumnInterface;
  'column-2': ColumnInterface;
  'column-3': ColumnInterface;
}

interface iData {
  tasks: TasksInterface;
  columns: ColumnsInterface;
  columnOrder: string[];
}

const initialData: iData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
