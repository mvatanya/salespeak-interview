import "./styles.css";

interface Book {
  title: string;
  description: string;
  author: string[];
}

export default function Book(props: Book): JSX.Element {
  return (
    <div className="book-container">
      <div style={{ marginBottom: 20 }}>{props.title}</div>
      <div className="description-card">{props.description}</div>
      {props.author?.map((author, ind) => {
        return <div key={ind}>{author}</div>;
      })}
    </div>
  );
}
