import './NewCommentForm.css'

function NewCommentForm({ form, setForm, onSubmit, isLoading, errorMessage }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="new-comment-form">
      <h4>💬 新增留言</h4>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="comment-author">作者 *</label>
          <input
            type="text"
            id="comment-author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="請輸入您的名稱..."
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment-content">留言內容 *</label>
          <textarea
            id="comment-content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="請輸入您的留言..."
            rows="4"
            required
            disabled={isLoading}
          />
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? '發布中...' : '發布留言'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm 