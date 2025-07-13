import { useState } from 'react'
import './CommentItem.css'

function CommentItem({
  comment,
  postId,
  onEdit,
  onDelete,
  onLike,
  onAddReply,
  editCommentForm,
  setEditCommentForm,
  editingCommentId,
  setEditingCommentId,
  replyToCommentId,
  setReplyToCommentId,
  isLoading
}) {
  const [replyForm, setReplyForm] = useState({ content: '', author: '' })
  const [showReplyForm, setShowReplyForm] = useState(false)

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

  const isEditing = editingCommentId === comment.id
  const isReplying = replyToCommentId === comment.id

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, editCommentForm.content)
    } else {
      setEditingCommentId(comment.id)
      setEditCommentForm({ content: comment.content })
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditCommentForm({ content: '' })
  }

  const handleReply = () => {
    if (isReplying) {
      onAddReply(comment.id, replyForm)
      setReplyForm({ content: '', author: '' })
      setShowReplyForm(false)
    } else {
      setReplyToCommentId(comment.id)
      setShowReplyForm(true)
    }
  }

  const handleCancelReply = () => {
    setReplyToCommentId(null)
    setReplyForm({ content: '', author: '' })
    setShowReplyForm(false)
  }

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-meta">
          <span className="comment-author">👤 {comment.author}</span>
          <span className="comment-date">📅 {formatDate(comment.createdAt)}</span>
          {comment.editedAt && (
            <span className="comment-edited">✏️ 已編輯 {formatDate(comment.editedAt)}</span>
          )}
        </div>
        <div className="comment-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onLike(postId, comment.id)}
            disabled={isLoading}
          >
            👍 {comment.likes}
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleReply}
            disabled={isLoading}
          >
            💬 回覆
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleEdit}
            disabled={isLoading}
          >
            ✏️ 編輯
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm('確定要刪除這則留言嗎？')) {
                onDelete(postId, comment.id)
              }
            }}
            disabled={isLoading}
          >
            🗑️ 刪除
          </button>
        </div>
      </div>

      <div className="comment-content">
        {isEditing ? (
          <div className="edit-form">
            <textarea
              value={editCommentForm.content}
              onChange={(e) => setEditCommentForm({ content: e.target.value })}
              placeholder="編輯留言內容..."
              rows="3"
              disabled={isLoading}
            />
            <div className="edit-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleEdit}
                disabled={isLoading}
              >
                儲存
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
      </div>

      {showReplyForm && (
        <div className="reply-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="您的名稱..."
              value={replyForm.author}
              onChange={(e) => setReplyForm(prev => ({ ...prev, author: e.target.value }))}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="回覆內容..."
              value={replyForm.content}
              onChange={(e) => setReplyForm(prev => ({ ...prev, content: e.target.value }))}
              rows="3"
              disabled={isLoading}
            />
          </div>
          <div className="reply-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleReply}
              disabled={isLoading}
            >
              回覆
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleCancelReply}
              disabled={isLoading}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          <h4>回覆 ({comment.replies.length})</h4>
          {comment.replies.map(reply => (
            <div key={reply.id} className="reply-item">
              <div className="reply-header">
                <span className="reply-author">👤 {reply.author}</span>
                <span className="reply-date">📅 {formatDate(reply.createdAt)}</span>
              </div>
              <div className="reply-content">
                <p>{reply.content}</p>
              </div>
              <div className="reply-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onLike(postId, reply.id)}
                  disabled={isLoading}
                >
                  👍 {reply.likes}
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm('確定要刪除這則回覆嗎？')) {
                      // 這裡需要實作刪除回覆的邏輯
                      console.log('刪除回覆:', reply.id)
                    }
                  }}
                  disabled={isLoading}
                >
                  🗑️ 刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentItem 