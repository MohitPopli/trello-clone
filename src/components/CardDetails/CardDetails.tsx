import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../models/Card";
import { List } from "../../models/List";
import {
  getBoardLists,
  getCardDetails,
  moveCardToList,
} from "../../utils/AppStoreUtility";
import { Spinner } from "../../widgets";
import "./CardDetails.css";

const CardDetails = () => {
  const { boardId, listId, cardId } = useParams();
  const [cardDetails, setCardDetails] = React.useState<Card>();
  const [isLoading, setLoading] = React.useState(false);
  const [lists, setLists] = React.useState<Array<List>>([]);
  const [cardMoveSuccess, setCardMoveSuccess] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    if (boardId && listId && cardId) {
      const cardData = getCardDetails(boardId, listId, cardId);
      if (cardData) {
        setCardDetails(cardData);
      }
      const boardLists = getBoardLists(boardId);
      setLists(boardLists);
      setLoading(false);
    }
  }, [boardId, listId, cardId]);

  const renderCardData = () => {
    if (cardDetails === undefined) {
      return (
        <div>
          <span>Card details you're looking for does not exist.</span>
        </div>
      );
    }
    return (
      <>
        <div className="card-content">
          <h4>{cardDetails.cardTitle}</h4>

          <label>Move card</label>
          {renderAvailableList()}

          {cardMoveSuccess && <span>Card is successfully moved!!!</span>}
        </div>
        <footer className="footer">
          <Link to="../" className="close-card-btn">
            Close
          </Link>
        </footer>
      </>
    );
  };

  const changeCardHandler = (destinationlistId: string) => {
    const result = moveCardToList(boardId!, destinationlistId, listId!, cardId!);
    setCardMoveSuccess(result);
  };

  const renderAvailableList = () => {
    if (lists.length === 0) {
      return (
        <div>
          <span>Currently there are no available lists to move this card</span>
        </div>
      );
    }
    return (
      <>
        <select onChange={(ev) => changeCardHandler(ev.target.value)}>
          <option>Select List</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.listTitle}
            </option>
          ))}
        </select>
      </>
    );
  };
  return (
    <dialog open className="card-details-container">
      {isLoading && <Spinner id="spinner" />}
      {!isLoading && renderCardData()}
    </dialog>
  );
};

export { CardDetails };
