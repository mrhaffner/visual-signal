import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';
import useBoardContext from '../../hooks/useBoardContext';
import DeleteCardButton from '../../components/Buttons/DeleteCardButton';
import InlineTextEditCard from '../../components/Inputs/InlineTextEditCard';
import useHover from '../../hooks/useHover';
import { useState } from 'react';

interface BoardItemStylesProps {
  isDragging: boolean;
}

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

  /* transform: ${(props) => (props.isDragging ? 'rotate(45deg)' : '')}; */
  background-color: ${(props) => (props.isDragging ? 'white' : '')};

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
  const [cardText, setCardText] = useState(card.name);
  const handleSetText = (text: string) => {
    //could move this logic including state update to BoardProvider
    if (text.length) {
      setCardText(text);
      newCardName({ _id: card._id, name: text });
    }
  };

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
            <InlineTextEditCard text={cardText} onSetText={handleSetText} />
            <DeleteCardButton
              handleDelete={deleteCard}
              id={card._id}
              isHovered={isHovered}
              isDragging={snapshot.isDragging}
            />
          </CardDetails>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Card;
