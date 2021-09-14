import styled from 'styled-components';

const CardComposerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 38px;
  min-height: 38px;
  padding-right: 8px;
`;

const CardComposer = styled.a`
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #091e4214;
    color: #172b4d;
  }
`;

const PlusIcon = styled.span`
  color: #6b778c;
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
`;

const StyledText = styled.span`
  color: #5e6c84;
`;

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
