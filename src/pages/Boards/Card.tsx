import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.li`
  margin: 0 2% 2% 0;
  padding: 0;
  transform: translate(0);
  width: 23.5%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  list-style: none;

  &:nth-child(4n) {
    margin-right: 0;
  }

  @media only screen and (min-width: 751px) and (max-width: 900px) {
    width: 32%;
    :nth-child(4n) {
      margin-right: 2%;
    }
  }

  @media only screen and (max-width: 750px) {
    margin-bottom: 8px;
    margin-right: 8px;
    width: calc(50% - 4px);
    :nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const Container = styled(Link)`
  margin-right: 0;
  border-radius: 3px;
  display: block;
  background-color: #97a0af;
  background-position: 50%;
  background-size: cover;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  &:hover {
    background-color: grey;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
  position: relative;
  color: #fff;
  line-height: 20px;
`;

const TitleSubContainer = styled.div`
  word-wrap: break-word;
  display: inline-block;
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  max-height: 40px;
  overflow: hidden;
  width: 100%;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
`;

interface Props {
  name: string;
  url: string;
}

const Card = ({ name, url }: Props) => {
  return (
    <>
      <Wrapper>
        <Container to={url}>
          <TitleContainer>
            <TitleSubContainer>
              <Title>{name}</Title>
            </TitleSubContainer>
          </TitleContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default Card;
