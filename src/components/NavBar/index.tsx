import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0.32);
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

const NavLogo = styled.a`
  display: block;
  position: relative;
  flex-shrink: 0;
  height: 30px;
  margin-top: 1px;
  color: #172b4d;
  background-color: initial;
  cursor: pointer;
  &:hover {
    color: #091e42;
  }
`;

const NavImageContainer = styled(Link)``;

const NavImage = styled.div`
  width: 80px;
  height: 16px;
  margin: 7px 0;
  position: relative;
  opacity: 0.5;
  &:hover {
    opacity: 0.9;
  }
  &::before {
    content: '';
    background-image: url(https://a.trellocdn.com/prgb/dist/images/header-logo-spirit.d947df93bc055849898e.gif);
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

//Loading
//https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo>
            <NavImageContainer to="/">
              <NavImage />
            </NavImageContainer>
          </NavLogo>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;