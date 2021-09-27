import { useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { INVITE_MEMBER } from '../../../graphql/mutations/all';
import useKeyPress from '../../../hooks/useKeyPress';
import useMemberContext from '../../../hooks/useMemberContext';
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
  const { setMemberFound } = useMemberContext();
  const [showError, setShowError] = useState(false);

  const [invite, { data: inviteData, error }] = useMutation(INVITE_MEMBER, {
    onError: (error) => {
      if (error.message === 'Response not successful: Received status code 400')
        setMemberFound(false);
      if (
        error.message === 'Member does not exist' ||
        error.message === 'Member already belongs to this board!'
      ) {
        setShowError(true);
      }
    },
    onCompleted: () => {
      toggleInvitePopover();
    },
  });

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

  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

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
          {/* needs to autofocus */}
          <MemberInput
            // placeholder="Email address or name"
            placeholder="Email address"
            maxLength={512}
            autoComplete="off"
            // type="text"
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
