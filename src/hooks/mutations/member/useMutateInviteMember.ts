import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { INVITE_MEMBER } from '../../../graphql/mutations/all';
import useMemberContext from '../../useMemberContext';

const useMutateInviteMember = (toggleInvitePopover: () => void) => {
  const { setMemberFound } = useMemberContext();
  const [showError, setShowError] = useState(false);

  const [invite, { data, error }] = useMutation(INVITE_MEMBER, {
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
  return { invite, data, error, showError, setShowError };
};

export default useMutateInviteMember;
