import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeypress from '../hooks/useKeyPress';
import { useRef, useEffect } from 'react';

const ListWrapper = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  height: auto;
  max-height: 80px;
  min-height: 80px;
  padding: 4px;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
  margin-right: 8px;
  box-sizing: border-box;
  display: inline-block;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 272px;
`;

const StyledInput = styled.input`
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #0079bf;
  display: block;
  margin: 0;
  transition: margin 85ms ease-in, background 85ms ease-in;
  width: 100%;
  -webkit-appearance: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
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
`;

const ControlsContainer = styled.div`
  height: 32px;
  transition: margin 85ms ease-in, height 85ms ease-in;
`;

const AddButton = styled.input`
  margin-bottom: 0;
  margin-top: 0;
  vertical-align: top;
  background-color: #0079bf;
  border: none;
  box-shadow: none;
  color: #fff;
  margin: 4px 4px 0 0;
  text-align: center;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  line-height: 20px;
  padding: 6px 12px;
  text-decoration: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  box-sizing: border-box;
  border-radius: 3px;
  align-items: center;
  &:active {
    background-color: #055a8c;
    border: none;
    box-shadow: none;
    color: #fff;
    outline: 0;
  }
  &:hover {
    background-color: #026aa7;
    border: none;
    box-shadow: none;
    color: #fff;
  }
`;

const CancelButton = styled.a`
  color: #42526e;
  height: 32px;
  line-height: 32px;
  width: 32px;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  cursor: pointer;
  &:before {
    content: '\\e91c';
  }
  &:hover {
    color: #172b4d;
    text-decoration: none;
  }

  font-size: 26px;
`;

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
  });

  useOnClickOutside(wrapperRef, () => {
    onSubmit();
    setShowComposer(false);
  });

  useEffect(() => {
    setFocus('input');
    //can remove setFocus from dependency array
  }, [submitData, setFocus]);

  useEffect(() => {
    if (enter) {
      onSubmit();
      reset();
    }
    if (esc) {
      reset();
      setShowComposer(false);
    }
    //only need enter and esc in dependency array
  }, [enter, esc, reset, setShowComposer, onSubmit]);

  return (
    <ListWrapper ref={wrapperRef}>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="Enter list title..."
          dir="auto"
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
