import * as React from "react";
import { Board } from "../../models/Board";
import { addNewBoard, getBoardsState } from "../../utils/AppStoreUtility";
import { getUserName } from "../../utils/LocalstorageUtils";
import { Button, NewContent, Spinner } from "../../widgets";
import "./Dashboard.css";
import AddIcon from "../../assets/add.png";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [boards, setBoards] = React.useState<Array<Board>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState("");
  const [showNewBoardContent, setShowNewBoardContent] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const userName = getUserName();
    setLoggedInUser(userName!);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    setBoards(getBoardsState());
    setIsLoading(false);
  }, []);

  const addNewBoardButton = () => (
    <Button
      title="add new board"
      aria-describedby="add new board"
      onClick={() => setShowNewBoardContent(true)}
    >
      <div className="btn-content">
        <img src={AddIcon} className="icon-styles" alt="add icon" />
        <span>Add board</span>
      </div>
    </Button>
  );

  const renderBoardSelectList = () => {
    return (
      <div className="board-list-wrapper">
        <label htmlFor="board-select">Select Board</label>
        <select
          id="board-select"
          className="list-wrapper"
          data-testid="board-select"
          onChange={(ev) => {
            navigateToBoard(ev.target.value);
          }}
        >
          <option>Select Board</option>
          {boards.map((board: Board) => {
            return (
              <option key={board.id} value={board.id}>
                {board.boardName}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const renderDashboardContent = () => {
    if (boards.length === 0) {
      return (
        <div className="dashboard-empty-content">
          <h2>It seems like you have not created any boards yet.</h2>
          <h3>Please create a board to start using Trello.</h3>
          {addNewBoardButton()}
        </div>
      );
    }
    return (
      <div>
        {addNewBoardButton()}
        {renderBoardSelectList()}
      </div>
    );
  };

  const navigateToBoard = (boardId: string) => {
    navigate(`/dashboard/${boardId}`);
  };

  const addNewBoardHandler = (boardName: string) => {
    setShowNewBoardContent(false);
    const boardId = uuidv4();
    const newBoard: Board = {
      id: boardId,
      boardName,
      lists: [],
    };
    addNewBoard(newBoard);
    navigateToBoard(boardId);
  };
  return (
    <div className="dashboard-container">
      <h1>Welcome {loggedInUser}</h1>
      {isLoading && <Spinner id="spinner" />}
      {!isLoading && renderDashboardContent()}
      {showNewBoardContent && (
        <NewContent
          id="new-board"
          title="Add board"
          placeholderText="Please provide board name"
          onAddContent={addNewBoardHandler}
          onCancel={() => setShowNewBoardContent(false)}
        />
      )}
    </div>
  );
};

export { Dashboard };
