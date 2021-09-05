import { Switch, Route, Redirect } from 'react-router-dom';
import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn/LogIn';
import useMemberContext from './hooks/useMemberContext';

const App = () => {
  const { member } = useMemberContext();

  return (
    <Switch>
      <Route path="/board/:boardId">
        {member ? (
          <BoardProvider>
            <Board />
          </BoardProvider>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/boards">
        {member ? <Boards /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        {member ? <Redirect to="/boards" /> : <LogIn />}
      </Route>
      <Route path="/:slug">
        {member ? <Redirect to="/boards" /> : <SignUp />}
      </Route>
      <Route path="/">{member ? <Redirect to="/boards" /> : <SignUp />}</Route>
    </Switch>
  );
};

export default App;
