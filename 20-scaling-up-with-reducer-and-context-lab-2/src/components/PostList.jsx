import { useState } from 'react'
import PostItem from './PostItem'
import NewPostForm from './NewPostForm'
import './PostList.css'

function PostList({
  posts,
  selectedPostId,
  onSelectPost,
  onAddPost,
  onDeletePost,
  onLikePost,
  newPostForm,
  setNewPostForm,
  showNewPostForm,
  setShowNewPostForm,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [filterByTag, setFilterByTag] = useState('')

  // 過濾和排序文章
  const filteredAndSortedPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => 
      !filterByTag || post.tags.includes(filterByTag)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes
        case 'views':
          return b.views - a.views
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  // 取得所有標籤
  const allTags = [...new Set(posts.flatMap(post => post.tags))]

  const handleSubmitPost = (e) => {
    e.preventDefault()
    if (!newPostForm.title.trim() || !newPostForm.content.trim() || !newPostForm.author.trim()) {
      setErrorMessage('請填寫所有必填欄位')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    
    // 模擬 API 延遲
    setTimeout(() => {
      onAddPost(newPostForm)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h2>📋 文章列表 ({filteredAndSortedPosts.length})</h2>
        
        <div className="post-list-controls">
          <button 
            className="btn btn-primary"
            onClick={() => setShowNewPostForm(!showNewPostForm)}
          >
            {showNewPostForm ? '取消' : '新增文章'}
          </button>
        </div>
      </div>

      {showNewPostForm && (
        <NewPostForm 
          form={newPostForm}
          setForm={setNewPostForm}
          onSubmit={handleSubmitPost}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}

      <div className="post-list-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜尋文章標題、內容或作者..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="createdAt">按時間排序</option>
            <option value="likes">按讚數排序</option>
            <option value="views">按瀏覽數排序</option>
            <option value="title">按標題排序</option>
            <option value="author">按作者排序</option>
          </select>

          <select 
            value={filterByTag} 
            onChange={(e) => setFilterByTag(e.target.value)}
            className="filter-select"
          >
            <option value="">所有標籤</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="posts-container">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="no-posts">
            <p>沒有找到符合條件的文章</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="btn btn-secondary"
              >
                清除搜尋
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedPosts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              isSelected={selectedPostId === post.id}
              onSelect={() => onSelectPost(post.id)}
              onDelete={() => onDeletePost(post.id)}
              onLike={() => onLikePost(post.id)}
            />
          ))
        )}
      </div>

      {isLoading && (
        <div className="loading">
          <p>處理中...</p>
        </div>
      )}
    </div>
  )
}

export default PostList 