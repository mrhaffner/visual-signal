import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  toggleInvitePopover: () => void;
}

const InvitePopover = ({ toggleInvitePopover }: Props) => {
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
    if (watchInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchInput]);

  const onSubmit = handleSubmit((data) => {});

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
            placeholder="Email address or name"
            maxLength={512}
            autoComplete="off"
            type="text"
            autoFocus
            {...register('input', { required: true })}
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
