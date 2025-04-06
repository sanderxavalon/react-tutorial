import { useState } from 'react';

// 定義藝術作品的型別
type Artwork = {
  id: number;
  title: string;
};

// 初始藝術作品列表
const initialList: Artwork[] = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  // 管理藝術作品列表的狀態
  const [list, setList] = useState<Artwork[]>(initialList);

  // 處理反轉列表的點擊事件
  function handleClick() {
    // 創建列表的副本
    const nextList = [...list];
    // 反轉列表順序
    nextList.reverse();
    // 更新狀態
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        反轉順序
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
