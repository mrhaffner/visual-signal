import { BoardColorKeys } from '../../../types';
import useHover from '../../../hooks/useHover';
import {
  BoardTileFade,
  Container,
  Title,
  TitleContainer,
  TitleSubContainer,
  Wrapper,
} from './style';

interface Props {
  name: string;
  url: string;
  color: BoardColorKeys;
}

const Card = ({ name, url, color }: Props) => {
  const [hoverRef, isHovered] = useHover();

  return (
    //@ts-ignore
    <Wrapper ref={hoverRef}>
      <Container to={url} color={color}>
        {isHovered && <BoardTileFade />}
        <TitleContainer>
          <TitleSubContainer>
            <Title>{name}</Title>
          </TitleSubContainer>
        </TitleContainer>
      </Container>
    </Wrapper>
  );
};

export default Card;
