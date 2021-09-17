import ChangeMemberContent from './ChangeMemberContent';
import { MemberInfo, MemberType } from '../../../types';

import {
  ContentContainer,
  NewHeaderWrapper,
  BackButton,
  NewHeaderText,
} from './style';
import LeaveRemoveContent from './LeaveRemoveContent';
import { CloseBtn } from '../sharedStyles';

interface Props {
  memberLevel: MemberType;
  onlyOneAdmin: boolean;
  popoverContentType: string;
  setPopoverMember: (member: MemberInfo | null) => void;
  setPopoverContentType: (input: string) => void;
  handleRemove: () => void;
  handleMemberLevelUpdate: (input: string) => void;
}

const SecondaryPopover = ({
  memberLevel,
  onlyOneAdmin,
  popoverContentType,
  setPopoverMember,
  setPopoverContentType,
  handleRemove,
  handleMemberLevelUpdate,
}: Props) => {
  return (
    <>
      <NewHeaderWrapper>
        <BackButton onClick={() => setPopoverContentType('main')}></BackButton>
        <NewHeaderText>Change permissions</NewHeaderText>
        <CloseBtn onClick={() => setPopoverMember(null)}></CloseBtn>
      </NewHeaderWrapper>
      <ContentContainer>
        {popoverContentType === 'levelChange' && (
          <ChangeMemberContent
            memberLevel={memberLevel}
            onlyOneAdmin={onlyOneAdmin}
            handleMemberLevelUpdate={handleMemberLevelUpdate}
          />
        )}
        {(popoverContentType === 'leave' ||
          popoverContentType === 'remove') && (
          <LeaveRemoveContent
            leaveOrRemove={popoverContentType}
            handleRemove={handleRemove}
          />
        )}
      </ContentContainer>
    </>
  );
};

export default SecondaryPopover;
