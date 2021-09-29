import CardList from '../CardList';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ListInterface } from '../../../types';
import useBoardContext from '../../../hooks/useBoardContext';
import DeleteListButton from '../../../components/Buttons/DeleteListButton';
import OpenCardComposer from '../../../components/Composers/OpenCardComposer';
import CardComposer from '../../../components/Composers/CardComposer';
import { useEffect, useRef, useState } from 'react';
import ListTitleInput from '../../../components/Inputs/ListTitleInput';
import { Container, TitleContainer, TitleDragHandle, Wrapper } from './style';

interface Props {
  list: ListInterface;
  index: number;
}

const List = ({ list, index }: Props) => {
  const { deleteList, addCard, newListName } = useBoardContext();
  const [showComposer, setShowComposer] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    if (!hidden) {
      setHidden(true);
    }
  };
  const composerRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    composerRef.current?.scrollIntoView();
  });

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer>
            <TitleDragHandle
              {...provided.dragHandleProps}
              hidden={hidden}
              onClick={handleClick}
            />
            <ListTitleInput
              hidden={hidden}
              text={list.name}
              submitData={newListName}
              setHidden={setHidden}
              listId={list._id}
            />

            <DeleteListButton handleDelete={deleteList} id={list._id} />
          </TitleContainer>
          <Droppable droppableId={list._id} type="card">
            {(provided, snapshot) => (
              <Container
                showComposer={showComposer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CardList cards={list.cards} />
                {provided.placeholder}
                {showComposer && (
                  <>
                    <CardComposer
                      setShowComposer={setShowComposer}
                      submitData={addCard}
                      list={list}
                    />
                    <div ref={composerRef} />
                  </>
                )}
              </Container>
            )}
          </Droppable>
          {!showComposer && (
            <OpenCardComposer setShowComposer={setShowComposer} />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
