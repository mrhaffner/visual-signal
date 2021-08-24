import { ApolloError } from '@apollo/client';
import { createContext, useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { BoardInterface, ListInterface } from '../types';

type BoardState = {
  loading: boolean;
  error: ApolloError | undefined;
  board: BoardInterface | null;
  onDragEnd: (result: DropResult) => void;
  newBoardName: (input: string) => void;
  addList: (input: string) => void;
  deleteList: (id: string) => void;
  addCard: (input: string, list: ListInterface) => void;
  deleteCard: (id: string) => void;
};

export const BoardContext = createContext<BoardState>({
  loading: false,
  error: undefined,
  board: null,
  newBoardName: () => {},
  onDragEnd: () => {},
  addList: () => {},
  deleteList: () => {},
  addCard: () => {},
  deleteCard: () => {},
});

const useBoardContext = () => useContext(BoardContext);

export default useBoardContext;
