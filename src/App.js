import { useState, useEffect } from "react";
import { createHttpRequest } from "./service/initializer";
import "./App.css";

function App() {
  const [situations, setSituations] = useState({
    fullfilled: null,
    isPending: false,
    error: false,
  });

  const postRequestData = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  const fetchPosts = async () => {
    setSituations({ ...situations, isPending: true });
    try {
      const resp = await createHttpRequest({
        endpoint: "posts",
        config: {
          method: "POST",
          data: postRequestData,
        },
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
  console.log(situations);
  return (
    <div className="App">
      <ul>
        <li>{situations.fullfilled?.title}</li>
        {/* {situations.fullfilled?.map((item) => (
          <li>{item.title}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
