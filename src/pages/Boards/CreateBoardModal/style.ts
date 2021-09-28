import styled from 'styled-components';

export const OverlayWrapper = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  z-index: 80;
`;

export const OverlayContainer = styled.div`
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: auto;
  width: 100vw;
`;

export const ModalWrapper = styled.div`
  background: transparent;
  position: relative;
  margin: 48px 0;
  width: auto;
`;

export const SelectContainer = styled.div`
  display: flex;
`;

export const Card = styled.div`
  background-color: rgb(0, 121, 191);
  background-size: cover;
  background-position: center center;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  height: 96px;
  padding: 10px 10px 10px 16px;
  position: relative;
  width: 296px;
  &::before {
    background: rgba(0, 0, 0, 0.15);
    position: absolute;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    z-index: 0;
  }
`;

export const CloseButton = styled.button`
  color: #fff;
  float: right;
  position: relative;
  right: -2px;
  top: -2px;
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  text-decoration: none;
  -webkit-appearance: none;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 20px;
  margin-bottom: 8px;
  cursor: pointer;
  overflow: visible;
`;

export const IconContainer = styled.span`
  line-height: 1;
`;

export const CloseIcon = styled.span`
  --icon-primary-color: #ffffff;
  --icon-secondary-color: inherit;
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
`;

export const CloseSVG = styled.svg`
  overflow: hidden;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  color: var(--icon-primary-color);
  fill: var(--icon-secondary-color);
  vertical-align: bottom;
  height: 16px;
  width: 16px;
  line-height: 16px;
  --icon-primary-color: #ffffff;
  --icon-secondary-color: inherit;
`;

export const BoardTitleInput = styled.input`
  border: none !important;
  background: transparent !important;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 700;
  left: -8px;
  line-height: 24px;
  margin-bottom: 4px;
  padding: 2px 8px;
  position: relative;
  width: calc(100% - 18px - 16px);
  -webkit-appearance: none;
  border-radius: 3px;
  display: block;
  line-height: 20px;
  margin-bottom: 12px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  &:focus {
    background: rgba(255, 255, 255, 0.3) !important;
    box-shadow: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    box-shadow: none;
  }
`;

const CreateSectionWrapper = styled.div``;

export const CreateButtonContainer = styled.div`
  display: flex;
`;

export const CreateButton = styled.button`
  width: 109px;
  margin-top: 8px;
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  -webkit-appearance: none;
  margin-bottom: 8px;
  position: relative;
  &:hover {
    background-color: #026aa7;
    box-shadow: none;
    border: none;
    color: #ffffff;
  }
  &:active {
    background-color: #055a8c;
    box-shadow: none;
    border: none;
    color: #ffffff;
    outline: 0;
  }
  &:disabled {
    background-color: #f4f5f7;
    box-shadow: none;
    border: none;
    color: #a5adba;
    cursor: not-allowed;
  }
`;
