import { useFetch } from "./hooks";

export default function App() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>{data && data.slice(0, 5).map((p) => <p key={p.id}>{p.title}</p>)}</>
  );
}
