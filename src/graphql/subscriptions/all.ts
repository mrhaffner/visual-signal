import { gql } from '@apollo/client';

export const BOARD_UPDATE_SUBSCRIPTION = gql`
  subscription BoardUpdateSubscription {
    boardUpdated {
      _id
      name
      idMemberCreator
      members {
        idMember
        memberType
        fullName
        username
        initials
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

export const BOARD_DELETED_SUBSCRIPTION = gql`
  subscription BoardDeletedSubscription($idBoards: [ID!]!) {
    boardDeleted(idBoards: $idBoards)
  }
`;

export const REMOVE_FROM_BOARD_SUBSCRIPTION = gql`
  subscription RemoveFromBoardSubscription {
    removeFromBoard {
      boardId
      memberId
    }
  }
`;

export const NEW_BOARD = gql`
  subscription NewBoard {
    newBoard {
      memberId
      boardObj {
        _id
        name
      }
    }
  }
`;
