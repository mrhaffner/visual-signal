import { ApolloError } from '@apollo/client';
import { createContext, useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { CardData, ListData, ListInterface } from '../types';

type BoardState = {
  loading: boolean;
  error: ApolloError | undefined;
  board: ListInterface[];
  onDragEnd: (result: DropResult) => void;
  addList: ({ title, index }: ListData) => void;
  deleteList: (listId: string) => void;
  newCard: ({ content, index, listId }: CardData) => void;
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
