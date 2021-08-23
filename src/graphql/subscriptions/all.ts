import { gql } from '@apollo/client';

const BOARD_SUBSCRIPTION = gql`
  subscription BoardSubscription {
    newBoard {
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

export default BOARD_SUBSCRIPTION;
