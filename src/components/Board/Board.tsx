import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List } from "../../models/List";
import {
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

const Board = () => {
  const { boardId } = useParams();
  const [boardList, setBoardList] = React.useState<Array<List>>([]);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [showNewListContent, setShowNewListContent] = React.useState(false);
  const [editableListId, setEditableListId] = React.useState<
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
  }, [boardId]);

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

  return (
    <div className="board-wrapper">
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
    </div>
  );
};

export { Board };
