import { Switch, Route, Redirect } from 'react-router-dom';
import Board from './pages/Board';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn/LogIn';
import useMemberContext from './hooks/useMemberContext';
import NavBar from './components/NavBar';
import useToggle from './hooks/useToggle';
import MemberMenuPopover from './components/Popovers/MemberMenuPopover';
import PageNotFound from './pages/PageNotFound';

const LoadingBoard = () => <div></div>;

const App = () => {
  const { memberFound, member, logOut } = useMemberContext();
  const [showMenuPopover, toggleMenuPopover] = useToggle();

  return (
    <>
      {memberFound && (
        <NavBar
          // how to handle isLoading?
          isLoading={false}
          toggleMenuPopover={toggleMenuPopover}
        />
      )}
      <Switch>
        <Route path="/board/:boardId">
          {memberFound ? (
            <Board />
          ) : memberFound === false ? (
            <Redirect to="/login" />
          ) : (
            <LoadingBoard />
          )}
        </Route>
        <Route exact path="/boards">
          {memberFound ? (
            <Boards />
          ) : memberFound === false ? (
            <Redirect to="/login" />
          ) : (
            <LoadingBoard />
          )}
        </Route>
        <Route exact path="/login">
          {memberFound ? (
            <Redirect to="/boards" />
          ) : memberFound === false ? (
            <LogIn />
          ) : (
            <LoadingBoard />
          )}
        </Route>
        <Route exact path="/">
          {memberFound ? (
            <Redirect to="/boards" />
          ) : memberFound === false ? (
            <SignUp />
          ) : (
            <LoadingBoard />
          )}
        </Route>
        <Route component={PageNotFound} />
      </Switch>
      {memberFound && showMenuPopover && (
        <MemberMenuPopover
          logOut={logOut}
          togglePopover={toggleMenuPopover}
          initials={member.initials}
          name={member.fullName}
          email={member.email}
        />
      )}
    </>
  );
};

export default App;
