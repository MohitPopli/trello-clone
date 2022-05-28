import "./Spinner.css";

type SpinnerProps = {
  id: string;
};
const Spinner = ({ id }: SpinnerProps) => (
  <div className="spinner-container" data-testid={`${id}-container`}>
    <div className="spinner" />
  </div>
);

export { Spinner };
