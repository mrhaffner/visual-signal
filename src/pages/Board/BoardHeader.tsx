import styled from 'styled-components';
import BoardTitleForm from '../../components/BoardTitle';

const Wrapper = styled.div`
  height: auto;
  padding: 8px 4px 4px 8px;
  position: relative;
`;

interface Props {
  handleDelete: (id: string) => void;
  id: string;
  goHome: () => void;
  text: string;
  dubmitData: (text: string) => void;
}

const BoardHeader = ({ handleDelete, id, goHome, text, submitData }: any) => {
  return (
    <Wrapper>
      <BoardTitleForm id={id} text={text} submitData={submitData} />
    </Wrapper>
  );
};

export default BoardHeader;
