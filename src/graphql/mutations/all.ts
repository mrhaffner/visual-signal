import { gql } from '@apollo/client';

export const CREATE_LIST = gql`
  mutation Mutation($createListInput: ListCreateInput) {
    createList(input: $createListInput) {
      _id
      title
      index
      cards {
        _id
      }
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation UpdateListMutation(
    $updateListId: ID!
    $updateListInput: ListUpdateInput
  ) {
    updateList(_id: $updateListId, input: $updateListInput) {
      _id
      title
      index
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteListMutation($deleteListId: ID!) {
    deleteList(_id: $deleteListId)
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCardMutation($createCardInput: CardCreateInput) {
    createCard(input: $createCardInput) {
      _id
      content
      listId
      index
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCardMutation(
    $updateCardId: ID!
    $updateCardInput: CardUpdateInput
  ) {
    updateCard(_id: $updateCardId, input: $updateCardInput) {
      _id
      content
      listId
      index
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCardMutation($deleteCardId: ID!) {
    deleteCard(_id: $deleteCardId)
  }
`;
