import { StyledStandardText, LeaveRemoveBtn } from './style';

interface Props {
  leaveOrRemove: string;
  handleRemove: () => void;
}

//buttons update setPopoverContentType!!!
const LeaveRemoveContent = ({ leaveOrRemove, handleRemove }: Props) => {
  const text =
    leaveOrRemove === 'remove'
      ? 'The member will be removed from all cards on this board. They will receive a notification.'
      : 'You will be removed from all cards on this board.';
  const buttonText =
    leaveOrRemove === 'remove' ? 'Remove member' : 'Leave Board';
  return (
    <>
      <StyledStandardText>{text}</StyledStandardText>
      <LeaveRemoveBtn type="submit" value={buttonText} onClick={handleRemove} />
    </>
  );
};

export default LeaveRemoveContent;
