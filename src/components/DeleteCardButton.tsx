interface Props {
  handleDelete: (idList: string, cardId: string) => void;
  idList: string;
  cardId: string;
}

const DeleteButton = ({ handleDelete, idList, cardId }: Props) => (
  <button onClick={() => handleDelete(idList, cardId)}>Delete Me</button>
);

export default DeleteButton;
