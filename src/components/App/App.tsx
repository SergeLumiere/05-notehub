import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ page }),
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
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
