import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../../types';
import useBoardContext from '../../../hooks/useBoardContext';
import DeleteCardButton from '../../../components/Buttons/DeleteCardButton';
import InlineTextEditCard from '../../../components/Inputs/InlineTextEditCard';
import useHover from '../../../hooks/useHover';
import { useEffect, useState } from 'react';
import { CardDetails, Wrapper } from './style';

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

  useEffect(() => {
    console.log(card.name);
    setCardText(card.name);
  }, [card]);

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
