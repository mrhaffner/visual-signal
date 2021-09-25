import CardList from './CardList';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ListInterface } from '../../types';
import useBoardContext from '../../hooks/useBoardContext';
import DeleteListButton from '../../components/Buttons/DeleteListButton';
import OpenCardComposer from '../../components/Composers/OpenCardComposer';
import CardComposer from '../../components/Composers/CardComposer';
import { useEffect, useRef, useState } from 'react';
import ListTitleInput from '../../components/Inputs/ListTitleInput';

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
  flex-shrink: 0;
  max-height: 91.5vh;
`;

const TitleContainer = styled.div`
  /* margin-left: 6px; */
  flex: 0 0 auto;
  min-height: 20px;
  padding-right: 36px;
  padding: 10px 8px 0 8px;
  position: relative;
  overflow: hidden;
  /* margin-bottom: -4px; */
`;

interface DragHandleProps {
  hidden: boolean;
}

const TitleDragHandle = styled.h2<DragHandleProps>`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

type BoardItemStylesProps = {
  isDraggingOver: boolean;
  showComposer: boolean;
};

// const Container = styled.div<BoardItemStylesProps>`
//   padding: 8px;
//   transition: background-color 0.2s ease;
//   background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
//   flex-grow: 1;
//   min-height: 100px;
// `;

const Container = styled.div<BoardItemStylesProps>`
  flex: 1 1 auto;
  margin: 0 4px;
  min-height: 0.1px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 4px;
  z-index: 1;

  -webkit-transform: translateZ(0);
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #091e4214;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #091e4214;
  }
  ${(props) => props.showComposer && 'margin-bottom: 6px'};
`;

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
                isDraggingOver={snapshot.isDraggingOver}
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
          {/* {showComposer ? (
            <CardComposer
              setShowComposer={setShowComposer}
              submitData={addCard}
              list={list}
            />
          ) : (
            <OpenCardComposer setShowComposer={setShowComposer} />
          )} */}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default List;
