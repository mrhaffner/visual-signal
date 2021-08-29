import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeyPress';
import styled from 'styled-components';

const TitleContainer = styled.div`
  color: #172b4d;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  max-width: calc(100% - 24px);
  overflow: hidden;
  padding: 0;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 3px;
  /* float: left; */
  height: 32px;
  margin: 0 4px 4px 0;
  position: relative;
  &:hover {
    background-color: #00000029;
  }
`;

const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleInput = styled.input`
  /* what this about? calculated? */
  width: 89px;
  background-color: #fff;
  border: 0;
  /* display: none; */
  font-size: 18px;
  font-weight: 700;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  -webkit-appearance: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  box-sizing: border-box;
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  font: inherit;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  -webkit-rtl-ordering: logical;
  cursor: text;
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;

interface Props {
  text: string;
  submitData: (text: string) => void;
}

const BoardTitleForm = ({ text, submitData }: any) => {
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, setFocus, reset } = useForm({
    defaultValues: { input: text },
  });

  const wrapperRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  const onSubmit = handleSubmit((data) => {
    submitData(data.input);
  });

  useOnClickOutside(wrapperRef, () => {
    if (showForm) {
      onSubmit();
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
    if (enter) {
      onSubmit();
      setShowForm(false);
    }
    // if Escape is pressed, revert the text and close the editor
    if (esc) {
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
          maxLength={512}
          {...register('input', { required: true })}
        />
      ) : (
        <TitleText onClick={() => setShowForm(true)}>{text}</TitleText>
      )}
    </TitleContainer>
  );
};

export default BoardTitleForm;
