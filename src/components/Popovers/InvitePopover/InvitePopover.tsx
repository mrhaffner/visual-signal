import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useMutateInviteMember from '../../../hooks/graphQL/useMutateInviteMember';
import useKeyPress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import InputErrorField from '../../Inputs/InputErrorField';
import { CloseBtn } from '../sharedStyles';
import {
  Header,
  MainContainer,
  MainContent,
  MemberInput,
  SendBtn,
  Title,
  Wrapper,
} from './style';

const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

interface Props {
  boardId: string;
  toggleInvitePopover: () => void;
  inviteBtnPosition: number;
}

const InvitePopover = ({
  toggleInvitePopover,
  boardId,
  inviteBtnPosition,
}: Props) => {
  const {
    invite,
    data: inviteData,
    error,
    showError,
    setShowError,
  } = useMutateInviteMember(toggleInvitePopover);

  const { register, handleSubmit, watch } = useForm();
  const watchInput = watch('input');

  const [disabled, setDisabled] = useState(true);
  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    toggleInvitePopover();
  });

  useEffect(() => {
    if (esc) {
      toggleInvitePopover();
    }
  }, [esc]);

  useEffect(() => {
    if (regex.test(watchInput) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchInput]);

  const onSubmit = handleSubmit((data) => {
    invite({ variables: { inviteInput: { email: data.input, boardId } } });
    console.log(inviteData);
    setShowError(false);
  });

  return (
    <Wrapper ref={ref} left={inviteBtnPosition}>
      <Header>
        <Title>Invite to board</Title>
        <CloseBtn onClick={() => toggleInvitePopover()} />
      </Header>
      <MainContainer>
        <MainContent>
          <MemberInput
            placeholder="Email address"
            maxLength={512}
            autoComplete="off"
            type="email"
            autoFocus
            {...register('input', {
              required: true,
              pattern: regex,
            })}
          ></MemberInput>
          {showError && error && <InputErrorField text={error.message} />}
          <SendBtn disabled={disabled} onClick={onSubmit}>
            Send invitation
          </SendBtn>
        </MainContent>
      </MainContainer>
    </Wrapper>
  );
};

export default InvitePopover;
