import styled from 'styled-components';
import BoardMenu from '../../components/BoardMenu';
import BoardTitleForm from '../../components/BoardTitleForm';

const Wrapper = styled.div`
  height: auto;
  padding: 8px 4px 4px 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  handleDelete: (id: string) => void;
  id: string;
  goToBoards: () => void;
  text: string;
  submitData: (text: string) => void;
}

const BoardHeader = ({
  handleDelete,
  id,
  goToBoards,
  text,
  submitData,
}: Props) => (
  <Wrapper>
    <BoardTitleForm text={text} submitData={submitData} />
    <BoardMenu handleDelete={handleDelete} goToBoards={goToBoards} id={id} />
  </Wrapper>
);

export default BoardHeader;
