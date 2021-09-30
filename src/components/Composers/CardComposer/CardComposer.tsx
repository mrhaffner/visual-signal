import { ListInterface } from '../../../types';
import { useForm } from 'react-hook-form';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useKeypress from '../../../hooks/useKeyPress';
import { useRef, useEffect } from 'react';
import {
  AddButton,
  CancelButton,
  CardComposerContainer,
  CardDetailsContainer,
  CardTextInputContainer,
  ControlsSection,
  StyledTextArea,
} from './style';

interface Props {
  setShowComposer: (newState: boolean) => void;
  submitData: (data: string, list: ListInterface) => void;
  list: ListInterface;
}

const CardComposer = ({ setShowComposer, submitData, list }: Props) => {
  const { register, handleSubmit, setFocus, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    submitData(data.input, list);
    reset();
  });

  const wrapperRef = useRef(null);

  const esc = useKeypress('Escape');

  useOnClickOutside(wrapperRef, () => {
    onSubmit();
    setShowComposer(false);
  });

  useEffect(() => {
    setFocus('input');
  }, [submitData]);

  useEffect(() => {
    if (esc) {
      reset();
      setShowComposer(false);
    }
  }, [esc]);

  const onPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <CardComposerContainer ref={wrapperRef}>
      <CardTextInputContainer onSubmit={onSubmit}>
        <CardDetailsContainer>
          <StyledTextArea
            placeholder="Enter a title for this card..."
            dir="auto"
            {...register('input', { required: true })}
            onKeyPress={(e) => onPressEnter(e)}
          />
        </CardDetailsContainer>
        <div>
          <ControlsSection>
            <AddButton type="submit" value="Add card" />
            <CancelButton onClick={() => setShowComposer(false)} />
          </ControlsSection>
        </div>
      </CardTextInputContainer>
    </CardComposerContainer>
  );
};

export default CardComposer;
