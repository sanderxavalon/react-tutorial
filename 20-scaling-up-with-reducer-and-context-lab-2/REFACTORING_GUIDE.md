# 🔄 重構指南：從 useState 到 useContext + useReducer

## 📋 重構前分析

### 目前的問題

1. **Prop Drilling 地獄**
   - App.jsx 中的狀態需要傳遞到深層組件
   - 例如：`setNewCommentForm` 需要傳遞到 `NewCommentForm` 組件

2. **複雜的狀態管理**
   - App.jsx 中有 15+ 個 useState
   - 狀態邏輯分散在各個組件中

3. **難以維護**
   - 新增功能需要修改多個組件
   - 狀態變更的影響範圍難以追蹤

## 🎯 重構目標

將目前的狀態管理重構為更清晰、可維護的架構：

```
App.jsx (目前)
├── 15+ useState
├── 複雜的 prop drilling
└── 分散的狀態邏輯

重構後
├── PostProvider (Context + useReducer)
├── CommentProvider (Context + useReducer)
├── UIProvider (Context + useReducer)
└── 簡化的組件邏輯
```

## 🚀 重構步驟

### 步驟 1：創建 Context 和 Reducer

#### 1.1 創建 PostContext

```javascript
// src/contexts/PostContext.jsx
import { createContext, useContext, useReducer } from 'react'

const PostContext = createContext()

const postReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      }
    case 'SET_SELECTED_POST':
      return {
        ...state,
        selectedPostId: action.payload
      }
    default:
      return state
  }
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: initialPosts,
    selectedPostId: null
  })

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostProvider')
  }
  return context
}
```

#### 1.2 創建 CommentContext

```javascript
// src/contexts/CommentContext.jsx
import { createContext, useContext, useReducer } from 'react'

const CommentContext = createContext()

const commentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: [
            ...(state.comments[action.payload.postId] || []),
            action.payload.comment
          ]
        }
      }
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: state.comments[action.payload.postId].map(comment =>
            comment.id === action.payload.commentId
              ? { ...comment, content: action.payload.content, editedAt: new Date().toISOString() }
              : comment
          )
        }
      }
    // ... 其他 action
  }
}

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, {
    comments: {},
    editingCommentId: null,
    replyToCommentId: null
  })

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentContext.Provider>
  )
}

export const useComment = () => {
  const context = useContext(CommentContext)
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider')
  }
  return context
}
```

#### 1.3 創建 UIContext

```javascript
// src/contexts/UIContext.jsx
import { createContext, useContext, useReducer } from 'react'

const UIContext = createContext()

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload }
    case 'SHOW_NEW_POST_FORM':
      return { ...state, showNewPostForm: action.payload }
    case 'SHOW_NEW_COMMENT_FORM':
      return { ...state, showNewCommentForm: action.payload }
    default:
      return state
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, {
    isLoading: false,
    errorMessage: '',
    showNewPostForm: false,
    showNewCommentForm: false
  })

  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
```

### 步驟 2：重構 App.jsx

```javascript
// src/App.jsx (重構後)
import { PostProvider } from './contexts/PostContext'
import { CommentProvider } from './contexts/CommentContext'
import { UIProvider } from './contexts/UIContext'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'

function App() {
  return (
    <UIProvider>
      <PostProvider>
        <CommentProvider>
          <div className="app">
            <header className="app-header">
              <h1>📝 留言板系統</h1>
              <p>練習 useState 重構為 useContext + useReducer</p>
            </header>
            
            <main className="app-main">
              <div className="app-container">
                <PostList />
                <PostDetail />
              </div>
            </main>
            
            <footer className="app-footer">
              <p>💡 提示：這個應用程式使用了大量的 prop drilling，是練習 useContext 和 useReducer 的完美案例！</p>
            </footer>
          </div>
        </CommentProvider>
      </PostProvider>
    </UIProvider>
  )
}

export default App
```

### 步驟 3：重構組件

#### 3.1 重構 PostList

```javascript
// src/components/PostList.jsx (重構後)
import { usePost } from '../contexts/PostContext'
import { useUI } from '../contexts/UIContext'
import PostItem from './PostItem'
import NewPostForm from './NewPostForm'

function PostList() {
  const { state: postState, dispatch: postDispatch } = usePost()
  const { state: uiState, dispatch: uiDispatch } = useUI()
  
  const handleAddPost = (post) => {
    uiDispatch({ type: 'SET_LOADING', payload: true })
    
    setTimeout(() => {
      postDispatch({ type: 'ADD_POST', payload: post })
      uiDispatch({ type: 'SET_LOADING', payload: false })
      uiDispatch({ type: 'SHOW_NEW_POST_FORM', payload: false })
    }, 500)
  }

  return (
    <div className="post-list">
      {/* 組件內容 */}
    </div>
  )
}
```

#### 3.2 重構 PostDetail

```javascript
// src/components/PostDetail.jsx (重構後)
import { usePost } from '../contexts/PostContext'
import { useComment } from '../contexts/CommentContext'
import { useUI } from '../contexts/UIContext'
import CommentList from './CommentList'
import NewCommentForm from './NewCommentForm'

function PostDetail() {
  const { state: postState } = usePost()
  const { state: commentState, dispatch: commentDispatch } = useComment()
  const { state: uiState, dispatch: uiDispatch } = useUI()
  
  const selectedPost = postState.posts.find(post => post.id === postState.selectedPostId)
  const postComments = commentState.comments[postState.selectedPostId] || []

  return (
    <div className="post-detail">
      {/* 組件內容 */}
    </div>
  )
}
```

## 📊 重構前後對比

### 重構前
- ❌ 15+ useState
- ❌ 複雜的 prop drilling
- ❌ 狀態邏輯分散
- ❌ 難以測試
- ❌ 難以維護

### 重構後
- ✅ 3 個 Context + useReducer
- ✅ 無 prop drilling
- ✅ 集中的狀態邏輯
- ✅ 易於測試
- ✅ 易於維護

## 🎓 學習重點

1. **Context API 的使用時機**
   - 當 prop drilling 變得複雜時
   - 當多個組件需要共享狀態時

2. **useReducer 的使用時機**
   - 當狀態邏輯複雜時
   - 當有多個相關的狀態更新時
   - 當需要預測的狀態變更時

3. **最佳實踐**
   - 將相關的狀態放在同一個 Context 中
   - 使用有意義的 action type
   - 保持 reducer 的純粹性

## 🚀 下一步

完成重構後，你可以：

1. 添加更多功能（如用戶認證）
2. 實作持久化存儲
3. 添加單元測試
4. 優化效能（如 React.memo, useMemo）

## 📚 參考資源

- [React Context API 官方文檔](https://react.dev/reference/react/createContext)
- [useReducer Hook 官方文檔](https://react.dev/reference/react/useReducer)
- [State Management Patterns](https://react.dev/learn/managing-state) 