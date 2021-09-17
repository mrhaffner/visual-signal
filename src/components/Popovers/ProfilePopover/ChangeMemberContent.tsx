import { ThemeProvider } from 'styled-components';
import { MemberType } from '../../../types';

import {
  ListButton,
  CheckIcon,
  ListBtnSubText,
  StyledHr,
  StyledText,
} from './style';

interface Props {
  memberLevel: MemberType;
  onlyOneAdmin: boolean;
  handleMemberLevelUpdate: (input: string) => void;
}

const ChangeMemberContent = ({
  memberLevel,
  onlyOneAdmin,
  handleMemberLevelUpdate,
}: Props) => {
  const adminDisabled =
    memberLevel === 'normal' ? false : onlyOneAdmin ? false : true;
  const normalDisabled =
    memberLevel === 'normal' ? true : onlyOneAdmin ? true : false;
  const doNothing = () => {};

  return (
    <>
      <ThemeProvider theme={{ disabled: adminDisabled }}>
        <ListButton
          onClick={() => {
            adminDisabled
              ? doNothing()
              : onlyOneAdmin
              ? doNothing()
              : handleMemberLevelUpdate('admin');
          }}
        >
          Admin
          {memberLevel !== 'normal' && <CheckIcon />}
          <ListBtnSubText>
            Can view and edit cards, remove members, and change all settings for
            the board.
          </ListBtnSubText>
        </ListButton>
      </ThemeProvider>

      <ThemeProvider theme={{ disabled: normalDisabled }}>
        <ListButton
          onClick={() => {
            normalDisabled ? doNothing() : handleMemberLevelUpdate('normal');
          }}
        >
          Normal
          {memberLevel === 'normal' && <CheckIcon />}
          <ListBtnSubText>
            Can view and edit cards. Can change some board settings.
          </ListBtnSubText>
        </ListButton>
      </ThemeProvider>
      {onlyOneAdmin && (
        <>
          <StyledHr />
          <StyledText>
            You can’t change roles because there must be at least one admin.
          </StyledText>
        </>
      )}
    </>
  );
};

export default ChangeMemberContent;
