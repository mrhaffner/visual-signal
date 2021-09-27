import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ColorKeys } from './types';
import './fonts/fontFix.css';

const colors = {
  blue: 'rgb(0, 121, 191)',
  orange: 'rgb(210, 144, 52)',
  green: 'rgb(81, 152, 57)',
  red: 'rgb(176, 70, 50)',
  purple: 'rgb(137, 96, 158)',
  pink: 'rgb(205, 90, 145)',
  lime: 'rgb(75, 191, 107)',
  sky: 'rgb(0, 174, 204)',
  grey: 'rgb(131, 140, 145)',
  default: '',
};

interface GlobalProps {
  color: ColorKeys;
}

const GlobalStyles = createGlobalStyle<GlobalProps>`
    ${reset}

    body {
        color: #172b4d;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        background-color: ${(props) => colors[props.color]};
    }
`;
//@ts-ignore
export default GlobalStyles;
