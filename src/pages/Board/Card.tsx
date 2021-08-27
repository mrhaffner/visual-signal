import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';
import useBoardContext from '../../hooks/useBoardContext';
import DeleteCardButton from '../../components/DeleteCardButton';
import InlineTextEditCard from '../../components/InlineTextEditCard';
import useHover from '../../hooks/useHover';

type BoardItemStylesProps = {
  isDragging: boolean;
};

// const Wrapper = styled.div<BoardItemStylesProps>`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
// `;

const Wrapper = styled.div<BoardItemStylesProps>`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: #f4f5f7;
    border-bottom-color: #091e4240;
  }
`;

const CardDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
`;

interface Props {
  card: CardInterface;
  index: number;
}

const Card = ({ card, index }: Props) => {
  const { deleteCard, newCardName } = useBoardContext();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <CardDetails ref={hoverRef}>
            <InlineTextEditCard
              text={card.name}
              onSetText={(text: string) =>
                newCardName({ _id: card._id, name: text })
              }
            />
            <DeleteCardButton
              handleDelete={deleteCard}
              id={card._id}
              isHovered={isHovered}
            />
          </CardDetails>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Card;
