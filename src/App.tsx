import BoardProvider from './contexts/BoardProvider';
import Board from './pages/Board';

const App = () => (
  <BoardProvider>
    <Board />
  </BoardProvider>
);

export default App;
