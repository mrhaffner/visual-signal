import { gql } from '@apollo/client';

export const ALL_BOARDS = gql`
  query GetAllBoards {
    allBoards {
      _id
      name
    }
  }
`;

export const GET_BOARD = gql`
  query GetBoard($id: ID!) {
    getBoardById(_id: $id) {
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

export const GET_MEMBER_BOARDS = gql`
  query GetMember($id: ID!) {
    getMemberBoards(_id: $id) {
      _id
      name
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

export const GET_MEMBER_BY_EMAIL = gql`
  query GetMemberByEmail($email: String!) {
    getMemberByEmail(email: $email) {
      _id
      fullName
      password
      initials
      username
      idBoards
      email
    }
  }
`;
