import { useForm } from 'react-hook-form';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useKeypress from '../../../hooks/useKeyPress';
import { useRef, useEffect } from 'react';
import {
  AddButton,
  CancelButton,
  ControlsContainer,
  ListWrapper,
  StyledInput,
} from './style';

interface Props {
  setShowComposer: (newState: boolean) => void;
  submitData: (data: string) => void;
}

const ListComposer = ({ setShowComposer, submitData }: Props) => {
  const { register, handleSubmit, setFocus, reset } = useForm();

  const wrapperRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  const onSubmit = handleSubmit((data) => {
    submitData(data.input);
    reset();
  });

  useOnClickOutside(wrapperRef, () => {
    onSubmit();
    setShowComposer(false);
  });

  useEffect(() => {
    setFocus('input');
  }, [submitData]);

  useEffect(() => {
    if (enter) {
      onSubmit();
    }
    if (esc) {
      reset();
      setShowComposer(false);
    }
  }, [enter, esc]);

  return (
    <ListWrapper ref={wrapperRef}>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="Enter list title..."
          maxLength={512}
          autoComplete="off"
          {...register('input', { required: true })}
        />
      </form>
      <ControlsContainer>
        <AddButton type="submit" value="Add list" onClick={onSubmit} />
        <CancelButton onClick={() => setShowComposer(false)} />
      </ControlsContainer>
    </ListWrapper>
  );
};

export default ListComposer;
