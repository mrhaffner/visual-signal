import { ApolloError } from '@apollo/client';
import { createContext, useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ListInterface } from '../types';

type BoardState = {
  loading: boolean;
  error: ApolloError | undefined;
  board: ListInterface[];
  onDragEnd: (result: DropResult) => void;
  addList: (input: string) => void;
  deleteList: (idList: string) => void;
  addCard: (input: string, list: ListInterface) => void;
  deleteCard: (idList: string, cardId: string) => void;
};

export const BoardContext = createContext<BoardState>({
  loading: false,
  error: undefined,
  board: [],
  onDragEnd: () => {},
  addList: () => {},
  deleteList: () => {},
  addCard: () => {},
  deleteCard: () => {},
});

const useBoardContext = () => useContext(BoardContext);

export default useBoardContext;
