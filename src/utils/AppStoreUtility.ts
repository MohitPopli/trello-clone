import { Board } from "../models/Board";
import { ApplicationStore } from "../store/Store";
import { List } from "../models/List";

export const getBoardsState = (): Array<Board> => ApplicationStore.boards;

export const addNewBoard = (newBoard: Board) => {
  ApplicationStore.boards.push(newBoard);
};

export const getBoardLists = (boardId: string): Array<List> => {
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  return board ? board.lists : [];
};

export const addNewListToBoard = (boardId: string, newList: List) => {
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  if (board) {
    board.lists.push(newList);
  }
};

export const updateBoardListName = (
  boardId: string,
  listId: string,
  updatedListName: string
) => {
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  if (board) {
    const list = board.lists.find((list) => list.id === listId);
    if (list) {
      list.listTitle = updatedListName;
    }
  }
};
