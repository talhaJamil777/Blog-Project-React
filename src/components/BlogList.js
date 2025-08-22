import React from "react";
import { Link } from "react-router-dom";

function BlogList({ blogs, deleteBlog }) {
  return (
    <div>
      <h3 className="mb-4 text-center fw-bold text-success">📚 All Blogs</h3>

      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs added yet!</p>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog.slug} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100 blog-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title blog-title mb-1">{blog.title}</h5>

                  <p className="small text-secondary mb-2">
                    {blog.date} • <span className="fw-semibold">{blog.author}</span>
                  </p>

                  <p className="card-text flex-grow-1 blog-excerpt">
                    {blog.content.length > 120
                      ? blog.content.substring(0, 120) + "..."
                      : blog.content}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Read More ➝
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteBlog(blog.slug)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
