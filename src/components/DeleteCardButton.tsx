interface Props {
  handleDelete: (listId: string, cardId: string) => void;
  listId: string;
  cardId: string;
}

const DeleteButton = ({ handleDelete, listId, cardId }: Props) => (
  <button onClick={() => handleDelete(listId, cardId)}>Delete Me</button>
);

export default DeleteButton;
