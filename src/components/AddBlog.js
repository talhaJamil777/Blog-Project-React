import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlog({ addBlog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog({ title, content, date, author });
    navigate("/blogs");
  };

  return (
    <div className="card shadow-lg p-4">
      <h3 className="mb-3 text-primary fw-bold">✍️ Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="fw-bold">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter blog title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Content</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Write your content…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="fw-bold">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Author name…"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
    