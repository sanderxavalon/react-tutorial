import { useState } from 'react';

// 使用 let 宣告的變數在模組作用域中，不會因為元件重新渲染而重置
// 每次元件重新渲染時，nextId 會保持其最後的值
let nextId = 0;

// 定義藝術家的型別
interface Artist {
  id: number;
  name: string;
}

export default function List() {
  // 使用 useState 來管理輸入框的值
  const [name, setName] = useState('');
  // 使用 useState 來管理藝術家列表，並指定正確的型別
  const [artists, setArtists] = useState<Artist[]>([]);

  return (
    <>
      <h1>傑出的雕塑家：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        // 正確做法：創建新的陣列來更新狀態
        // 使用展開運算符(...)來創建新的陣列，避免直接修改狀態
        setArtists([
          // 使用展開運算符(...)複製現有的 artists 陣列
          // 這樣可以保留所有現有的藝術家資料
          ...artists,
          // 在陣列末尾添加新的藝術家物件
          // nextId++ 會先使用當前的 nextId 值，然後再遞增
          // 這樣可以確保每個藝術家都有唯一的 ID
          { id: nextId++, name: name }
        ]);
      }}>加入</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
