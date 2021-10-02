import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation CreateBoard($boardInput: CreateBoardInput!) {
    createBoard(input: $boardInput) {
      name
      _id
      color
    }
  }
`;

export const UPDATE_BOARD_NAME = gql`
  mutation UpdateBoardNameMutation($updateBoardInput: UpdateBoardNameInput!) {
    updateBoardName(input: $updateBoardInput) {
      _id
      name
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoardMutation($boardId: ID!) {
    deleteBoard(_id: $boardId)
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($createListInput: CreateList!) {
    createList(input: $createListInput) {
      _id
      name
      pos
    }
  }
`;

export const UPDATE_LIST_POS = gql`
  mutation UpdateListPosMutation($updateListPosInput: UpdateListPosInput!) {
    updateListPos(input: $updateListPosInput) {
      _id
      name
      pos
    }
  }
`;

export const UPDATE_LIST_NAME = gql`
  mutation UpdateListNameMutation($updateListNameInput: UpdateListNameInput!) {
    updateListName(input: $updateListNameInput) {
      _id
      name
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteListMutation($deleteListInput: DeleteList!) {
    deleteList(input: $deleteListInput)
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCardMutation($createCardInput: CreateCard!) {
    createCard(input: $createCardInput) {
      _id
      name
      pos
      idList
    }
  }
`;

export const UPDATE_CARD_POS = gql`
  mutation UpdateCardPosMutation($updateCardPosInput: UpdateCardPosInput!) {
    updateCardPos(input: $updateCardPosInput) {
      _id
      name
      pos
      idList
    }
  }
`;

export const UPDATE_CARD_NAME = gql`
  mutation UpdateCardNameMutation($updateCardNameInput: UpdateCardNameInput!) {
    updateCardName(input: $updateCardNameInput) {
      _id
      name
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCardMutation($deleteCardInput: DeleteCard!) {
    deleteCard(input: $deleteCardInput)
  }
`;

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
