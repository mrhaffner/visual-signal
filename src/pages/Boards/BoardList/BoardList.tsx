import { BoardInterface } from '../../../types';
import Card from '../Card';
import CreateBoardTile from '../CreateBoardTile';
import { ListWrapper } from './style';

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
          <Card
            key={board.name + Math.random()}
            url={url}
            name={board.name}
            color={board.color}
          />
        );
      })}
      <CreateBoardTile setShowCreateBoardModal={setShowCreateBoardModal} />
    </ListWrapper>
  );
};

export default BoardList;
