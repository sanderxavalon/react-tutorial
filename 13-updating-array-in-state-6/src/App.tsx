import { useState } from 'react';

// 定義藝術家的型別
type Artist = {
  id: number;
  name: string;
};

// 用於生成新藝術家的 ID
let nextId = 3;

// 初始藝術家資料
const initialArtists: Artist[] = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  // 管理輸入框的狀態
  const [name, setName] = useState('');
  // 管理藝術家列表的狀態
  const [artists, setArtists] = useState<Artist[]>(
    initialArtists
  );

  // 處理插入新藝術家的點擊事件
  function handleClick() {
    const insertAt = 1; // 永遠在第二個位置插入

    const nextArtists = [
      // 插入點之前的項目
      ...artists.slice(0, insertAt),
      // 新增的藝術家
      { id: nextId++, name: name },
      // 插入點之後的項目
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName(''); // 清空輸入框
  }

  return (
    <>
      <h1>傑出的雕塑家：</h1>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        插入
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
