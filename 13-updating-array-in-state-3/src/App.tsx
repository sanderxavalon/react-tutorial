import { useState } from 'react';

// 定義初始藝術家列表
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  // 使用 useState 來管理藝術家列表的狀態
  // artists: 當前藝術家列表
  // setArtists: 更新藝術家列表的函數
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>傑出的雕塑家：</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              // 當點擊刪除按鈕時，使用 filter 方法來過濾藝術家列表
              // filter 會遍歷整個陣列，並只保留符合條件的元素
              // 在這裡，我們保留所有 id 不等於當前點擊的藝術家 id 的元素
              // 這樣就實現了刪除功能
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              刪除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
