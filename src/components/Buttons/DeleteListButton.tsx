import { memo } from 'react';
import styled from 'styled-components';

const Button = styled.span`
  position: absolute;
  right: 4px;
  top: 4px;
  border-radius: 3px;
  color: #6b778c;
  float: left;
  padding: 6px;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  /* display: inline-block; */
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  cursor: pointer;
  &:before {
    content: '\\e952';
  }
  &:hover {
    color: #172b4d;
    text-decoration: none;
    background-color: #091e4214;
  }
`;

interface Props {
  handleDelete: (id: string) => void;
  id: string;
}

const DeleteListButton = memo(({ handleDelete, id }: Props) => (
  <Button onClick={() => handleDelete(id)}></Button>
));

export default DeleteListButton;
