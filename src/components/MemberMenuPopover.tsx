import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useKeyPress from '../hooks/useKeyPress';
import useOnClickOutside from '../hooks/useOnClickOutside';

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

const CloseBtn = styled.button`
  grid-column: 3;
  grid-row: 1;
  background: transparent;
  border: none;
  color: #6b778c;
  cursor: pointer;
  margin: 0;
  padding: 0;
  z-index: 2;
  outline: none;
  -webkit-appearance: none;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 20px;
  position: relative;
  text-decoration: none;
  &:hover {
    color: #172b4d;
  }
  &:focus {
    outline: none;
  }
`;

const SVGWrapper = styled.span`
  height: auto;
  width: 10px;
  color: currentcolor;
  display: inline-block;
  fill: rgb(255, 255, 255);
  flex-shrink: 0;
  line-height: 1;
  cursor: pointer;
`;

const SVG = styled.svg`
  height: 16px;
  width: 16px;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  pointer-events: none;
  vertical-align: bottom;
  color: currentColor;
  line-height: 1;
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
  showModal: any;
  toggleModal: any;
  logOut: any;
}

const MemberMenuPopover = ({
  initials,
  name,
  email,
  showModal,
  toggleModal,
  logOut,
}: Props) => {
  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    toggleModal();
  });

  useEffect(() => {
    if (esc && showModal) {
      toggleModal();
    }
  }, [esc]);

  if (!showModal) {
    return <></>;
  }

  return (
    <Wrapper ref={ref}>
      <Header>
        <Title>Account</Title>
        <CloseBtn onClick={() => toggleModal()}>
          <SVGWrapper>
            <SVG
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
              ></path>
            </SVG>
          </SVGWrapper>
        </CloseBtn>
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
