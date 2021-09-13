import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useKeyPress from '../hooks/useKeyPress';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { MemberInfo } from '../types';

const Wrapper = styled.div`
  left: 504px;
  top: 84px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
  overflow: hidden;
  position: absolute;
  right: -9999px;
  /* top: -9999px; */
  -webkit-transform: translateZ(0);
  width: 304px;
  z-index: 70;
`;

const Header = styled.div`
  border-bottom-color: #0000;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  z-index: 1;
  margin-bottom: 8px;
  text-align: center;
`;

const CloseBtn = styled.a`
  color: #6b778c;
  padding: 10px 12px 10px 8px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  &:before {
    content: '\\e91c';
  }
  &:active,
  :hover {
    outline: none;
  }
  &:hover {
    color: #172b4d;
  }
`;

const ContentContainer = styled.div`
  max-height: 1281px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 12px 12px;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
`;

const Profile = styled.div`
  margin: 8px 0;
  min-height: 56px;
  position: relative;
`;

const Avatar = styled.div`
  float: left;
  margin: 2px;
  background-color: #dfe1e6;
  border-radius: 25em;
  display: block;
  height: 50px;
  overflow: hidden;
  position: relative;
  width: 50px;
  z-index: 1;
  &:hover {
    background-color: #c1c7d0;
  }
  &:active {
    background-color: #b3bac5;
  }
`;

const Initials = styled.span`
  font-weight: 700;
  height: 50px;
  left: 0;
  line-height: 50px;
  position: absolute;
  text-align: center;
  top: 0;
  display: block;
  font-size: 16px;
  overflow: hidden;
  right: 0;
  width: 100%;
`;

const InfoContainer = styled.div`
  word-wrap: break-word;
  margin: 0 0 0 64px;
`;
const Title = styled.h3`
  margin: 0 40px 0 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  word-wrap: break-word;
`;

const TitleLink = styled.a`
  text-decoration: none;
  color: #172b4d;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  &:active,
  :hover {
    outline: none;
  }
  &:hover {
    color: #091e42;
    text-decoration: underline;
  }
`;

const Username = styled.p`
  color: #5e6c84;
  margin-bottom: 0;
  padding-bottom: 0;
  margin: 0 0 8px;
`;

const PermissionChange = styled.a`
  cursor: pointer;
  display: block;
  font-weight: 400;
  margin: 0 -12px;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  color: #172b4d;
  &:hover {
    background-color: #091e420a;
  }
  &:active {
    background-color: #e4f0f6;
  }
`;

const PermissionLevel = styled.span`
  color: #5e6c84;
  font-weight: 400;
`;

interface Props {
  member: MemberInfo;
  setModalMember: (member: MemberInfo | null) => void;
}

const ProfileModal = ({ member, setModalMember }: Props) => {
  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    setModalMember(null);
  });

  useEffect(() => {
    if (esc) {
      setModalMember(null);
    }
  }, [esc]);

  const capitalMemberType =
    member.memberType.toUpperCase()[0] + member.memberType.substring(1);

  return (
    <Wrapper ref={ref}>
      <Header>
        <CloseBtn href="#" onClick={() => setModalMember(null)}></CloseBtn>
      </Header>
      <ContentContainer>
        <Profile>
          <Avatar>
            <Initials>{member.initials}</Initials>
          </Avatar>
          <InfoContainer>
            <Title>
              <TitleLink href="#">{member.fullName}</TitleLink>
            </Title>
            <Username>@{member.username}</Username>
          </InfoContainer>
        </Profile>
        <PermissionChange href="#">
          Change permissions...
          <PermissionLevel>({capitalMemberType})</PermissionLevel>
        </PermissionChange>
      </ContentContainer>
    </Wrapper>
  );
};

export default ProfileModal;
