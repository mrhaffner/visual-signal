import { Switch, Route } from 'react-router-dom';
import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';
import Boards from './pages/Boards';
import LoadingProvider from './providers/LoadingProvider';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn/LogIn';

const App = () => (
  <LoadingProvider>
    <Switch>
      <Route path="/board/:boardId">
        <BoardProvider>
          <Board />
        </BoardProvider>
      </Route>
      <Route path="/boards">
        <Boards />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
      <Route path="/:slug">
        <SignUp />
      </Route>
      <Route path="/">
        <SignUp />
      </Route>
    </Switch>
  </LoadingProvider>
);

export default App;
