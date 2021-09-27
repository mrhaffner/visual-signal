import { memo } from 'react';
import List from './List';
import { ListInterface } from '../../types';

interface Props {
  lists: ListInterface[];
}

const ListList = memo(({ lists }: Props) => (
  <>
    {lists.map((list, index) => (
      <List key={list._id} list={list} index={index} />
    ))}
  </>
));

export default ListList;
