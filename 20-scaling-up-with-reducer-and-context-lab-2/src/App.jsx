import { useState } from 'react'
import './App.css'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import { initialPosts } from './data/mockData'

function App() {
  // 文章相關狀態
  const [posts, setPosts] = useState(initialPosts)
  const [selectedPostId, setSelectedPostId] = useState(null)
  
  // 留言相關狀態
  const [comments, setComments] = useState({})
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [replyToCommentId, setReplyToCommentId] = useState(null)
  
  // 表單狀態
  const [newPostForm, setNewPostForm] = useState({ title: '', content: '', author: '' })
  const [newCommentForm, setNewCommentForm] = useState({ content: '', author: '' })
  const [editCommentForm, setEditCommentForm] = useState({ content: '' })
  
  // UI狀態
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [showNewCommentForm, setShowNewCommentForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  // 文章操作函數
  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0
    }
    setPosts(prev => [newPost, ...prev])
    setNewPostForm({ title: '', content: '', author: '' })
    setShowNewPostForm(false)
  }
  
  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
    if (selectedPostId === postId) {
      setSelectedPostId(null)
    }
  }
  
  const likePost = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }
  
  // 留言操作函數
  const addComment = (postId, comment) => {
    const newComment = {
      ...comment,
      id: Date.now(),
      postId,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    }
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }))
    
    setNewCommentForm({ content: '', author: '' })
    setShowNewCommentForm(false)
    setReplyToCommentId(null)
  }
  
  const editComment = (postId, commentId, newContent) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => 
        comment.id === commentId 
          ? { ...comment, content: newContent, editedAt: new Date().toISOString() }
          : comment
      )
    }))
    setEditingCommentId(null)
    setEditCommentForm({ content: '' })
  }
  
  const deleteComment = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].filter(comment => comment.id !== commentId)
    }))
  }
  
  const likeComment = (postId, commentId) => {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => 
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    }))
  }
  
  const addReply = (postId, parentCommentId, reply) => {
    const newReply = {
      ...reply,
      id: Date.now(),
      postId,
      parentId: parentCommentId,
      createdAt: new Date().toISOString(),
      likes: 0
    }
    
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment => 
        comment.id === parentCommentId 
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    }))
    
    setReplyToCommentId(null)
  }
  
  const selectedPost = posts.find(post => post.id === selectedPostId)
  const postComments = comments[selectedPostId] || []

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 留言板系統</h1>
        <p>練習 useState 重構為 useContext + useReducer</p>
      </header>
      
      <main className="app-main">
        <div className="app-container">
          <PostList 
            posts={posts}
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
            onAddPost={addPost}
            onDeletePost={deletePost}
            onLikePost={likePost}
            newPostForm={newPostForm}
            setNewPostForm={setNewPostForm}
            showNewPostForm={showNewPostForm}
            setShowNewPostForm={setShowNewPostForm}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          
          {selectedPost && (
            <PostDetail 
              post={selectedPost}
              comments={postComments}
              onAddComment={addComment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              onLikeComment={likeComment}
              onAddReply={addReply}
              newCommentForm={newCommentForm}
              setNewCommentForm={setNewCommentForm}
              editCommentForm={editCommentForm}
              setEditCommentForm={setEditCommentForm}
              showNewCommentForm={showNewCommentForm}
              setShowNewCommentForm={setShowNewCommentForm}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              replyToCommentId={replyToCommentId}
              setReplyToCommentId={setReplyToCommentId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <p>💡 提示：這個應用程式使用了大量的 prop drilling，是練習 useContext 和 useReducer 的完美案例！</p>
      </footer>
    </div>
  )
}

export default App
