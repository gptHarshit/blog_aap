function validatePost(req, res, next) {
  const { title, content, author } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }



  const allowedTitle = /^[a-zA-Z0-9\s.,!?'"-]+$/;
  if (!allowedTitle.test(title)) {
    return res.status(400).json({ error: 'Title has invalid characters' });
  }

 

  if (!content || content.trim().length < 20) {
    return res
      .status(400)
      .json({ error: 'Content must be at least 20 characters long' });
  }


  
  if (author && !/^[A-Za-z\s]+$/.test(author)) {
    return res
      .status(400)
      .json({ error: 'Author name can only have English letters' });
  }

  next();
}

module.exports = {validatePost};
