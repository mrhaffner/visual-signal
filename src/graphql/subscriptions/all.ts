import { gql } from '@apollo/client';

export const BOARD_SUBSCRIPTION = gql`
  subscription BoardSubscription {
    newBoard {
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
  subscription BoardListSubscription {
    newBoardList {
      _id
      name
    }
  }
`;
