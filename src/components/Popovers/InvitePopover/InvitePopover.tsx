import { useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { INVITE_MEMBER } from '../../../graphql/mutations/all';
import useKeyPress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
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
}

const InvitePopover = ({ toggleInvitePopover, boardId }: Props) => {
  const [invite] = useMutation(INVITE_MEMBER);

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

  //add email regex
  const onSubmit = handleSubmit((data) => {
    invite({ variables: { inviteInput: { email: data.input, boardId } } });
    toggleInvitePopover();
  });

  return (
    <Wrapper ref={ref}>
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
          <SendBtn disabled={disabled} onClick={onSubmit}>
            Send invitation
          </SendBtn>
        </MainContent>
      </MainContainer>
    </Wrapper>
  );
};

export default InvitePopover;
