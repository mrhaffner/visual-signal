import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useEffect, useRef } from 'react';
import { CREATE_BOARD } from '../../graphql/mutations/all';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import useKeyPress from '../../hooks/useKeyPress';

const OverlayWrapper = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  z-index: 80;
`;

const OverlayContainer = styled.div`
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  width: 100vw;
`;

const ModalWrapper = styled.div`
  background: transparent;
  position: relative;
  margin: 48px 0;
  width: auto;
`;

const ModalContainer = styled.div``;

const SelectContainer = styled.div`
  display: flex;
`;

const Card = styled.div`
  background-color: rgb(0, 121, 191);
  background-size: cover;
  background-position: center center;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  height: 96px;
  padding: 10px 10px 10px 16px;
  position: relative;
  width: 296px;
  &::before {
    background: rgba(0, 0, 0, 0.15);
    position: absolute;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    z-index: 0;
  }
`;

const CloseButton = styled.button`
  color: #fff;
  float: right;
  position: relative;
  right: -2px;
  top: -2px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  text-decoration: none;
  -webkit-appearance: none;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 20px;
  margin-bottom: 8px;
  cursor: pointer;
  overflow: visible;
`;

const IconContainer = styled.span`
  line-height: 1;
`;

const CloseIcon = styled.span`
  --icon-primary-color: #ffffff;
  --icon-secondary-color: inherit;
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
`;

const CloseSVG = styled.svg`
  overflow: hidden;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  color: var(--icon-primary-color);
  fill: var(--icon-secondary-color);
  vertical-align: bottom;
  height: 16px;
  width: 16px;
  line-height: 16px;
  --icon-primary-color: #ffffff;
  --icon-secondary-color: inherit;
`;

const BoardTitleInput = styled.input`
  border: none !important;
  background: transparent !important;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 700;
  left: -8px;
  line-height: 24px;
  margin-bottom: 4px;
  padding: 2px 8px;
  position: relative;
  width: calc(100% - 18px - 16px);
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  line-height: 20px;
  margin-bottom: 12px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  &:focus {
    background: rgba(255, 255, 255, 0.3) !important;
    box-shadow: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    box-shadow: none;
  }
`;

const CreateSectionWrapper = styled.div``;

const CreateButtonContainer = styled.div`
  display: flex;
`;

const CreateButton = styled.button`
  width: 109px;
  margin-top: 8px;
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  -webkit-appearance: none;
  margin-bottom: 8px;
  position: relative;
  &:hover {
    background-color: #026aa7;
    box-shadow: none;
    border: none;
    color: #ffffff;
  }
  &:active {
    background-color: #055a8c;
    box-shadow: none;
    border: none;
    color: #ffffff;
    outline: 0;
  }
  &:disabled {
    background-color: #f4f5f7;
    box-shadow: none;
    border: none;
    color: #a5adba;
    cursor: not-allowed;
  }
`;

interface Props {
  setShowCreateBoardModal: (bool: boolean) => void;
}

const CreateBoardModal = ({ setShowCreateBoardModal }: Props) => {
  const [newBoardMutation, { data }] = useMutation(CREATE_BOARD);

  const history = useHistory();

  const { register, handleSubmit, watch, setFocus } = useForm();
  const watchInput = watch('input');

  //may want to debounce this
  const buttonDisabled = watchInput && watchInput.length > 0 ? false : true;

  const wrapperRef = useRef(null);

  const esc = useKeyPress('Escape');

  const closeModal = () => setShowCreateBoardModal(false);

  useEffect(() => {
    setFocus('input');
    //can remove setFocus from dependency array
  }, [setFocus]);

  useEffect(() => {
    if (data) {
      history.push(`/board/${data.createBoard._id}`);
    }
  });

  useEffect(() => {
    if (esc) closeModal();
  }, [esc]);

  useOnClickOutside(wrapperRef, () => {
    setShowCreateBoardModal(false);
  });

  const onSubmit = handleSubmit((formData) => {
    newBoardMutation({
      variables: { nameInput: formData.input },
    });
  });

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <OverlayWrapper>
      <OverlayContainer>
        <ModalWrapper ref={wrapperRef}>
          <ModalContainer>
            <SelectContainer>
              <Card>
                <CloseButton onClick={closeModal}>
                  <IconContainer>
                    <CloseIcon>
                      <CloseSVG
                        width="24"
                        height="24"
                        role="presentation"
                        focusable="false"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                          fill="currentColor"
                        ></path>
                      </CloseSVG>
                    </CloseIcon>
                  </IconContainer>
                </CloseButton>
                <BoardTitleInput
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  type="text"
                  placeholder="Add board title"
                  onKeyDown={(e) => handleKeyPress(e)}
                  {...register('input', { required: true })}
                />
              </Card>
            </SelectContainer>
            <CreateSectionWrapper>
              <CreateButtonContainer>
                <CreateButton
                  type="button"
                  onClick={onSubmit}
                  disabled={buttonDisabled}
                >
                  Create Board
                </CreateButton>
              </CreateButtonContainer>
            </CreateSectionWrapper>
          </ModalContainer>
        </ModalWrapper>
      </OverlayContainer>
    </OverlayWrapper>
  );
};

export default CreateBoardModal;
