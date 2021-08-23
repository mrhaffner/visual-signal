import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_BOARDS } from '../../graphql/queries/getAllLists';
import { BoardInterface } from '../../types';
import { Link } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton';
import CreateListBoardForm from '../../components/CreateListBoardForm';
import { CREATE_BOARD, DELETE_BOARD } from '../../graphql/mutations/all';

const BoardList = () => {
  const { loading, error, data, refetch } = useQuery(ALL_BOARDS);

  const [newBoardMutation] = useMutation(CREATE_BOARD);
  const [deleteBoardMutation] = useMutation(DELETE_BOARD);

  const [boardList, setBoardList] = useState<BoardInterface[]>([]);

  useEffect(() => {
    if (data) {
      setBoardList(data.allBoards);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const deleteBoard = (id: string) => {
    deleteBoardMutation({
      variables: { deleteBoardInput: id },
    });
    refetch();
  };

  const addBoard = (name: string) => {
    newBoardMutation({
      variables: { createBoardInput: { name } },
    });
    refetch();
  };

  return (
    <>
      <h2>Boards</h2>
      {boardList.map((board) => {
        const url = `/board/${board._id}`;
        return (
          <div key={board._id}>
            <Link to={url}>{board.name}</Link>
            <DeleteButton handleDelete={deleteBoard} id={board._id} />
          </div>
        );
      })}
      <CreateListBoardForm buttonText="Board" submitData={addBoard} />
    </>
  );
};

export default BoardList;
