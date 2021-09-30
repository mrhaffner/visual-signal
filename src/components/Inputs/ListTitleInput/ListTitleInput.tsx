import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { StyledTextArea } from './style';

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
  const { register, handleSubmit, reset, watch } = useForm();
  const watchInput = watch('input');
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
      if (!watchInput.length) {
        setKey(Math.random());
      }
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
