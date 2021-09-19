import styled from 'styled-components';

interface PositionProps {
  left: number;
}
export const Wrapper = styled.div<PositionProps>`
  left: ${(props) => props.left + 'px'};
  top: 86px;
  overflow: visible;
  width: 304px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
  position: absolute;
  /* right: -9999px; */
  /* top: -9999px; */
  -webkit-transform: translateZ(0);
  z-index: 70;
`;

export const Header = styled.div`
  height: 40px;
  margin-bottom: 8px;
  position: relative;
  text-align: center;
`;

export const Title = styled.span`
  border-bottom: 1px solid #091e4221;
  box-sizing: border-box;
  color: #5e6c84;
  display: block;
  line-height: 40px;
  margin: 0 12px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
  text-align: center;
`;

export const MainContainer = styled.div`
  max-height: 1253px;
  overflow: visible;
  padding: 0 12px 12px;
  -webkit-transform: translateZ(0);
`;

export const MainContent = styled.div`
  /* min-height: 300px; */
  padding-bottom: 48px;
  /* margin taken from below */
  margin-top: 12px;
  position: relative;
`;

// export const InputContainer = styled.div`
//   margin-top: 12px;
//   min-height: 40px;
//   padding: 4px 8px;
//   background-color: #fafbfc;
//   border-radius: 3px;
//   box-shadow: inset 0 0 0 2px #dfe1e6;
//   box-sizing: border-box;
//   margin: auto;
//   max-width: 512px;
//   position: relative;
//   &:focus {
//     background-color: #fff;
//     box-shadow: inset 0 0 0 2px #0079bf;
//   }
//   &:hover {
//     background-color: #ebecf0;
//     box-shadow: inset 0 0 0 2px #dfe1e6;
//   }
// `;

// export const InputAutoComplete = styled.div`
//   max-height: 90px;
//   overflow-y: auto;
//   align-items: center;
//   display: flex;
//   flex-flow: row wrap;
// `;

// export const MemberInput = styled.input`
//   min-width: 2px;
//   flex: 1;
//   font-size: 14px;
//   height: 24px;
//   margin: 3px 7px 3px 0;
//   min-height: 0;
//   /* min-width: 20px; */
//   background-color: initial;
//   border: none;
//   box-shadow: none;
//   max-width: 100%;
//   overflow-x: auto;
//   overflow-y: hidden;
//   padding: 0;
//   width: auto;
//   -webkit-appearance: none;
//   border: none;
//   border-radius: 3px;
//   box-sizing: border-box;
//   display: block;
//   line-height: 20px;
//   outline: none;
//   transition-duration: 85ms;
//   transition-property: background-color, border-color, box-shadow;
//   transition-timing-function: ease;
//   color: rgba(23, 43, 77, 0.3);
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
//     Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
//   font-weight: 400;
//   &:focus {
//     border-color: #0000;
//     box-shadow: none;
//     outline: 0;
//   }
// `;

export const MemberInput = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc !important;
  line-height: 20;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 3px;
  height: 40px;
  /* transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s; */
  background: #edeff0;
  padding: 0.5em;
  max-width: 400px;
  margin: 0 0 1.2em;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif !important;
  font-weight: 400 !important;
  &::placeholder {
    color: rgba(23, 43, 77, 0.3);
  }
  &:hover {
    background-color: #ebecf0 !important;
  }
  &:focus {
    background-color: white;
    border: 2px solid #4c9aff;
    box-shadow: 0 0 0;
    pointer-events: none;
  }
`;

interface SendBtnProps {
  disabled: boolean;
}

export const SendBtn = styled.button<SendBtnProps>`
  bottom: 0;
  display: block;
  height: 40px;
  margin: 12px auto 0;
  position: absolute;
  width: 100%;
  background-color: ${(props) => (props.disabled ? '#091e420a' : '#0079bf')};
  border: none;
  box-shadow: none;
  color: ${(props) => (props.disabled ? '#a5adba' : '#fff')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 400;
  justify-content: center;
  line-height: 20px;
  padding: 6px 12px;
  text-decoration: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  &:hover {
    background-color: ${(props) => (props.disabled ? '' : '#026aa7')};
  }
  &:active {
    background-color: ${(props) => (props.disabled ? '' : '#055a8c')};
  }
`;
