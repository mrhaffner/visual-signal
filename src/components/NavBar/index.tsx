import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useMemberContext from '../../hooks/useMemberContext';

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
  width: 100%;
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

const SideContainer = styled.div``;

const OpenMemberMenu = styled.button`
  border: none;
  box-shadow: none;
  background-color: transparent;
  display: block;
  height: 32px;
  margin-right: 0;
  position: relative;
  width: 32px;
  outline: 0;
  border-radius: 3px;
  text-decoration: none;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  line-height: 32px;
  margin: 0 4px 0 0;
  padding: 0;
  white-space: nowrap;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  cursor: pointer;
  //display: flex;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
`;

const MemberMenuTextWrapper = styled.div`
  position: relative;
  line-height: 10px;
  overflow: hidden;
  white-space: nowrap;
`;

const MemberMenuText = styled.span`
  height: 32px;
  width: 32px;
  line-height: 32px;
  font-size: 14px;
  align-items: center;
  background-color: #dfe1e6;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 0;
  border-radius: 100%;
  box-sizing: border-box;
  color: #172b4d;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  justify-content: center;
  opacity: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const NavBar = ({ isLoading, setBlue }: any) => {
  const { member } = useMemberContext();
  return (
    <>
      <Nav setBlue={setBlue}>
        <NavContainer>
          <SideContainer></SideContainer>
          <NavLogoContainer to="/boards">
            <NavImage isLoading={isLoading} />
          </NavLogoContainer>
          <SideContainer>
            <OpenMemberMenu>
              <MemberMenuTextWrapper>
                <MemberMenuText>{member.initials}</MemberMenuText>
              </MemberMenuTextWrapper>
            </OpenMemberMenu>
          </SideContainer>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;
