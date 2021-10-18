import { useMutation } from '@apollo/client';
import { useEffect, useRef, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { CREATE_BOARD } from '../graphql/mutations/board';
import { colorRandomizer } from '../utlities/colorRandomizer';
import useKeyPress from './useKeyPress';
import useMemberContext from './useMemberContext';
import useOnClickOutside from './useOnClickOutside';

const useCreateBoardModal = (toggleCreateBoardModal: () => void) => {
  const { setMemberFound } = useMemberContext();
  const [newBoardMutation, { data }] = useMutation(CREATE_BOARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const history = useHistory();

  const { register, handleSubmit, watch, setFocus } = useForm();
  const watchInput = watch('input');

  const buttonDisabled = watchInput && watchInput.length > 0 ? false : true;

  const wrapperRef = useRef(null);

  const esc = useKeyPress('Escape');

  useEffect(() => {
    setFocus('input');
  }, [setFocus]);

  useEffect(() => {
    if (data) {
      history.push(`/board/${data.createBoard._id}`);
    }
  });

  useEffect(() => {
    if (esc) toggleCreateBoardModal();
  }, [esc]);

  useOnClickOutside(wrapperRef, () => {
    toggleCreateBoardModal();
  });

  const onSubmit = handleSubmit((formData) => {
    newBoardMutation({
      variables: {
        boardInput: {
          name: formData.input,
          color: colorRandomizer(),
        },
      },
    });
  });

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return { wrapperRef, handleKeyPress, register, onSubmit, buttonDisabled };
};

export default useCreateBoardModal;
