import { gql } from '@apollo/client';

export const ALL_BOARDS = gql`
  query GetAllBoard {
    allBoards {
      _id
      name
    }
  }
`;

export const GET_BOARD = gql`
  query GetBoard {
    getBoardById {
      _id
      name
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

export const ALL_LISTS = gql`
  query GetAllLists {
    allLists {
      _id
      name
      pos
      cards {
        _id
        name
        pos
        idList
      }
    }
  }
`;
