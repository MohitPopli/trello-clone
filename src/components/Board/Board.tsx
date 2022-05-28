import * as React from "react";
import { Outlet, useNavigate, useParams, Link } from "react-router-dom";
import { List } from "../../models/List";
import {
  addNewCardToList,
  addNewListToBoard,
  getBoardLists,
  updateBoardListName,
} from "../../utils/AppStoreUtility";
import { Button, NewContent, Spinner } from "../../widgets";
import AddIcon from "../../assets/add.png";
import "./Board.css";
import { v4 as uuidv4 } from "uuid";
import { getUserName } from "../../utils/LocalstorageUtils";
import { keyboardHandlerForEditableContent } from "../../utils/KeyBoardUtil";
import { ListCard } from "./ListCard/ListCard";
import { Card } from "../../models/Card";

const Board = () => {
  const { boardId } = useParams();
  const [boardList, setBoardList] = React.useState<Array<List>>([]);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [showNewListContent, setShowNewListContent] = React.useState(false);
  const [showNewCardContent, setShowNewCardContent] = React.useState(false);
  const [editableListId, setEditableListId] = React.useState<
    string | undefined
  >();
  const [addNewCardInListId, setAddNewCardInListId] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    if (boardId) {
      setLoading(true);
      const boardData = getBoardLists(boardId);
      if (boardData === undefined) {
        navigate("dashboard");
      } else {
        setBoardList(boardData);
      }
    } else {
      navigate("dashboard");
    }
    setLoading(false);
  }, [boardId, navigate]);

  const addNewListButton = () => (
    <Button
      title="add new board"
      aria-describedby="add new board"
      onClick={() => setShowNewListContent(true)}
      id="add-new-list"
      className="add-new-list-btn"
    >
      <div className="btn-content">
        <img src={AddIcon} className="icon-styles" alt="add icon" />
        <span>Add List</span>
      </div>
    </Button>
  );

  const onBoardListNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const clonedBoardList = [...boardList];
    const editableList = clonedBoardList.find(
      (item) => item.id === editableListId
    );
    if (editableList) {
      editableList.listTitle = ev.target.value;
      setBoardList(clonedBoardList);
    }
  };

  const updateListNameInStore = (listName: string) => {
    updateBoardListName(boardId!, editableListId!, listName);
    setEditableListId(undefined);
  };

  const renderCards = (list: List) => {
    return (
      <>
        {list.cards.map((item) => (
          <ListCard
            id={item.id}
            title={item.cardTitle}
            key={item.id}
            listId={list.id}
          />
        ))}
        <Button
          title="add new card"
          aria-describedby="add new card"
          onClick={(ev) => {
            setShowNewCardContent(true);
            setAddNewCardInListId(list.id);
            ev.stopPropagation()
          }}
          id="add-new-list"
          className="add-new-card-btn"
        >
          <div className="btn-content">
            <img src={AddIcon} className="icon-styles" alt="add icon" />
            <span>Add Card</span>
          </div>
        </Button>
      </>
    );
  };

  const renderBoardList = () => {
    if (boardList.length === 0) {
      return (
        <>
          <h2>
            Seems like there are no list in this board. Please add new list.
          </h2>
          {addNewListButton()}
        </>
      );
    }
    return (
      <div className="board-lists-wrapper">
        {boardList.map((list: List) => {
          return (
            <div className="board-list-item" key={list.id}>
              <div
                className="board-list"
                onClick={() => {
                  setEditableListId(list.id);
                }}
              >
                <input
                  className={
                    editableListId === list.id
                      ? "content-editable-input"
                      : "non-content-editable"
                  }
                  contentEditable={editableListId === list.id}
                  value={list.listTitle}
                  onChange={onBoardListNameChange}
                  onKeyDown={(ev) => {
                    keyboardHandlerForEditableContent(
                      ev,
                      updateListNameInStore
                    );
                  }}
                />
                {renderCards(list)}
              </div>
            </div>
          );
        })}
        {addNewListButton()}
      </div>
    );
  };

  const addNewListHandler = (listName: string) => {
    setShowNewListContent(false);
    const listId = uuidv4();
    const newList: List = {
      id: listId,
      boardId: boardId!,
      cards: [],
      listTitle: listName,
      createdAt: new Date().toUTCString(),
      modifiedAt: new Date().toUTCString(),
      createdBy: getUserName()!,
    };
    addNewListToBoard(boardId!, newList);
    refreshBoard();
  };

  const refreshBoard = () => {
    setLoading(true);
    setBoardList(getBoardLists(boardId!));
    setLoading(false);
  };

  const addNewCardHandler = (cardName: string) => {
    setShowNewCardContent(false);
    const cardId = uuidv4();
    const newCard: Card = {
      id: cardId,
      cardTitle: cardName,
      cardDescription: "",
      comments: [],
      listId: addNewCardInListId!,
      createdBy: getUserName()!,
    };
    addNewCardToList(boardId!, addNewCardInListId!, newCard);
    setAddNewCardInListId(undefined);
    refreshBoard();
  };

  return (
    <div className="board-wrapper">
        <Link to="../" className="back-nav-link">Back to dashboard</Link>
      {isLoading && <Spinner id="spinner" />}
      {!isLoading && renderBoardList()}
      {showNewListContent && (
        <NewContent
          id="new-list"
          title="Add new list"
          placeholderText="Please provide list name"
          onAddContent={addNewListHandler}
          onCancel={() => setShowNewListContent(false)}
        />
      )}
      {showNewCardContent && (
        <NewContent
          id="new-card"
          title="Add new card"
          placeholderText="Please provide card name"
          onAddContent={addNewCardHandler}
          onCancel={() => {
            setShowNewCardContent(false);
            setAddNewCardInListId(undefined);
          }}
        />
      )}
      <Outlet />
    </div>
  );
};

export { Board };
