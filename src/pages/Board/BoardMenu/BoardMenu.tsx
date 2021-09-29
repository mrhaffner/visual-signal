import { Container, Icon, Text, Wrapper } from './style';

interface Props {
  handleDelete: (id: string) => void;
  id: string;
}

const BoardMenu = ({ handleDelete, id }: Props) => {
  const handleClick = () => {
    handleDelete(id);
  };

  return (
    <Wrapper>
      <Container onClick={handleClick}>
        <Icon />
        {/* <Text>Show Menu</Text> */}
        <Text>Delete Board</Text>
      </Container>
    </Wrapper>
  );
};

export default BoardMenu;
