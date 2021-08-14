import { gql } from '@apollo/client';

export const CREATE_LIST = gql`
  mutation CreateList($createListInput: CreateList!) {
    createList(input: $createListInput) {
      _id
      name
      pos
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation UpdateListPosMutation($updateListPosInput: UpdateListPosInput!) {
    updateListPos(input: $updateListPosInput) {
      _id
      name
      pos
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteListMutation($deleteListId: ID!) {
    deleteList(_id: $deleteListId)
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

export const UPDATE_CARD = gql`
  mutation UpdateCardPosMutation($updateCardPosInput: UpdateCardPosInput!) {
    updateCardPos(input: $updateCardPosInput) {
      _id
      name
      pos
      idList
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCardMutation($deleteCardId: ID!) {
    deleteCard(_id: $deleteCardId)
  }
`;
