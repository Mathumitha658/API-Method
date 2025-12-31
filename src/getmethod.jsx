import React, { useEffect, useState } from "react";
import axios from "axios";

function Data() {
  const [data, setData] = useState([]);
  const [content, setContent] = useState({
    title: "",
    body: "",
  });
  const [editId, setEditId] = useState(null);

  //  GET Method
  const fetchData = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    console.log("Response Data:", res.data);

    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  POST Method
  const handleAdd = async () => {
    if (!content.title || !content.body) {
      alert("Please fill both fields");
      return;
    }

    const add = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: content.title,
      body: content.body,
    });
    console.log("post Response", add.data);

    setData([add.data, ...data]);
    setContent({ title: "", body: "" });
  };

  //  DELETE Method
  const handleDelete = async (id) => {
    const del = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    console.log("Deleted", del.data);
    setData(data.filter((item) => item.id !== id));
  };

  //patch
  const handleUpdate = async () => {
    const res = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${editId}`,
      {
        title: content.title,
        body: content.body,
      }
    );
    setData(
      data.map((item) => (item.id === editId ? { ...item, ...res.data } : item))
    );


    //reset
    setEditId(null);
    setContent({ title: "", body: "" });
  };

  console.log(content);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Axios CRUD Example</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Body"
          value={content.body}
          onChange={(e) => setContent({ ...content, body: e.target.value })}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        {editId ? (
          <button
            onClick={handleUpdate}
            style={{ padding: "10px", background: "blue", color: "white" }}
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            style={{ padding: "10px", background: "green", color: "white" }}
          >
            Add
          </button>
        )}
      </div>

      {/* Display Data */}
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "12px",
          }}
        >
          <h3>{item.id}</h3>
          <h3>{item.title}</h3>
          <p>{item.body}</p>

          <button
            onClick={() => {
              setEditId(item.id);
              setContent({
                title: item.title,
                body: item.body,
              });
            }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(item.id)}
            style={{
              marginTop: "10px",
              padding: "4px 12px",
              background: "red",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Data;
