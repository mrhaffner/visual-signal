import { Container, Text, Wrapper } from './style';

interface Props {
  toggleCreateBoardModal: () => void;
}

const CreateBoardTile = ({ toggleCreateBoardModal }: Props) => (
  <Wrapper onClick={toggleCreateBoardModal}>
    <Container>
      <Text>Create new board</Text>
    </Container>
  </Wrapper>
);

export default CreateBoardTile;
