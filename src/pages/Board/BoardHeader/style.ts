import styled from 'styled-components';

export const Wrapper = styled.div`
  height: auto;
  padding: 8px 4px 4px 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const LeftWrapper = styled.div`
  display: flex;
`;

export const Divider = styled.span`
  border-left: 1px solid #ffffff3d;
  float: left;
  height: 16px;
  margin: 8px 8px 12px 4px;
  border-color: #0003;
`;

export const InviteBtn = styled.a`
  background-color: #00000014;
  color: #172b4d;
  padding-left: 12px;
  margin-left: 8px;
  border-radius: 3px;
  cursor: pointer;
  float: left;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  user-select: none;
  &:hover {
    background-color: #00000029;
    outline: 0;
  }
  &:active {
    background-color: #0000003d;
    outline: 0;
  }
`;

export const InviteText = styled.span`
  overflow: hidden;
  padding-right: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FacePile = styled.div`
  cursor: default;
  float: left;
  margin-left: 4px;
  overflow: hidden;
  padding: 2px 8px 0 2px;
`;

interface AvatarProps {
  index: number;
}

export const Avatar = styled.a<AvatarProps>`
  z-index: ${(props) => props.index};
  float: left;
  height: 28px;
  margin: 0 0 0 -2px;
  width: 28px;
  background-color: #dfe1e6;
  border-radius: 25em;
  color: #172b4d;
  cursor: pointer;
  display: block;
  overflow: visible;
  position: relative;
  text-decoration: none;
  user-select: none;
  &:hover {
    background-color: #c1c7d0;
  }
  &:active {
    background-color: #b3bac5;
  }
`;

export const Initials = styled.span`
  height: 28px;
  line-height: 28px;
  width: 28px;
  display: block;
  font-size: 12px;
  font-weight: 700;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 0;
`;

export const AdminBadge = styled.span`
  background-image: url('https://a.trellocdn.com/prgb/dist/images/chevron.88a4454280d68a816b89.png');
  background-size: 100%;
  bottom: 0;
  height: 9px;
  position: absolute;
  right: 1px;
  width: 9px;
  z-index: 3;
  color: #091e42;
`;
