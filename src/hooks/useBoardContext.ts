import { ApolloError } from '@apollo/client';
import { createContext, useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { OutputData } from '../types';
import { ListInterface } from '../types';

type BoardState = {
  loading: boolean;
  error: ApolloError | undefined;
  board: ListInterface[];
  onDragEnd: (result: DropResult) => void;
  addList: ({ input, index }: OutputData) => void;
  deleteList: (listId: string) => void;
  newCard: ({ input, index, listId }: OutputData) => void;
  deleteCard: (listId: string, cardId: string) => void;
};

export const BoardContext = createContext<BoardState>({
  loading: false,
  error: undefined,
  board: [],
  onDragEnd: () => {},
  addList: () => {},
  deleteList: () => {},
  newCard: () => {},
  deleteCard: () => {},
});

const useBoardContext = () => useContext(BoardContext);

export default useBoardContext;
