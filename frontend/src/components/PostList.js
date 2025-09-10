import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

const API_BASE = process.env.REACT_APP_API_URL || "";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClick = (id) => setSelectedId(id);

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/posts/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      setPosts((prev) => prev.filter((p) => p._id !== selectedId));
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setSelectedId(null);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="post-list">
      {posts.map((p) => (
        <div key={p._id} className="post-card">
          <h3>
            <Link
              to={`/posts/${p.author.toLowerCase().replace(/\s+/g, "-")}`}
              state={{ postId: p._id }}
            >
              {p.title}
            </Link>
          </h3>
          <p>
            {p.content.slice(0, 120)}
            {p.content.length > 120 ? "..." : ""}
          </p>
          <div className="meta">
            <small>By: {p.author || "Anonymous"}</small>
            <div className="actions">
              <button onClick={() => handleDeleteClick(p._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}

      <ConfirmDialog
        show={!!selectedId}
        onConfirm={confirmDelete}
        onCancel={() => setSelectedId(null)}
      />
    </div>
  );
}

export default PostList;
