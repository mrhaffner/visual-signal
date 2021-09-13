import { StyledStandardText, LeaveRemoveBtn } from './styles';

interface Props {
  leaveOrRemove: string;
}

//buttons update setModalContentType!!!
const LeaveRemoveContent = ({ leaveOrRemove }: Props) => {
  const text =
    leaveOrRemove === 'remove'
      ? 'The member will be removed from all cards on this board. They will receive a notification.'
      : 'You will be removed from all cards on this board.';
  const buttonText =
    leaveOrRemove === 'remove' ? 'Remove member' : 'Leave Board';
  return (
    <>
      <StyledStandardText>{text}</StyledStandardText>
      <LeaveRemoveBtn type="submit" value={buttonText} />
    </>
  );
};

export default LeaveRemoveContent;
