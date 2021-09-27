import styled from 'styled-components';

const ListComposerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 38px;
  min-height: 38px;
  padding-right: 8px;
  background-color: #00000014;
  width: 272px;
  border-radius: 3px;
  margin: 0 4px;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
  &:active {
    background-color: #0000003d;
  }
  &:hover {
    background-color: #00000029;
  }
  flex-shrink: 0;
  margin-right: 8px;
`;

const ListComposer = styled.a`
  display: block;
  flex: 1 0 auto;
  margin: 2px 0 8px 8px;
  padding: 6px 8px;
  position: relative;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  color: #172b4d;
`;

const PlusIcon = styled.span`
  margin-right: 2px;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
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
    content: '\\e901';
  }
  color: #42526e;
`;

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
