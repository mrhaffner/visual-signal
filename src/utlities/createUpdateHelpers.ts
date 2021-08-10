import { ListData, ListInterface } from '../types';

export const addListState = (
  { title, index }: ListData,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const list = {
    //need to feed proper ID
    _id: `${Math.random()}`,
    title,
    index,
    cards: [],
  };
  const newBoard = [...boardState, list];
  setBoardState(newBoard);
};

// export const addCardState = ({ content, index, listId }: CardData) => {
//   const card = {
//     _id: `${Math.random()}`,
//     content,
//     index,
//   };

//   // @ts-ignore comment
//   const cardList = board.find((x) => x._id === listId).cards;
//   const newCardList = [...cardList, card];

//   const newBoard = board.map((x) =>
//     x._id === listId ? { ...x, cards: newCardList } : x,
//   );
//   setBoard(newBoard);
// };
