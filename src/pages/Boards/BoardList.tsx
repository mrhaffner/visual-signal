import styled from 'styled-components';
import { BoardInterface } from '../../types';
import Card from './Card';
import CreateBoardTile from './CreateBoardTile';

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
  setShowCreateBoardModal: (bool: boolean) => void;
}
const BoardList = ({ boardList, setShowCreateBoardModal }: Props) => {
  return (
    <ListWrapper>
      {boardList.map((board) => {
        const url = `/board/${board._id}`;
        return (
          <Card key={board.name + Math.random()} url={url} name={board.name} />
        );
      })}
      <CreateBoardTile setShowCreateBoardModal={setShowCreateBoardModal} />
    </ListWrapper>
  );
};

export default BoardList;
