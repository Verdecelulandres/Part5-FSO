const CreateBlogForm = ({ handleNewBlog, handleBlogChange, blogTitle, blogAuthor, blogUrl }) => {
  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogTitle}
              name="blogTitle"
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogAuthor}
              name="blogAuthor"
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogUrl}
              name="blogUrl"
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default CreateBlogForm