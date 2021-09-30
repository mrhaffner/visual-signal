import useMemberContext from '../../hooks/useMemberContext';
import { useLocation } from 'react-router-dom';
import {
  MemberMenuText,
  MemberMenuTextWrapper,
  Nav,
  NavContainer,
  NavImage,
  NavLogoContainer,
  OpenMemberMenu,
} from './style';

const NavBar = ({ isLoading, toggleMenuPopover }: any) => {
  const { member } = useMemberContext();
  const location = useLocation();
  const setBlue = !location.pathname.includes('board/');
  return (
    <Nav setBlue={setBlue}>
      <NavContainer>
        <div></div>
        <NavLogoContainer to="/boards">
          <NavImage isLoading={isLoading} />
        </NavLogoContainer>
        <div>
          <OpenMemberMenu onClick={() => toggleMenuPopover()}>
            <MemberMenuTextWrapper>
              <MemberMenuText>{member.initials}</MemberMenuText>
            </MemberMenuTextWrapper>
          </OpenMemberMenu>
        </div>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
