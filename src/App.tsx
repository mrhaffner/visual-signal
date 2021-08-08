import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';

const App = () => (
  <BoardProvider>
    <Board />
  </BoardProvider>
);

export default App;
