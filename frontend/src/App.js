import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <Router>
      <header className="navbar" >
        <Link to="/">Blog</Link>
        <Link to="/create">Create Blog</Link>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/posts/:author" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
