import { useEffect, useState } from "react";

import Book from "./Book";

import "./styles.css";

const URL =
  "https://www.googleapis.com/books/v1/volumes?q=artificial%20intelligence&maxResults=10";

interface Book {
  title: string;
  description: string;
  authors: string[];
}

export default function App(): JSX.Element {
  const [allBooks, setAllBooks] = useState<Book[]>([
    { authors: [], description: "", title: "" },
  ]);
  const [displayBooks, setDisplayBooks] = useState<Book[]>([
    { authors: [], description: "", title: "" },
  ]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        const selectedBookItems: {
          title: string;
          description: string;
          authors: string[];
        }[] = [];
        data.items.forEach((item: any) => {
          selectedBookItems.push({
            title: item.volumeInfo.title,
            description: item.volumeInfo.description,
            authors: item.volumeInfo.authors,
          });
        });
        setDisplayBooks(selectedBookItems);
        setAllBooks(selectedBookItems);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!searchInput.length) {
      setDisplayBooks(allBooks); // in case if the search box is empty and user click search, this will show all books
    } else {
      const searchBook = allBooks.filter((book) =>
        book.title.includes(searchInput)
      );
      setDisplayBooks(searchBook);
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <form style={{ margin: 50 }}>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Book Title"
        />
        <button onClick={handleSubmit} style={{ marginLeft: 10 }}>
          Search
        </button>
      </form>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {displayBooks?.map(
          (
            book: { title: string; description: string; authors: string[] },
            ind: number
          ) => {
            return (
              <Book
                key={ind}
                author={book.authors}
                description={book.description}
                title={book.title}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
