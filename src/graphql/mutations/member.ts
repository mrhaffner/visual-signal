import { gql } from '@apollo/client';

export const CREATE_MEMBER = gql`
  mutation CreateMemberMutation($memberInput: CreateMember!) {
    createMember(input: $memberInput) {
      value
    }
  }
`;

export const UPDATE_MEMBER_BOARDS = gql`
  mutation UpdateMemberBoardsMutation($boardsInput: UpdateMemberBoardInput!) {
    updateMemberBoards(input: $boardsInput) {
      _id
      idBoards
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      value
    }
  }
`;

export const INVITE_MEMBER = gql`
  mutation InviteMember($inviteInput: InviteMemberInput!) {
    inviteMember(input: $inviteInput) {
      _id
    }
  }
`;

export const REMOVE_MEMBER_FROM_BOARD = gql`
  mutation RemoveMemberFromBoard($removeInput: RemoveMemberInput!) {
    removeMemberFromBoard(input: $removeInput)
  }
`;

export const UPDATE_MEMBER_LEVEL_BOARD = gql`
  mutation UpdateMemberLevelBoard($updateInput: UpdateMemberLevelInput!) {
    updateMemberLevelBoard(input: $updateInput)
  }
`;
