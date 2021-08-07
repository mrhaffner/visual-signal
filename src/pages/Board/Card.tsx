import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';
import { BoardContext } from '../../contexts/BoardProvider';
import { useContext } from 'react';

type BoardItemStylesProps = {
  isDragging: boolean;
};

const Wrapper = styled.div<BoardItemStylesProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

interface Props {
  card: CardInterface;
  index: number;
  listId: string;
}

const Card = ({ card, index, listId }: Props) => {
  // @ts-ignore comment
  const { deleteCard } = useContext(BoardContext);
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>{card.content}</div>
          <button onClick={() => deleteCard(listId, card._id)}>
            Delete Me
          </button>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Card;
