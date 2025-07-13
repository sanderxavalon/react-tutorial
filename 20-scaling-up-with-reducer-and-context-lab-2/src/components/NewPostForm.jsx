import './NewPostForm.css'

function NewPostForm({ form, setForm, onSubmit, isLoading, errorMessage }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    setForm(prev => ({
      ...prev,
      tags
    }))
  }

  return (
    <div className="new-post-form">
      <h3>📝 新增文章</h3>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">標題 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="請輸入文章標題..."
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">作者 *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="請輸入作者名稱..."
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">內容 *</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="請輸入文章內容..."
            rows="6"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">標籤</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={form.tags ? form.tags.join(', ') : ''}
            onChange={handleTagsChange}
            placeholder="請輸入標籤，用逗號分隔..."
            disabled={isLoading}
          />
          <small>例如：React, JavaScript, 前端開發</small>
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
            {isLoading ? '發布中...' : '發布文章'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm 