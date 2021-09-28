import { Container, Text, Wrapper } from './style';

interface Props {
  setShowCreateBoardModal: (bool: boolean) => void;
}

const CreateBoardTile = ({ setShowCreateBoardModal }: Props) => {
  const openPopover = () => setShowCreateBoardModal(true);

  return (
    <Wrapper onClick={openPopover}>
      <Container>
        <Text>Create new board</Text>
      </Container>
    </Wrapper>
  );
};

export default CreateBoardTile;
