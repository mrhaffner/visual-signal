import React from 'react';
import Column from './Column';
import { ColumnInterface } from '../../board-data';

interface Props {
  columns: ColumnInterface[];
  deleteColumn: (columnId: string) => void;
  newTask: (columnId: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
}

const ColumnList = React.memo(
  ({ columns, deleteColumn, newTask, deleteTask }: Props) => (
    <>
      {columns.map((column, index) => (
        <Column
          key={column.id}
          column={column}
          index={index}
          deleteColumn={deleteColumn}
          newTask={newTask}
          deleteTask={deleteTask}
        />
      ))}
    </>
  ),
);

export default ColumnList;
