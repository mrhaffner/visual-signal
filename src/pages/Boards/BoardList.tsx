import styled from 'styled-components';
import CreateBoardForm from '../../components/CreateBoardForm';
import { BoardInterface } from '../../types';
import Card from './Card';

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface Props {
  boardList: BoardInterface[];
  addBoard: (name: string) => void;
}
const BoardList = ({ boardList, addBoard }: Props) => {
  return (
    <ListWrapper>
      {boardList.map((board) => {
        const url = `/board/${board._id}`;
        return <Card url={url} name={board.name}></Card>;
      })}
      <CreateBoardForm buttonText="Board" submitData={addBoard} />
    </ListWrapper>
  );
};

export default BoardList;
