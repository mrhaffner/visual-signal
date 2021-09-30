import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useKeypress from '../../../hooks/useKeyPress';
import { TitleContainer, TitleInput, TitleText } from './style';

interface Props {
  text: string;
  submitData: (text: string) => void;
}

const BoardTitleForm = ({ text, submitData }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, setFocus, reset, watch } = useForm({
    defaultValues: { input: text },
  });
  const watchInput = watch('input');

  const wrapperRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  const onSubmit = handleSubmit((data) => {
    submitData(data.input);
  });

  useOnClickOutside(wrapperRef, () => {
    if (showForm) {
      if (!watchInput.length) {
        reset({ input: text });
      } else {
        onSubmit();
      }
      setShowForm(false);
    }
  });

  useEffect(() => {
    if (showForm) {
      setFocus('input');
    }
  }, [showForm]);

  useEffect(() => {
    // if Enter is pressed, save the text and case the editor
    if (enter && showForm) {
      if (!watchInput.length) {
        reset({ input: text });
      } else {
        onSubmit();
      }
      setShowForm(false);
    }
    // if Escape is pressed, revert the text and close the editor
    if (esc && showForm) {
      reset({ input: text });
      setShowForm(false);
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <TitleContainer ref={wrapperRef}>
      {showForm ? (
        <TitleInput
          spellCheck="false"
          dir="auto"
          {...register('input', { required: true })}
        />
      ) : (
        <TitleText onClick={() => setShowForm(true)}>{text}</TitleText>
      )}
    </TitleContainer>
  );
};

export default BoardTitleForm;
