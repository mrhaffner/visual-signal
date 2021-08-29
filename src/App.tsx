import { Switch, Route } from 'react-router-dom';
import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';
import Boards from './pages/Boards';
import NavBar from './components/NavBar';

const App = () => (
  <>
    <NavBar />
    <Switch>
      <Route path="/board/:boardId">
        <BoardProvider>
          <Board />
        </BoardProvider>
      </Route>
      <Route path="/boards">
        <Boards />
      </Route>
    </Switch>
  </>
);

export default App;
