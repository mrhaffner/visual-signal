import styled from 'styled-components';

const Wrapper = styled.div`
  /* float: right; */
  display: block;
  position: relative;
`;

const Container = styled.a`
  background-color: #00000014;
  transition: 0.1s ease;
  color: #172b4d;
  border-radius: 3px;
  cursor: pointer;
  float: left;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  max-width: 400px;
  overflow: hidden;
  padding-left: 32px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  &:hover {
    background-color: #00000029;
    color: #172b4d;
  }
  &:active {
    background-color: #0000003d;
  }
`;

const Icon = styled.span`
  color: #42526e;
  background-clip: content-box;
  background-origin: content-box;
  left: 0;
  padding: 6px;
  position: absolute;
  top: 0;
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
  &:before {
    content: '\\e952';
  }
`;

const Text = styled.span`
  overflow: hidden;
  padding-right: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #172b4d;
  font-size: 14px;
  line-height: 32px;
`;

interface Props {
  handleDelete: (id: string) => void;
  id: string;
  goHome: () => void;
}

const BoardMenu = ({ handleDelete, id, goHome }: Props) => {
  const handleClick = () => {
    handleDelete(id);
    goHome();
  };

  return (
    <Wrapper>
      <Container onClick={handleClick}>
        <Icon />
        <Text>Show Menu</Text>
      </Container>
    </Wrapper>
  );
};

export default BoardMenu;
