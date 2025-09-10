import React from 'react';
import { Link } from 'react-router-dom';

function PostList({ posts, onDelete }) {
  if (!posts || posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </h3>
          <p>{post.content.slice(0, 50)}...</p>
          <div className="meta">
            <small>By: {post.author || 'Anonymous'}</small>
            <div className="actions">
              {/* Delete button abhi dummy, baad me real delete function */}
              <button onClick={() => onDelete && onDelete(post._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
