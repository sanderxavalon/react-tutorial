import CommentList from './CommentList'
import NewCommentForm from './NewCommentForm'
import './PostDetail.css'

function PostDetail({
  post,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onAddReply,
  newCommentForm,
  setNewCommentForm,
  editCommentForm,
  setEditCommentForm,
  showNewCommentForm,
  setShowNewCommentForm,
  editingCommentId,
  setEditingCommentId,
  replyToCommentId,
  setReplyToCommentId,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newCommentForm.content.trim() || !newCommentForm.author.trim()) {
      setErrorMessage('請填寫留言內容和作者名稱')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    
    // 模擬 API 延遲
    setTimeout(() => {
      onAddComment(post.id, newCommentForm)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h2>{post.title}</h2>
        <div className="post-detail-meta">
          <span className="post-author">👤 {post.author}</span>
          <span className="post-date">📅 {formatDate(post.createdAt)}</span>
          <span className="post-likes">👍 {post.likes}</span>
          <span className="post-views">👁️ {post.views}</span>
        </div>
      </div>

      <div className="post-detail-content">
        <p>{post.content}</p>
      </div>

      <div className="post-detail-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="comments-section">
        <div className="comments-header">
          <h3>💬 留言 ({comments.length})</h3>
          <button 
            className="btn btn-primary"
            onClick={() => setShowNewCommentForm(!showNewCommentForm)}
          >
            {showNewCommentForm ? '取消' : '新增留言'}
          </button>
        </div>

        {showNewCommentForm && (
          <NewCommentForm 
            form={newCommentForm}
            setForm={setNewCommentForm}
            onSubmit={handleSubmitComment}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <CommentList 
          comments={comments}
          postId={post.id}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          onLikeComment={onLikeComment}
          onAddReply={onAddReply}
          editCommentForm={editCommentForm}
          setEditCommentForm={setEditCommentForm}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          replyToCommentId={replyToCommentId}
          setReplyToCommentId={setReplyToCommentId}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
        />

        {isLoading && (
          <div className="loading">
            <p>處理中...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail 