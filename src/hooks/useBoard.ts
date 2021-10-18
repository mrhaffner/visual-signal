import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { BoardInterface, ColorKeys, MemberInfo } from '../types';
import useMemberContext from './useMemberContext';

const useBoard = (
  setBoardColor: (input: ColorKeys) => void,
  board: BoardInterface | null,
  error: ApolloError | undefined,
) => {
  const { member, setMemberFound } = useMemberContext();
  let history = useHistory();

  const memberLevel =
    board?.members.filter((x: MemberInfo) => x.idMember === member._id) || [];

  useEffect(() => {
    if (board) {
      if (memberLevel?.length === 0) {
        history.push('/boards');
      }
    }
  });

  useEffect(() => {
    if (board) {
      setBoardColor(board.color);
    }
  }, [board?.color]);

  useEffect(() => {
    if (error) setMemberFound(false);
  }, [error]);

  return { member, memberLevel };
};

export default useBoard;
