import { ReactNode } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { BoardContext } from '../hooks/useBoardContext';
import { useParams } from 'react-router-dom';
import useGetUpdateBoard from '../hooks/queries/useGetUpdateBoard';
import useNewBoardName from '../hooks/mutations/board/useNewBoardName';
import useDeleteBoard from '../hooks/mutations/board/useDeleteBoard';
import useAddList from '../hooks/mutations/board/useAddList';
import useNewListName from '../hooks/mutations/board/useNewListName';
import useDeleteList from '../hooks/mutations/board/useDeleteList';
import useAddCard from '../hooks/mutations/board/useAddCard';
import useNewCardName from '../hooks/mutations/board/useNewCardName';
import useDeleteCard from '../hooks/mutations/board/useDeleteCard';
import useUpdateListPos from '../hooks/mutations/board/useUpdateListPos';
import useReorderCardsSameList from '../hooks/mutations/board/useReorderCardsSameList';
import useReorderCardsAcrossLists from '../hooks/mutations/board/useReorderCardsAcrossLists';
import { Params } from '../types';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  let { boardId }: Params = useParams();

  const { loading, error, board, setBoard } = useGetUpdateBoard(boardId);

  const newBoardName = useNewBoardName(board, setBoard);
  const deleteBoard = useDeleteBoard();
  const addList = useAddList(board);
  const newListName = useNewListName(board);
  const deleteList = useDeleteList(board);
  const addCard = useAddCard(board, setBoard);
  const newCardName = useNewCardName(board);
  const deleteCard = useDeleteCard(board);
  const handleUpdateListPos = useUpdateListPos();
  const handleReorderCardsSameList = useReorderCardsSameList();
  const handleReorderCardsAcrossLists = useReorderCardsAcrossLists();

  const onDragEnd = (result: DropResult) => {
    if (!board) return;

    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      handleUpdateListPos(board, source, destination, setBoard);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      handleReorderCardsSameList(board, source, destination, setBoard);
      return;
    }

    handleReorderCardsAcrossLists(board, source, destination, setBoard);
  };

  return (
    <BoardContext.Provider
      value={{
        loading,
        error,
        board,
        onDragEnd,
        newBoardName,
        deleteBoard,
        addList,
        newListName,
        deleteList,
        addCard,
        newCardName,
        deleteCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
