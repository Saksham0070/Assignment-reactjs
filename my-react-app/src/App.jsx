import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import "./App.css";
import { Card } from "./Card";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceValue = useDebounce(query, 500);

  function handleChange(event) {
    // console.log(event.target.value)
    setQuery(event.target.value);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${debounceValue}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const result = await response.json();

        console.log(result);

        setData(result.products);
      } catch (err) {

        if(err.name === "AbortError"){
          return;
        }

        setError(err.message || "Something Went Wrong!!");
      } finally {
        setLoading(false);
      }
    }
    if (debounceValue) {
      console.log(debounceValue);
      setError("");
      setData([]);
      setLoading(true);
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [debounceValue]);

  return (
    <>
      Search Query:
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={query}
      />
      {error.length > 0 ? (
        <p>Something Went Wrong!!</p>
      ) : loading ? (
        <p>Loading....</p>
      ) : query.length === 0 ? (
        <p>idle (no query yet)</p>
      ) : data.length > 0 ? (
        <Card data={data} />
      ) : (
        <p>Empty (Not Found) </p>
      )}
      {/*       
      {data.map((val)=>{
        return <div>{val.id}</div>
      })} */}
    </>
  );
}

export default App;
