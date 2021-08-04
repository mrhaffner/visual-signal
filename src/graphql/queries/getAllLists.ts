import { gql } from '@apollo/client';

const ALL_LISTS = gql`
  query Query {
    allLists {
      _id
      title
      index
      cards {
        index
        _id
      }
    }
  }
`;

export default ALL_LISTS;
