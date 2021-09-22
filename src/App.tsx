import { Switch, Route, Redirect } from 'react-router-dom';
import BoardProvider from './providers/BoardProvider';
import Board from './pages/Board';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn/LogIn';
import useMemberContext from './hooks/useMemberContext';

const LoadingBoard = () => <div>loading</div>;

const App = () => {
  const { memberFound } = useMemberContext();

  return (
    <Switch>
      <Route path="/board/:boardId">
        {memberFound ? (
          <BoardProvider>
            <Board />
          </BoardProvider>
        ) : memberFound === false ? (
          <Redirect to="/login" />
        ) : (
          <LoadingBoard />
        )}
      </Route>
      <Route path="/boards">
        {memberFound ? (
          <Boards />
        ) : memberFound === false ? (
          <Redirect to="/login" />
        ) : (
          <LoadingBoard />
        )}
      </Route>
      <Route path="/login">
        {memberFound ? (
          <Redirect to="/boards" />
        ) : memberFound === false ? (
          <LogIn />
        ) : (
          <LoadingBoard />
        )}
      </Route>
      <Route path="/:slug">
        {memberFound ? (
          <Redirect to="/boards" />
        ) : memberFound === false ? (
          <SignUp />
        ) : (
          <LoadingBoard />
        )}
      </Route>
      <Route path="/">
        {memberFound ? (
          <Redirect to="/boards" />
        ) : memberFound === false ? (
          <SignUp />
        ) : (
          <LoadingBoard />
        )}
      </Route>
    </Switch>
  );
};

export default App;
