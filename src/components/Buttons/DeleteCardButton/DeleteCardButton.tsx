import { Button } from './style';

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
