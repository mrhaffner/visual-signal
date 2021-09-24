import BoardProvider from '../../providers/BoardProvider';
import Board from './Board';

const WrappedBoard = () => (
  <BoardProvider>
    <Board />
  </BoardProvider>
);

export default WrappedBoard;
