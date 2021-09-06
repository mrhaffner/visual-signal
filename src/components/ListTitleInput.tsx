import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  height: 28px;
  resize: none;
  background: #0000;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600 !important;
  margin: -4px 0 4px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 4px 8px;
  width: 90%;
  -webkit-appearance: none;
  border: none;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  font: inherit;
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

interface Props {
  text: string;
  submitData: ({ name, _id }: any) => void;
  setHidden: (value: boolean) => void;
  hidden: boolean;
  listId: string;
}

const ListTitleInput = ({
  text,
  submitData,
  listId,
  hidden,
  setHidden,
}: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const [key, setKey] = useState(Math.random());

  const inputRef = useRef(null);

  const onSubmit = handleSubmit((data) => {
    submitData({ name: data.input, _id: listId });
    setHidden(false);
  });

  useEffect(() => {
    if (hidden) {
      // @ts-ignore comment
      inputRef.current.focus();
      // @ts-ignore comment
      inputRef.current.select();
    }
  }, [hidden]);

  useEffect(() => {
    setKey(Math.random());
  }, [text]);

  let noSubmit = false;

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // @ts-ignore comment
      inputRef.current.blur();
    }

    if (e.key === 'Escape') {
      noSubmit = true;
      // @ts-ignore comment
      inputRef.current.blur();
      reset({ input: text });
      setKey(Math.random());
      setHidden(false);
    }
  };

  const handleBlur = () => {
    if (!noSubmit) onSubmit();
  };

  return (
    <div key={key}>
      <StyledTextArea
        spellCheck="false"
        dir="auto"
        maxLength={512}
        onKeyDown={(e) => handleKeyPress(e)}
        {...register('input', { required: true })}
        onBlur={() => handleBlur()}
        ref={inputRef}
        defaultValue={text}
      ></StyledTextArea>
    </div>
  );
};

export default ListTitleInput;
