import BoardProvider from '../../providers/BoardProvider';
import Board from './Board';
import { ColorKeys } from '../../types';

interface Props {
  setBoardColor: (input: ColorKeys) => void;
}

const WrappedBoard = ({ setBoardColor }: Props) => (
  <BoardProvider>
    <Board setBoardColor={setBoardColor} />
  </BoardProvider>
);

export default WrappedBoard;
