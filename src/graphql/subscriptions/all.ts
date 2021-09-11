import { gql } from '@apollo/client';

export const BOARD_SUBSCRIPTION = gql`
  subscription BoardSubscription($idBoard: ID!) {
    newBoard(idBoard: $idBoard) {
      _id
      name
      idMemberCreator
      members {
        idMember
        memberType
      }
      lists {
        _id
        name
        pos
        idBoard
        cards {
          _id
          name
          pos
          idList
        }
      }
    }
  }
`;

export const BOARD_LIST_SUBSCRIPTION = gql`
  subscription BoardListSubscription($memberId: ID!) {
    newBoardList(memberId: $memberId) {
      _id
      name
    }
  }
`;
