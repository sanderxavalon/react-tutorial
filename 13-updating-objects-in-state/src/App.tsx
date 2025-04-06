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
  const [artists, setArtists] = useState<Artist[]>([]);

  return (
    <>
      <h1>傑出的雕塑家：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        // 錯誤示範：直接修改狀態（使用 push）是錯誤的
        // 1. React 的狀態更新必須是不可變的（immutable）
        // 2. 直接修改陣列不會觸發重新渲染
        artists.push({  // ❌ 錯誤：直接修改了 artists 陣列
          id: nextId++, // 雖然 nextId 會遞增，但陣列的修改不會觸發重新渲染
          name: name,   // 即使陣列內容改變了，React 也不會知道需要更新 UI
        });
      }}>加入</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
