interface Props {
  handleDelete: (id: string) => void;
  id: string;
  goHome: () => void;
}

const DeleteButton = ({ handleDelete, id, goHome }: Props) => {
  const handleClick = () => {
    handleDelete(id);
    goHome();
  };
  return <button onClick={handleClick}>Delete Me</button>;
};

export default DeleteButton;
