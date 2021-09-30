import {
  CardComposer,
  CardComposerContainer,
  PlusIcon,
  StyledText,
} from './style';

interface Props {
  setShowComposer: (newState: boolean) => void;
}

const OpenCardComposer = ({ setShowComposer }: Props) => {
  return (
    <CardComposerContainer>
      <CardComposer onClick={() => setShowComposer(true)}>
        <PlusIcon />
        <StyledText>Add a card</StyledText>
      </CardComposer>
    </CardComposerContainer>
  );
};

export default OpenCardComposer;
