import styled from 'styled-components';

interface BoardItemStylesProps {
  isDragging: boolean;
}

export const Wrapper = styled.div<BoardItemStylesProps>`
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

export const CardDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
`;
