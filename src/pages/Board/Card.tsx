import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CardInterface } from '../../types';
import useBoardContext from '../../hooks/useBoardContext';
import { useMutation } from '@apollo/client';
import { DELETE_CARD } from '../../graphql/mutations/all';
import DeleteButton from '../../components/DeleteButton';

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
  const { deleteCard } = useBoardContext();

  const [deleteCardMutation, { data, loading, error }] =
    useMutation(DELETE_CARD);

  const handleDelete = () => {
    try {
      deleteCardMutation({ variables: { deleteCardId: card._id } });
      deleteCard(listId, card._id);
    } catch (e) {
      console.log(e);
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
          <div>{card.content}</div>
          <DeleteButton handleDelete={handleDelete} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Card;
