import styled from 'styled-components';

export const AllBoards = styled.div`
  max-width: 825px;
  min-width: 288px;
  width: 100%;
`;

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 900px) {
    margin: 0 13%;
  }
`;

export const BoardsTitle = styled.h3`
  align-items: center;
  color: #5e6c84;
  display: flex;
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 20px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
