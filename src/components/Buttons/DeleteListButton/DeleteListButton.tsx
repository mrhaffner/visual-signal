import { Button } from './style';

interface Props {
  handleDelete: (id: string) => void;
  id: string;
}

const DeleteListButton = ({ handleDelete, id }: Props) => (
  <Button onClick={() => handleDelete(id)}></Button>
);

export default DeleteListButton;
