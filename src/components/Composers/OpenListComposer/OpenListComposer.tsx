import { ListComposer, ListComposerContainer, PlusIcon } from './style';

interface Props {
  setShowComposer: (newState: boolean) => void;
}

const OpenListComposer = ({ setShowComposer }: Props) => {
  return (
    <ListComposerContainer>
      <ListComposer onClick={() => setShowComposer(true)}>
        <PlusIcon />
        Add another list
      </ListComposer>
    </ListComposerContainer>
  );
};

export default OpenListComposer;
