import styled from 'styled-components';

const CardComposerContainer = styled.div`
  padding-bottom: 8px;
  margin: 0 4px;
  padding: 0 4px;
`;

const CardTextInputContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`;

const CardDetailsContainer = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  z-index: 10;
`;

const StyledTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  background: none;
  border: none;
  box-shadow: none;
  margin-bottom: 4px;
  max-height: 162px;
  min-height: 54px;
  padding: 0;
  width: 100%;
  font: inherit;
  -webkit-appearance: none;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
`;

const ControlsSection = styled.div`
  float: left;
`;

const AddButton = styled.input`
  margin-bottom: 0;
  margin-top: 0;
  vertical-align: top;
  background-color: #0079bf;
  border: none;
  box-shadow: none;
  color: #fff;
  margin: 8px 4px 0 0;
  text-align: center;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  line-height: 20px;
  padding: 6px 12px;
  text-decoration: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  box-sizing: border-box;
  border-radius: 3px;
  align-items: center;
  &:active {
    background-color: #055a8c;
    border: none;
    box-shadow: none;
    color: #fff;
    outline: 0;
  }
  &:hover {
    background-color: #026aa7;
    border: none;
    box-shadow: none;
    color: #fff;
  }
`;

const CancelButton = styled.a`
  color: #6b778c;
  height: 32px;
  line-height: 32px;
  width: 32px;
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
    content: '\\e91c';
  }
  &:hover {
    color: #172b4d;
    text-decoration: none;
  }

  font-size: 26px;
`;

const CardComposer = () => {
  return (
    <CardComposerContainer>
      <CardTextInputContainer>
        <CardDetailsContainer>
          <StyledTextArea placeholder="Enter a title for this card..." />
        </CardDetailsContainer>
        <div>
          <ControlsSection>
            <AddButton type="submit" value="Add card" />
            <CancelButton />
          </ControlsSection>
        </div>
      </CardTextInputContainer>
    </CardComposerContainer>
  );
};

export default CardComposer;
