interface Props {
  handleDelete: () => void;
}

const DeleteButton = ({ handleDelete }: Props) => (
  <button onClick={() => handleDelete()}>Delete Me</button>
);

export default DeleteButton;
