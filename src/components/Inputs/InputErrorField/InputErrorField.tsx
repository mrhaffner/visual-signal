import { Container, Logo, StyledText, SVG, Wrapper } from './style';

interface Props {
  text: string;
}

const InputErrorField = ({ text }: Props) => {
  return (
    <Wrapper>
      <Container>
        <Logo>
          <SVG width={24} height={24} viewBox="0 0 24 24">
            <g fillRule="evenodd">
              <path d="M13.416 4.417a2.002 2.002 0 00-2.832 0l-6.168 6.167a2.002 2.002 0 000 2.833l6.168 6.167a2.002 2.002 0 002.832 0l6.168-6.167a2.002 2.002 0 000-2.833l-6.168-6.167z"></path>
              <path
                d="M12 14a1 1 0 01-1-1V8a1 1 0 012 0v5a1 1 0 01-1 1m0 3a1 1 0 010-2 1 1 0 010 2"
                fill="white"
              ></path>
            </g>
          </SVG>
        </Logo>
        <StyledText>{text}</StyledText>
      </Container>
    </Wrapper>
  );
};

export default InputErrorField;
