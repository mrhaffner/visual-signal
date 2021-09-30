import styled from 'styled-components';

export const SubmitButton = styled.input`
  -webkit-box-align: baseline;
  align-items: baseline;
  border-width: 0px;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-flex;
  font-size: inherit;
  font-style: normal;
  font-family: inherit;
  font-weight: 500;
  max-width: 100%;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background 0.1s ease-out 0s,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  white-space: nowrap;
  background: var(--background-boldBrand-resting, #0052cc);
  cursor: pointer;
  padding: 0px 10px;
  vertical-align: middle;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  color: var(--text-onBold, #ffffff) !important;
  height: 40px !important;
  line-height: 40px !important;
  background-color: rgb(0, 82, 204);
  &:hover {
    background: var(--background-boldBrand-hover, #0065ff);
    text-decoration: inherit;
    transition-duration: 0s, 0.15s;
  }
  &:active {
    background: var(--background-boldBrand-pressed, #0747a6);
    transition-duration: 0s, 0s;
  }
  &:focus {
    background: var(--background-boldBrand-resting, #0052cc);
    box-shadow: 0 0 0 2px var(--border-focus, #4c9aff);
    transition-duration: 0s, 0.2s;
    outline: none;
    color: var(--text-onBold, #ffffff) !important;
  }
  margin: 0 0 1.2em;
`;
