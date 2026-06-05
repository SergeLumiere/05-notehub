import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading notes</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* SearchBox */}
        {/* Pagination */}
        <button className={css.button}>Create note +</button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
