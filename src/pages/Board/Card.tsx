import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';

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
  deleteCard: (listId: string, cardId: string) => void;
}

const Card = ({ card, index, listId, deleteCard }: Props) => (
  <Draggable draggableId={card._id} index={index}>
    {(provided, snapshot) => (
      <Wrapper
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <div>{card.content}</div>
        <button onClick={() => deleteCard(listId, card._id)}>Delete Me</button>
      </Wrapper>
    )}
  </Draggable>
);

export default Card;
