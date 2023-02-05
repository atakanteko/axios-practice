import { useState, useEffect } from "react";
import { createHttpRequest } from "./service/initializer";
import "./App.css";

function App() {
  const [situations, setSituations] = useState({
    fullfilled: null,
    isPending: false,
    error: false,
  });

  const fetchPosts = async () => {
    setSituations({ ...situations, isPending: true });
    try {
      const resp = await createHttpRequest({
        method: "get",
        endpoint: "/posts",
      });
      setSituations({ ...situations, fullfilled: resp, isPending: false });
    } catch (error) {
      setSituations({ ...situations, isPending: false, error });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (situations.error) {
    return <h1>Error: {situations.error}</h1>;
  }

  if (situations.isPending && !situations.fullfilled) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <ul>
        {situations.fullfilled?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
