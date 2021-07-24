import React from 'react';
import Column from './Column';
import { ColumnInterface } from '../../board-data';

interface Props {
  columns: ColumnInterface[];
}

const ColumnList = React.memo(({ columns }: Props) => (
  <>
    {columns.map((column, index) => (
      <Column key={column.id} column={column} index={index} />
    ))}
  </>
));

export default ColumnList;
