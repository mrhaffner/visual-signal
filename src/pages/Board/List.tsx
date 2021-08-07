import CardList from './CardList';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ListInterface } from '../../types';
import CreateForm, { OutputData } from '../../components/CreateForm';

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
  deleteList: (listId: string) => void;
  newCard: (inputData: OutputData) => void;
  deleteCard: (listId: string, cardId: string) => void;
}

const List = ({ list, index, deleteList, newCard, deleteCard }: Props) => {
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{list.title}</Title>
          <button onClick={() => deleteList(list._id)}>Delete Me</button>
          <Droppable droppableId={list._id} type="card">
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList
                  cards={list.cards}
                  deleteCard={deleteCard}
                  listId={list._id}
                />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <CreateForm
            buttonText="Card"
            // fix inputs
            parentData={{ index: 10, listId: list._id }}
            submitData={newCard}
          />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
