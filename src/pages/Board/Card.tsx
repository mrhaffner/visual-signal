import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';
import useBoardContext from '../../hooks/useBoardContext';
import DeleteButton from '../../components/DeleteButton';
import EditableTextInput from '../../components/EditableTextInput';

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
}

const Card = ({ card, index }: Props) => {
  const { deleteCard, newCardName } = useBoardContext();

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <EditableTextInput
            text={card.name}
            onSetText={(text: string) =>
              newCardName({ _id: card._id, name: text })
            }
          />
          <DeleteButton handleDelete={deleteCard} id={card._id} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Card;
