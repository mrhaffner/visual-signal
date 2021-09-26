import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Board from './pages/Board';
import Boards from './pages/Boards';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn/LogIn';
import useMemberContext from './hooks/useMemberContext';
import NavBar from './components/NavBar';
import useToggle from './hooks/useToggle';
import MemberMenuPopover from './components/Popovers/MemberMenuPopover';
import PageNotFound from './pages/PageNotFound';
import { useEffect, useState } from 'react';
import { ColorKeys } from './types';
import GlobalStyles from './GlobalStyles';

const LoadingBoard = () => <div></div>;

const App = () => {
  const { memberFound, member, logOut } = useMemberContext();
  const [showMenuPopover, toggleMenuPopover] = useToggle();
  //@ts-ignore
  const [boardColor, setBoardColor] = useState<ColorKeys>('default');
  const location = useLocation();

  useEffect(() => {
    //@ts-ignore
    if (!location.pathname.includes('board/')) setBoardColor('default');
  });

  return (
    <>
      <GlobalStyles color={boardColor} />
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
            <Board setBoardColor={setBoardColor} />
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
