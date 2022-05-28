import { Link } from "react-router-dom";
import editIcon from "../../../assets/edit.png";
import "./ListCard.css";

type ListCardProps = {
  id: string;
  title: string;
  listId: string;
};
const ListCard = ({ id, title, listId }: ListCardProps) => {
  return (
    <Link to={`list/${listId}/card/${id}`} className="card-container" key={id}>
      <div className="content">
        <span>{title}</span>
        <img src={editIcon} className="icon-styles" alt="edit" />
      </div>
    </Link>
  );
};

export { ListCard };
