import { gql } from '@apollo/client';

const ALL_LISTS = gql`
  query Query {
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

export default ALL_LISTS;
