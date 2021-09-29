import styled from 'styled-components';

export const Wrapper = styled.div`
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
`;

export const TitleContainer = styled.div`
  flex: 0 0 auto;
  min-height: 20px;
  padding-right: 36px;
  padding: 10px 8px 0 8px;
  position: relative;
  overflow: hidden;
`;

export interface DragHandleProps {
  hidden: boolean;
}

export const TitleDragHandle = styled.h2<DragHandleProps>`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

type BoardItemStylesProps = {
  showComposer: boolean;
};

export const Container = styled.div<BoardItemStylesProps>`
  flex: 1 1 auto;
  margin: 0 4px;
  min-height: 0.1px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 4px;
  z-index: 1;

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
  ${(props) => props.showComposer && 'margin-bottom: 6px'}
`;
