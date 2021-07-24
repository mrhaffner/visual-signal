export interface TaskInterface {
  id: string;
  content: string;
}

export interface ColumnInterface {
  id: string;
  title: string;
  tasks: TaskInterface[];
}

const boardData: ColumnInterface[] = [
  {
    id: 'column-1',
    title: 'To do',
    tasks: [
      { id: 'task-1', content: 'Take out the garbage' },
      { id: 'task-2', content: 'Watch my favorite show' },
      { id: 'task-3', content: 'Charge my phone' },
      { id: 'task-4', content: 'Cook dinner' },
    ],
  },
  {
    id: 'column-2',
    title: 'In progress',
    tasks: [],
  },
  {
    id: 'column-3',
    title: 'Done',
    tasks: [],
  },
];

export default boardData;
