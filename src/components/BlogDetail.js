import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function BlogDetail({ blogs, deleteBlog, editBlog }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.slug === slug);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [date, setDate] = useState(blog?.date || "");
  const [author, setAuthor] = useState(blog?.author || "");

  if (!blog) return <h4 className="text-danger">Blog not found!</h4>;

  const handleDelete = () => {
    deleteBlog(slug);
    navigate("/blogs");
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newSlug = editBlog(slug, { title, content, date, author }); 
    setIsEditing(false);

    if (newSlug !== slug) {
      navigate(`/blogs/${newSlug}`, { replace: true });
    }
  };

  return (
    <div className="blog-detail card border-0 shadow-lg">
      {!isEditing ? (
        <>
          <div className="blog-hero p-4 p-md-5">
            <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis mb-3">
              Featured
            </span>
            <h1 className="display-6 mb-2 blog-detail-title">{blog.title}</h1>
            <p className="text-muted mb-0">
              📅 {blog.date} • ✍️ <span className="fw-semibold">{blog.author}</span>
            </p>
          </div>

          <div className="p-4 p-md-5">
            <article className="blog-content lead">
              {blog.content}
            </article>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                ✏ Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                🗑 Delete
              </button>
              <Link to="/blogs" className="btn btn-secondary">
                ⟵ Back
              </Link>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSave} className="p-4 p-md-5">
          <h3 className="text-primary mb-3">✏ Edit Blog</h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              className="form-control"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Author</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">💾 Save</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
