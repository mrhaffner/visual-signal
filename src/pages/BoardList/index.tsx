import { useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOARDS } from '../../graphql/queries/getAllLists';
import { BoardInterface } from '../../types';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const { loading, error, data } = useQuery(ALL_BOARDS);

  const [boardList, setBoardList] = useState<BoardInterface[]>([]);

  useEffect(() => {
    if (data) {
      setBoardList(data.allBoards);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <h2>Boards</h2>
      {boardList.map((board) => {
        const url = `/board/${board._id}`;
        return <Link to={url}>{board.name}</Link>;
      })}
    </>
  );
};

export default BoardList;
