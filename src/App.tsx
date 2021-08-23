import { Switch, Route } from 'react-router-dom';
import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';
import BoardList from './pages/BoardList';

const App = () => (
  <Switch>
    <Route path="/board/:boardId">
      <BoardProvider>
        <Board />
      </BoardProvider>
    </Route>
    <Route path="/">
      <BoardList />
    </Route>
  </Switch>
);

export default App;
