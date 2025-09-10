import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([
    { _id: '1', title: 'First Post', content: 'This is my first post content.', author: 'Harsh' },
    { _id: '2', title: 'Second Post', content: 'Another post content goes here.', author: 'Gupta' },
  ]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <Router>
      <div className="app">
        <header>
          <div className="container">
            <h1>MERN Blogging App</h1>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route
              path="/"
              element={<PostList posts={posts} onDelete={handleDelete} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
