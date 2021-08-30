import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useLoadingContext from '../../hooks/useLoadingContext';

interface NavProps {
  setBlue: boolean;
}

const Nav = styled.nav<NavProps>`
  background-color: ${(props) =>
    props.setBlue ? '#026aa7' : 'rgba(0, 0, 0, 0.32)'};
  min-height: 40px;
  max-height: 40px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogoContainer = styled(Link)`
  display: block;
  position: relative;
  flex-shrink: 0;
  height: 30px;
  margin-top: 1px;
  color: #172b4d;
  background-color: initial;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 0.9;
  }
`;

interface LoadingProps {
  isLoading: boolean;
}

const NavImage = styled.div<LoadingProps>`
  width: 80px;
  height: 16px;
  margin: 7px 0;
  position: relative;

  &::before {
    content: '';
    background-image: ${(props) =>
      props.isLoading
        ? 'url(https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif)'
        : 'url(https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif)'};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const NavBar = () => {
  let location = useLocation();
  const setBlue =
    location.pathname === '/boards' || location.pathname === '/' ? true : false;

  const { isLoading } = useLoadingContext();
  console.log(isLoading);

  return (
    <>
      <Nav setBlue={setBlue}>
        <NavContainer>
          <NavLogoContainer to="/boards">
            <NavImage isLoading={isLoading} />
          </NavLogoContainer>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;
