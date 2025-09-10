import React, { useState } from 'react';

function PostForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim().length < 20) {
      alert('Title is required and content must be at least 20 characters.');
      return;
    }

    // Create dummy post object
    const newPost = {
      _id: Date.now().toString(), // temporary id
      title,
      content,
      author: author || 'Anonymous',
    };

    onCreate && onCreate(newPost);

    // Reset form
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content (min 20 chars)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default PostForm;
