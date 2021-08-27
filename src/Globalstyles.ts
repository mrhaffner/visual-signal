import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
// @ts-ignore comment
import trellicons from './fonts/trellicons.ttf';

const GlobalStyles = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: trellicons;
        src: url(${trellicons}) format("truetype");
        font-weight: 400;
        font-style: normal;
    }

    body {
        color: #172b4d;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }
`;

export default GlobalStyles;
