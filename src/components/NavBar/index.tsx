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

const NavLogo = styled(Link)`
  display: block;
  position: relative;
  flex-shrink: 0;
  height: 30px;
`;

const NavImageContainer = styled.div`
  width: 80px;
  height: 16px;
  margin: 7px 0;
  position: relative;
  opacity: 0.5;
`;

const NavImage = styled.div`
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
`;

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo to="/">
            <NavImageContainer>
              <NavImage />
            </NavImageContainer>
          </NavLogo>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;
