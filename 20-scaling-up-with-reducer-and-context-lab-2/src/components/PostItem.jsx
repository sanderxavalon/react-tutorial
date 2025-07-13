import './PostItem.css'

function PostItem({ post, isSelected, onSelect, onDelete, onLike }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className={`post-item ${isSelected ? 'selected' : ''}`}>
      <div className="post-header">
        <h3 className="post-title" onClick={onSelect}>
          {post.title}
        </h3>
        <div className="post-meta">
          <span className="post-author">👤 {post.author}</span>
          <span className="post-date">📅 {formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content" onClick={onSelect}>
        <p>{truncateContent(post.content)}</p>
      </div>

      <div className="post-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="post-stats">
        <div className="stat-item">
          <span className="stat-icon">👍</span>
          <span className="stat-value">{post.likes}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👁️</span>
          <span className="stat-value">{post.views}</span>
        </div>
      </div>

      <div className="post-actions">
        <button 
          className="btn btn-primary btn-sm"
          onClick={onSelect}
        >
          {isSelected ? '檢視中' : '檢視詳情'}
        </button>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onLike}
        >
          👍 讚
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm('確定要刪除這篇文章嗎？')) {
              onDelete()
            }
          }}
        >
          🗑️ 刪除
        </button>
      </div>
    </div>
  )
}

export default PostItem 