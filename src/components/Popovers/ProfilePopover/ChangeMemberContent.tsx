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
  setPopoverContentType: (input: string) => void;
}

//buttons update setPopoverContentType!!!
const ChangeMemberContent = ({
  memberLevel,
  adminCount,
  setPopoverContentType,
}: Props) => {
  return (
    <>
      <ThemeProvider
        theme={
          memberLevel === 'normal' ? { disabled: false } : { disabled: true }
        }
      >
        {/* buttons don't work if admin count === 1 */}
        <ListButton>
          Admin
          {memberLevel !== 'normal' && <CheckIcon />}
          <ListBtnSubText>
            Can view and edit cards, remove members, and change all settings for
            the board.
          </ListBtnSubText>
        </ListButton>
      </ThemeProvider>
      <ThemeProvider
        theme={
          memberLevel === 'normal' ? { disabled: true } : { disabled: false }
        }
      >
        <ListButton>
          Normal
          {memberLevel === 'normal' && <CheckIcon />}
          <ListBtnSubText>
            Can view and edit cards. Can change some board settings.
          </ListBtnSubText>
        </ListButton>
      </ThemeProvider>
      {adminCount === 1 && (
        //if this is the case, the Disabled list button should be inverted!
        //!!!!!
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
