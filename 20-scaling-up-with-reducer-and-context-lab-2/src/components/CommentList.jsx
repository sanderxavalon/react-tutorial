import CommentItem from './CommentItem'
import './CommentList.css'

function CommentList({
  comments,
  postId,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onAddReply,
  editCommentForm,
  setEditCommentForm,
  editingCommentId,
  setEditingCommentId,
  replyToCommentId,
  setReplyToCommentId,
  isLoading,
  setIsLoading,
  setErrorMessage
}) {
  const handleEditComment = (commentId, newContent) => {
    if (!newContent.trim()) {
      setErrorMessage('留言內容不能為空')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    
    // 模擬 API 延遲
    setTimeout(() => {
      onEditComment(postId, commentId, newContent)
      setIsLoading(false)
    }, 300)
  }

  const handleAddReply = (parentCommentId, reply) => {
    if (!reply.content.trim() || !reply.author.trim()) {
      setErrorMessage('請填寫回覆內容和作者名稱')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    
    // 模擬 API 延遲
    setTimeout(() => {
      onAddReply(postId, parentCommentId, reply)
      setIsLoading(false)
    }, 300)
  }

  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>還沒有留言，來發表第一個留言吧！</p>
      </div>
    )
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onEdit={handleEditComment}
          onDelete={onDeleteComment}
          onLike={onLikeComment}
          onAddReply={handleAddReply}
          editCommentForm={editCommentForm}
          setEditCommentForm={setEditCommentForm}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          replyToCommentId={replyToCommentId}
          setReplyToCommentId={setReplyToCommentId}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}

export default CommentList 