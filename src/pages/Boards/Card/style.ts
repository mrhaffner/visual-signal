import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BoardColorKeys } from '../../../types';

export const Wrapper = styled.li`
  margin: 0 2% 2% 0;
  padding: 0;
  transform: translate(0);
  width: 23.5%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  list-style: none;

  &:nth-child(4n) {
    margin-right: 0;
  }

  @media only screen and (min-width: 751px) and (max-width: 900px) {
    width: 32%;
    :nth-child(4n) {
      margin-right: 2%;
    }
  }

  @media only screen and (max-width: 750px) {
    margin-bottom: 8px;
    margin-right: 8px;
    width: calc(50% - 4px);
    :nth-child(2n) {
      margin-right: 0;
    }
  }
`;

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
};

interface ColorProps {
  color: BoardColorKeys;
}

export const Container = styled(Link)<ColorProps>`
  margin-right: 0;
  border-radius: 3px;
  display: block;
  background-color: ${(props) => colors[props.color] || '#97a0af'};
  background-position: 50%;
  background-size: cover;
  line-height: 20px;
  padding: 8px;
  position: relative;
  text-decoration: none;
`;

export const BoardTileFade = styled.span`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 3px;
  display: block;
  background-color: #00000040;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
  position: relative;
  color: #fff;
  line-height: 20px;
`;

export const TitleSubContainer = styled.div`
  word-wrap: break-word;
  display: inline-block;
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  max-height: 40px;
  overflow: hidden;
  width: 100%;
`;

export const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
`;
