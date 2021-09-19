import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.857143em;
  font-style: inherit;
  line-height: 1.33333;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-danger, #de350b);
  margin-top: 4px;
  display: flex;
  margin: 0;
  padding: 0;
`;

const Container = styled.span`
  font-size: 0.857143em;
  font-style: inherit;
  line-height: 1.33333;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-danger, #de350b);
  display: flex;
`;

const Logo = styled.span`
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
  width: 16px;
  height: 16px;
  --icon-primary-color: currentColor;
  --icon-secondary-color: #ffffff;
`;

const SVG = styled.svg`
  width: 16px;
  height: 16px;
  overflow: hidden;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  color: white;
  fill: #de350b;
  vertical-align: bottom;
`;

const StyledText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #de350b;
`;

interface Props {
  type: string;
}

const InputErrorField = ({ type }: Props) => {
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
        <StyledText>Please enter an {type}</StyledText>
      </Container>
    </Wrapper>
  );
};

export default InputErrorField;
