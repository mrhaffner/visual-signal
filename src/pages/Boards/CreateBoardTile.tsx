import styled from 'styled-components';

const Wrapper = styled.li`
  margin: 0 2% 2% 0;
  padding: 0;
  transform: translate(0);
  width: 23.5%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  list-style: none;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const Container = styled.div`
  background-color: #091e420a;
  border: none;
  box-shadow: none;
  color: #172b4d;
  display: table-cell;
  font-weight: 400;
  height: 80px;
  text-align: center;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  vertical-align: middle;
  width: inherit;
  border-radius: 3px;
  background-position: 50%;
  background-size: cover;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  &:hover {
    background-color: #091e4214;
    border: none;
    box-shadow: none;
    color: #172b4d;
  }
  &:active {
    background-color: #e4f0f6;
    border: none;
    box-shadow: none;
    color: #0079bf;
    outline: 0;
  }
`;

const Text = styled.p`
  margin: 0 0 8px;
  color: #172b4d;
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  &:active {
    color: #0079bf;
  }
`;

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
