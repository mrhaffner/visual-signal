import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: 4px;
  height: 92vh;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #00000026;
    border-radius: 4px;
    /* border-right: 13px white solid;
    background-clip: padding-box; */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
