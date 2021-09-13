import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useKeyPress from '../../hooks/useKeyPress';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { CloseBtn } from './sharedStyles';

const Wrapper = styled.section`
  position: fixed;
  width: 304px;
  will-change: top, left;
  top: 44px;
  right: 4px;
  /* left: 522px; */
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  box-sizing: border-box;
  outline: 0;
  overflow: hidden;
  z-index: 1;
`;

const Header = styled.header`
  margin-bottom: 8px;
  padding: 0 12px;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: 12px 1fr 12px;
`;

const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  color: #5e6c84;
  height: 40px;
  display: block;
  line-height: 40px;
  margin: 0;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: center;
`;

const Main = styled.div`
  max-height: 1251px;
  padding-top: 0;
  -webkit-transform: translate3d(0, 0, 0);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const UserContainer = styled.div`
  display: flex;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
`;

const AvatarContainer = styled.div`
  padding: 4px 8px 4px 12px;
`;

const Avatar = styled.div`
  position: relative;
  line-height: 10px;
  overflow: hidden;
  white-space: nowrap;
`;

const AvatarText = styled.span`
  font-size: 18px;
  height: 40px;
  width: 40px;
  line-height: 40px;
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

const Name = styled.div`
  margin-top: 4px;
  max-width: 230px;
`;

const Email = styled.span`
  font-size: 9pt;
  color: #b3bac5;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 230px;
`;

const LogoutContainer = styled.li`
  padding-top: 8px;
  list-style: none;
`;

const LogoutBtn = styled.button`
  border: none;
  background: #ffffff;
  border-radius: 0;
  box-shadow: none;
  color: #172b4d;
  display: block;
  height: 100%;
  padding: 6px 12px;
  text-align: left;
  text-decoration: none;
  width: 100%;
  transition: none;
  margin: 0;
  outline: 0;
  -webkit-appearance: none;
  line-height: 20px;
  &:hover {
    border: none;
    box-shadow: none;
    background: rgba(9, 30, 66, 0.04);
  }
  &:active {
    border: none;
    box-shadow: none;
    background: #e4f0f6;
  }
  &:focus {
    outline: 0;
  }
`;

const LogoutText = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #172b4d;
  text-align: left;
`;

interface Props {
  initials: string;
  name: string;
  email: string;
  showPopover: any;
  togglePopover: any;
  logOut: any;
}

const MemberMenuPopover = ({
  initials,
  name,
  email,
  showPopover,
  togglePopover,
  logOut,
}: Props) => {
  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    togglePopover();
  });

  useEffect(() => {
    if (esc && showPopover) {
      togglePopover();
    }
  }, [esc]);

  if (!showPopover) {
    return <></>;
  }

  return (
    <Wrapper ref={ref}>
      <Header>
        <Title>Account</Title>
        <CloseBtn onClick={() => togglePopover()} />
      </Header>
      <Main tabIndex={-1}>
        <nav>
          <List>
            <UserContainer>
              <AvatarContainer>
                <Avatar>
                  <AvatarText>{initials}</AvatarText>
                </Avatar>
              </AvatarContainer>
              <div>
                <Name>{name}</Name>
                <Email>{email}</Email>
              </div>
            </UserContainer>
            <LogoutContainer>
              <LogoutBtn onClick={() => logOut()}>
                <LogoutText>Log out</LogoutText>
              </LogoutBtn>
            </LogoutContainer>
          </List>
        </nav>
      </Main>
    </Wrapper>
  );
};

export default MemberMenuPopover;
