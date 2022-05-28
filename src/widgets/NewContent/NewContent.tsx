import * as React from "react";
import { Button } from "../Button/Button";
import CloseIcon from "../../assets/cross.png";
import "./NewContent.css";

type NewContentProps = {
  id: string;
  title: string;
  placeholderText: string;
  onAddContent: (content: string) => void;
  onCancel: () => void;
};

const NewContent = ({
  id,
  title,
  placeholderText,
  onAddContent,
  onCancel,
}: NewContentProps) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [errorText, setErrorText] = React.useState("");

  const addButtonHandler = () => {
    const content = textAreaRef.current?.value;
    if (content) {
      onAddContent(content.trim());
      setErrorText("");
    } else {
      setErrorText("Please provide board name");
    }
  };
  return (
    <dialog className="new-content-container" open>
      <h3>{title}</h3>
      {errorText.trim().length > 0 && (
        <span className="error-text">{errorText}</span>
      )}
      <textarea
        id={id}
        placeholder={placeholderText}
        rows={4}
        cols={5}
        ref={textAreaRef}
      />
      <footer className="button-container">
        <Button type="button" onClick={addButtonHandler} className="add-btn">
          Add
        </Button>
        <Button type="button" onClick={onCancel}>
          <img src={CloseIcon} className="close-btn" alt="close-btn"/>
        </Button>
      </footer>
    </dialog>
  );
};

export { NewContent };
