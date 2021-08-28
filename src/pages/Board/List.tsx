import CardList from './CardList';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ListInterface } from '../../types';
import CreateCardForm from '../../components/CreateCardForm';
import useBoardContext from '../../hooks/useBoardContext';
import DeleteListButton from '../../components/DeleteListButton';
import InlineTextEditList from '../../components/InlineTextEditList';

// const Wrapper = styled.div`
//   margin: 8px;
//   border: 1px solid lightgrey;
//   background-color: white;
//   border-radius: 2px;
//   width: 220px;
//   display: flex;
//   flex-direction: column;
// `;

const Wrapper = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 272px;
  margin: 0 4px;
`;

const Title = styled.h2`
  margin-left: 8px;
  flex: 0 0 auto;
  min-height: 20px;
  padding-right: 36px;
  padding: 10px 8px;
  position: relative;
  overflow: hidden;
`;

type BoardItemStylesProps = {
  isDraggingOver: boolean;
};

// const Container = styled.div<BoardItemStylesProps>`
//   padding: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
//   flex-grow: 1;
//   min-height: 100px;
// `;

const Container = styled.div<BoardItemStylesProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  list: ListInterface;
  index: number;
}

const List = ({ list, index }: Props) => {
  const { deleteList, addCard, newListName } = useBoardContext();

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            <InlineTextEditList
              text={list.name}
              onSetText={(text: string) =>
                newListName({ _id: list._id, name: text })
              }
            />
          </Title>

          <DeleteListButton handleDelete={deleteList} id={list._id} />
          <Droppable droppableId={list._id} type="card">
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList cards={list.cards} />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <CreateCardForm buttonText="Card" submitData={addCard} list={list} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
