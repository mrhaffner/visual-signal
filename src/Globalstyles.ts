import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ColorKeys } from './types';
import './fonts/fontFix.css';
import { colors } from './constants/colors';

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

export default GlobalStyles;
