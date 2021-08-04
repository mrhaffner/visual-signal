import React from 'react';
import List from './List';
import { FormData } from './index';
import { ListInterface } from '../../types';

interface Props {
  lists: ListInterface[];
  deleteList: (listId: string) => void;
  newCard: (listId: string, data: FormData) => void;
  deleteCard: (listId: string, cardId: string) => void;
}

const ListList = React.memo(
  ({ lists, deleteList, newCard, deleteCard }: Props) => (
    <>
      {lists.map((list, index) => (
        <List
          key={list._id}
          list={list}
          index={index}
          deleteList={deleteList}
          newCard={newCard}
          deleteCard={deleteCard}
        />
      ))}
    </>
  ),
);

export default ListList;
