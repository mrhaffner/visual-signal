import { useState, useEffect, useRef } from 'react';
import useKeypress from '../hooks/useKeyPress';
import useOnClickOutside from '../hooks/useOnClickOutside';
import styled from 'styled-components';

const Wrapper = styled.span`
  word-wrap: break-word;
  clear: both;
  color: #172b4d;
  display: block;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
`;

interface SurfaceStyleProps {
  isInputActive: boolean;
}

const Surface = styled.span<SurfaceStyleProps>`
  cursor: pointer;
  display: ${(props) => (props.isInputActive ? 'none' : '')};
  cursor: ${(props) => (props.isInputActive ? '' : 'pointer')};
`;

interface InputStyleProps {
  isInputActive: boolean;
}

const TextInput = styled.input<InputStyleProps>`
  display: ${(props) => (props.isInputActive ? '' : 'none')};
  font: inherit;
  color: inherit;
  text-align: inherit;
  padding: 0;
  background: none;
  border: none;
  outline: none;
`;

function EditableTextInput(props: any) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue);
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
        props.onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
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
        {props.text}
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
}

export default EditableTextInput;
