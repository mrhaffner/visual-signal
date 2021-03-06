import { useState, useEffect, useRef } from 'react';
import useKeypress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Wrapper, Surface, TextInput } from './style';

const InlineTextEditCard = ({ text, onSetText }: any) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      // @ts-ignore comment
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <Wrapper ref={wrapperRef}>
      <Surface
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        isInputActive={isInputActive}
      >
        {text}
      </Surface>
      <TextInput
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        isInputActive={isInputActive}
      />
    </Wrapper>
  );
};

export default InlineTextEditCard;
