import { gql } from '@apollo/client';

export const GET_BOARD = gql`
  query GetBoard($id: ID!) {
    getBoardById(_id: $id) {
      _id
      name
      color
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

export const GET_MY_BOARDS = gql`
  query GetMyBoards {
    getMyBoards {
      _id
      name
      color
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
      initials
      username
      idBoards
      email
    }
  }
`;

export const GET_MY_MEMBER_INFO = gql`
  query GetMyMemberInfo {
    getMyMemberInfo {
      _id
      fullName
      initials
      username
      idBoards
      email
    }
  }
`;

export const VALIDATE_EMAIL = gql`
  query ValidateEmail($email: String!) {
    validateEmail(email: $email)
  }
`;
