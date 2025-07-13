export const initialPosts = [
  {
    id: 1,
    title: "React Hooks 學習心得分享",
    content: "最近開始學習 React Hooks，發現 useState 和 useEffect 真的很好用！但是當應用程式變大時，prop drilling 的問題就出現了。想問問大家是如何處理複雜狀態管理的？",
    author: "小明",
    createdAt: "2024-01-15T10:30:00.000Z",
    likes: 25,
    views: 156,
    tags: ["React", "Hooks", "前端開發"]
  },
  {
    id: 2,
    title: "TypeScript 在專案中的實踐經驗",
    content: "我們團隊最近將 JavaScript 專案遷移到 TypeScript，雖然初期學習成本較高，但長期來看真的值得！型別安全讓我們的程式碼更加可靠，重構時也更加安心。",
    author: "小華",
    createdAt: "2024-01-14T14:20:00.000Z",
    likes: 18,
    views: 89,
    tags: ["TypeScript", "程式設計", "團隊協作"]
  },
  {
    id: 3,
    title: "前端效能優化技巧總結",
    content: "整理了幾個前端效能優化的實用技巧：1. 使用 React.memo 避免不必要的重渲染 2. 實作虛擬滾動處理大量資料 3. 圖片懶加載 4. 程式碼分割。大家還有其他建議嗎？",
    author: "小美",
    createdAt: "2024-01-13T09:15:00.000Z",
    likes: 32,
    views: 203,
    tags: ["效能優化", "React", "前端工程"]
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox 使用場景分析",
    content: "CSS Grid 和 Flexbox 各有優勢，Grid 適合二維佈局，Flexbox 適合一維佈局。在實際專案中，我通常會結合使用兩者。想聽聽大家的實戰經驗！",
    author: "小強",
    createdAt: "2024-01-12T16:45:00.000Z",
    likes: 15,
    views: 67,
    tags: ["CSS", "前端設計", "響應式設計"]
  },
  {
    id: 5,
    title: "Git 工作流程最佳實踐",
    content: "分享我們團隊的 Git 工作流程：使用 feature branch、commit message 規範、code review 流程等。這樣的工作流程讓我們的開發更加有序和高效。",
    author: "小芳",
    createdAt: "2024-01-11T11:30:00.000Z",
    likes: 28,
    views: 134,
    tags: ["Git", "版本控制", "團隊協作"]
  }
]

export const initialComments = {
  1: [
    {
      id: 101,
      postId: 1,
      content: "我也遇到同樣的問題！建議可以考慮使用 Context API 或 Redux 來管理全域狀態。",
      author: "程式設計師小王",
      createdAt: "2024-01-15T11:00:00.000Z",
      likes: 8,
      replies: [
        {
          id: 1001,
          postId: 1,
          parentId: 101,
          content: "Context API 確實是個好選擇，特別是對於中小型應用程式。",
          author: "前端工程師小李",
          createdAt: "2024-01-15T11:30:00.000Z",
          likes: 3
        }
      ]
    },
    {
      id: 102,
      postId: 1,
      content: "useReducer 配合 Context 使用效果很好，可以處理複雜的狀態邏輯。",
      author: "React 愛好者",
      createdAt: "2024-01-15T12:15:00.000Z",
      likes: 12,
      replies: []
    }
  ],
  2: [
    {
      id: 201,
      postId: 2,
      content: "TypeScript 的型別推斷真的很強大，寫程式時有種被保護的感覺！",
      author: "TS 新手",
      createdAt: "2024-01-14T15:00:00.000Z",
      likes: 6,
      replies: []
    },
    {
      id: 202,
      postId: 2,
      content: "我們團隊也在考慮遷移，請問遷移過程中遇到最大的挑戰是什麼？",
      author: "好奇寶寶",
      createdAt: "2024-01-14T16:20:00.000Z",
      likes: 4,
      replies: [
        {
          id: 2001,
          postId: 2,
          parentId: 202,
          content: "最大的挑戰是現有程式碼的型別定義，建議逐步遷移，不要一次全部改完。",
          author: "小華",
          createdAt: "2024-01-14T17:00:00.000Z",
          likes: 7
        }
      ]
    }
  ],
  3: [
    {
      id: 301,
      postId: 3,
      content: "虛擬滾動真的很重要，我們專案中有個列表有上萬筆資料，沒有虛擬滾動根本無法使用。",
      author: "效能優化專家",
      createdAt: "2024-01-13T10:00:00.000Z",
      likes: 15,
      replies: []
    },
    {
      id: 302,
      postId: 3,
      content: "圖片懶加載也很實用，特別是電商網站，可以大幅提升載入速度。",
      author: "電商開發者",
      createdAt: "2024-01-13T11:30:00.000Z",
      likes: 9,
      replies: []
    }
  ]
} 