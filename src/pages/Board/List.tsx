import CardList from './CardList';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CardData, ListInterface } from '../../types';
import { useMutation } from '@apollo/client';
import CreateForm from '../../components/CreateForm';
import useBoardContext from '../../hooks/useBoardContext';
import { CREATE_CARD, DELETE_LIST } from '../../graphql/mutations/all';
import DeleteButton from '../../components/DeleteButton';

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

type BoardItemStylesProps = {
  isDraggingOver: boolean;
};

const Container = styled.div<BoardItemStylesProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  list: ListInterface;
  index: number;
}

const List = ({ list, index }: Props) => {
  const { deleteList, newCard } = useBoardContext();

  const [deleteListMutation] = useMutation(DELETE_LIST);

  const handleDelete = () => {
    try {
      deleteListMutation({ variables: { deleteListId: list._id } });
      deleteList(list._id);
    } catch (e) {
      console.log(e);
    }
  };

  const [newCardMutation] = useMutation(CREATE_CARD);

  const handleCreateCard = (input: string) => {
    try {
      const cardObject: CardData = {
        content: input,
        index: list.cards.length,
        listId: list._id,
      };
      newCardMutation({ variables: { createCardInput: cardObject } });
      //gonna need the new card mutation data to create newCard id
      newCard(cardObject);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{list.title}</Title>
          <DeleteButton handleDelete={handleDelete} />
          <Droppable droppableId={list._id} type="card">
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList cards={list.cards} listId={list._id} />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <CreateForm buttonText="Card" submitData={handleCreateCard} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
