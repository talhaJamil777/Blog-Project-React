import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  
    .replace(/\s+/g, "-");      

function App() {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("blogs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const makeUniqueSlug = (title, excludeSlug = null) => {
    const base = slugify(title || "untitled");
    let unique = base;
    let i = 1;
    const used = new Set(
      blogs
        .filter((b) => b.slug !== excludeSlug) 
        .map((b) => b.slug)
    );
    while (used.has(unique)) {
      unique = `${base}-${i++}`;
    }
    return unique;
  };

  // ADD
  const addBlog = (blog) => {
    const slug = makeUniqueSlug(blog.title);
    setBlogs((prev) => [...prev, { ...blog, slug }]);
  };

  // DELETE
  const deleteBlog = (slug) => {
    setBlogs((prev) => prev.filter((b) => b.slug !== slug));
  };

  // EDIT 
  const editBlog = (originalSlug, updates) => {
    const newSlug = makeUniqueSlug(updates.title, originalSlug);
    setBlogs((prev) =>
      prev.map((b) =>
        b.slug === originalSlug ? { ...b, ...updates, slug: newSlug } : b
      )
    );
    return newSlug;
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand fw-bold brand-logo" to="/">
           My React Blog
        </Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/add">
            Add Blog
          </Link>
          <Link className="btn btn-outline-light" to="/blogs">
            All Blogs
          </Link>
        </div>
      </nav>

      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-5 hero-welcome">
                <h2 className="display-6">Welcome to MyReactBlog</h2>
                <p className="text-muted">
                  Create, edit and showcase your posts —  My mini Project.
                </p>
              </div>
            }
          />
          <Route path="/add" element={<AddBlog addBlog={addBlog} />} />
          <Route
            path="/blogs"
            element={<BlogList blogs={blogs} deleteBlog={deleteBlog} />}
          />
          <Route
            path="/blogs/:slug"
            element={
              <BlogDetail
                blogs={blogs}
                deleteBlog={deleteBlog}
                editBlog={editBlog}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
