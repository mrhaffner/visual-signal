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
  newListName: (input: any) => void;
  deleteList: (id: string) => void;
  addCard: (input: string, list: ListInterface) => void;
  newCardName: (input: any) => void;
  deleteCard: (id: string) => void;
};

export const BoardContext = createContext<BoardState>({
  loading: false,
  error: undefined,
  board: null,
  newBoardName: () => {},
  onDragEnd: () => {},
  addList: () => {},
  newListName: () => {},
  deleteList: () => {},
  addCard: () => {},
  newCardName: () => {},
  deleteCard: () => {},
});

const useBoardContext = () => useContext(BoardContext);

export default useBoardContext;
