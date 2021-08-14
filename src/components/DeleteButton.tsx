interface Props {
  handleDelete: (id: string) => void;
  id: string;
}

const DeleteButton = ({ handleDelete, id }: Props) => (
  <button onClick={() => handleDelete(id)}>Delete Me</button>
);

export default DeleteButton;
