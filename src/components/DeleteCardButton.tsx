import styled from 'styled-components';

// const Button = styled.button`
//   font-family: 'trellicons';
//   font-size: 16px;
//   height: 20px;
//   line-height: 20px;
//   width: 20px;
//   font-size: 16px;
//   height: 20px;
//   line-height: 20px;
//   width: 20px;
//   z-index: 40;
//   color: #42526e;
//   background-clip: padding-box;
//   background-color: #f4f5f7;
//   background-origin: initial;
//   border-radius: 3px;
//   opacity: 0.8;
//   padding: 4px;
//   position: absolute;
//   right: 2px;
//   top: 2px;
//   -webkit-font-smoothing: antialiased;
//   display: inline-block;
//   font-family: trellicons;
//   font-style: normal;
//   font-weight: 400;
//   text-align: center;
//   text-decoration: none;
//   vertical-align: bottom;
//   &:before {
//     content: '\ue928';
//   }
// `;

interface BtnVisibilityProps {
  isHoveredOrDragging: boolean;
}

const Button = styled.span<BtnVisibilityProps>`
  visibility: ${(props) => (props.isHoveredOrDragging ? 'visible' : 'hidden')};
  font-family: trellicons;
  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px;
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 40;
  color: #42526e;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  white-space: normal;
  &:before {
    content: '\\e928';
  }
  &:hover {
    color: #172b4d;
    text-decoration: none;
    background-color: #ebecf0;
    opacity: 1;
  }
`;

interface Props {
  handleDelete: (id: string) => void;
  id: string;
  isHovered: boolean;
  isDragging: boolean;
}

const DeleteCardButton = ({
  handleDelete,
  id,
  isHovered,
  isDragging,
}: Props) => {
  const isHoveredOrDragging = isHovered || isDragging;

  return (
    <Button
      onClick={() => handleDelete(id)}
      isHoveredOrDragging={isHoveredOrDragging}
    ></Button>
  );
};

export default DeleteCardButton;
