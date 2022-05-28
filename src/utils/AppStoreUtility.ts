import { Board } from "../models/Board";
import { ApplicationStore } from "../store/Store";
import { List } from "../models/List";
import { Card } from "../models/Card";

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

export const addNewCardToList = (
  boardId: string,
  listId: string,
  newCard: Card
) => {
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  if (board) {
    const list = board.lists.find((list) => list.id === listId);
    if (list) {
      list.cards.push(newCard);
    }
  }
};

export const getCardDetails = (
  boardId: string,
  listId: string,
  cardId: string
) => {
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  if (board) {
    const list = board.lists.find((list) => list.id === listId);
    if (list) {
      const card = list.cards.find((card) => card.id === cardId);
      return card;
    }
  }
};

export const moveCardToList = (
  boardId: string,
  destinationListId: string,
  currentListId: string,
  cardId: string
) => {
  let isOperationSuccessful = false;
  const board = ApplicationStore.boards.find((board) => board.id === boardId);
  if (board) {
    const destinationListIndex = board.lists.findIndex(
      (list) => list.id === destinationListId
    );
    const currentListIndex = board.lists.findIndex(
      (list) => list.id === currentListId
    );
    if (destinationListIndex > -1 && currentListIndex > -1) {
      const clonedCards = board.lists[currentListIndex].cards.slice();
      const cardIndex = clonedCards.findIndex((card) => card.id === cardId);
      if (cardIndex > -1) {
        board.lists[destinationListIndex].cards.push(clonedCards[cardIndex]);
        board.lists[currentListIndex].cards.splice(cardIndex, 1);
        isOperationSuccessful = true;
      }
    }
  }
  return isOperationSuccessful;
};
