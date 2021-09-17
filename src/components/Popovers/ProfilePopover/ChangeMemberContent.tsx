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
  adminCount: number;
  handleMemberLevelUpdate: (input: string) => void;
}

const ChangeMemberContent = ({
  memberLevel,
  adminCount,
  handleMemberLevelUpdate,
}: Props) => {
  const adminDisabled =
    memberLevel === 'normal' ? false : adminCount > 1 ? true : false;
  const normalDisabled =
    memberLevel === 'normal' ? true : adminCount > 1 ? false : true;
  const doNothing = () => {};
  const onlyOneAdmin = adminCount === 1 && memberLevel === 'admin';

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
