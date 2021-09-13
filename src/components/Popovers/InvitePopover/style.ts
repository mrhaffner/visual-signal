import styled from 'styled-components';

export const Wrapper = styled.div`
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
