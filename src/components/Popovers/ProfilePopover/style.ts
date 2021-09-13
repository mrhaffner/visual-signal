import styled from 'styled-components';

export const Wrapper = styled.div`
  left: 504px;
  top: 84px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
  overflow: hidden;
  position: absolute;
  right: -9999px;
  /* top: -9999px; */
  -webkit-transform: translateZ(0);
  width: 304px;
  z-index: 70;
`;

export const Header = styled.div`
  border-bottom-color: #0000;
  height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  z-index: 1;
  margin-bottom: 8px;
  text-align: center;
`;

export const ContentContainer = styled.div`
  max-height: 1281px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 12px 12px;
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
`;

export const Profile = styled.div`
  margin: 8px 0;
  min-height: 56px;
  position: relative;
`;

export const Avatar = styled.div`
  float: left;
  margin: 2px;
  background-color: #dfe1e6;
  border-radius: 25em;
  display: block;
  height: 50px;
  overflow: hidden;
  position: relative;
  width: 50px;
  z-index: 1;
  &:hover {
    background-color: #c1c7d0;
  }
  &:active {
    background-color: #b3bac5;
  }
`;

export const Initials = styled.span`
  font-weight: 700;
  height: 50px;
  left: 0;
  line-height: 50px;
  position: absolute;
  text-align: center;
  top: 0;
  display: block;
  font-size: 16px;
  overflow: hidden;
  right: 0;
  width: 100%;
`;

export const InfoContainer = styled.div`
  word-wrap: break-word;
  margin: 0 0 0 64px;
`;
export const Title = styled.h3`
  margin: 0 40px 0 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  word-wrap: break-word;
  color: #172b4d;
`;

// export const TitleLink = styled.a`
//   text-decoration: none;
//   color: #172b4d;
//   font-size: 16px;
//   line-height: 20px;
//   font-weight: 600;
//   &:active,
//   :hover {
//     outline: none;
//   }
//   &:hover {
//     color: #091e42;
//     text-decoration: underline;
//   }
// `;

export const StyledText = styled.p`
  color: #5e6c84;
  margin-bottom: 0;
  padding-bottom: 0;
  margin: 0 0 8px;
`;

export const PermissionLevel = styled.span`
  color: #5e6c84;
  font-weight: 400;
`;
///////
export const NewHeaderWrapper = styled.div`
  height: 40px;
  margin-bottom: 8px;
  position: relative;
  text-align: center;
`;

export const BackButton = styled.a`
  color: #6b778c;
  left: 0;
  padding: 10px 8px 10px 12px;
  position: absolute;
  top: 0;
  z-index: 2;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  cursor: pointer;
  &:before {
    content: '\\e90a';
  }
  &:active,
  :hover {
    outline: none;
  }
  &:hover {
    color: #172b4d;
  }
`;

export const NewHeaderText = styled.span`
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

export const ListButton = styled.a`
  cursor: ${(props) => (props.theme.disabled ? 'default' : 'pointer')};
  display: block;
  font-weight: 400;
  margin: 0 -12px;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.theme.disabled ? '#a5adba' : '#172b4d')};
  &:hover {
    background-color: ${(props) => (props.theme.disabled ? '' : '#091e420a')};
  }
  &:active {
    background-color: ${(props) => (props.theme.disabled ? '' : '#e4f0f6')};
  }
`;

ListButton.defaultProps = {
  theme: {
    disabled: false,
  },
};

export const ListBtnSubText = styled.span`
  clear: both;
  color: ${(props) => (props.theme.disabled ? '#a5adba' : '#5e6c84')};
  display: block;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  margin-top: 4px;
`;

ListBtnSubText.defaultProps = {
  theme: {
    disabled: false,
  },
};

export const CheckIcon = styled.span`
  color: ${(props) => (props.theme.disabled ? '#a5adba' : '#42526e')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  &:before {
    content: '\\e916';
  }
`;

CheckIcon.defaultProps = {
  theme: {
    disabled: false,
  },
};

export const StyledHr = styled.hr`
  margin: 8px 0;
  background-color: #091e4221;
  border: 0;
  height: 1px;
  padding: 0;
  width: 100%;
`;

export const StyledStandardText = styled.p`
  margin: 0 0 8px;
`;

export const LeaveRemoveBtn = styled.input`
  width: 100%;
  background-color: #b04632;
  border: none;
  box-shadow: none;
  color: #fff;
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
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
  text-align: center;
  &:hover {
    background-color: #933b27;
    border: none;
    box-shadow: none;
    color: #fff;
  }
  &:active {
    background-color: #6e2f1a;
    border: none;
    box-shadow: none;
    color: #fff;
    outline: 0;
  }
`;
