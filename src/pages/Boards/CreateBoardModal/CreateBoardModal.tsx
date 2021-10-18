import {
  ModalWrapper,
  OverlayContainer,
  OverlayWrapper,
  SelectContainer,
  Card,
  CloseButton,
  IconContainer,
  CloseIcon,
  CloseSVG,
  BoardTitleInput,
  CreateButtonContainer,
  CreateButton,
} from './style';
import useCreateBoardModal from '../../../hooks/useCreateBoardModal';

interface Props {
  toggleCreateBoardModal: () => void;
}

const CreateBoardModal = ({ toggleCreateBoardModal }: Props) => {
  const { wrapperRef, handleKeyPress, register, onSubmit, buttonDisabled } =
    useCreateBoardModal(toggleCreateBoardModal);

  return (
    <OverlayWrapper>
      <OverlayContainer>
        <ModalWrapper ref={wrapperRef}>
          <div>
            <SelectContainer>
              <Card>
                <CloseButton onClick={toggleCreateBoardModal}>
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
            <div>
              <CreateButtonContainer>
                <CreateButton
                  type="button"
                  onClick={onSubmit}
                  disabled={buttonDisabled}
                >
                  Create Board
                </CreateButton>
              </CreateButtonContainer>
            </div>
          </div>
        </ModalWrapper>
      </OverlayContainer>
    </OverlayWrapper>
  );
};

export default CreateBoardModal;
