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
  adminCount: number;
  popoverContentType: string;
  setPopoverMember: (member: MemberInfo | null) => void;
  setPopoverContentType: (input: string) => void;
  handleRemove: () => void;
}

const SecondaryPopover = ({
  memberLevel,
  adminCount,
  popoverContentType,
  setPopoverMember,
  setPopoverContentType,
  handleRemove,
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
            adminCount={adminCount}
            setPopoverContentType={setPopoverContentType}
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
