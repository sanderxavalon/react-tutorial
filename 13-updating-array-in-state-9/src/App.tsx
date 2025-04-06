import { useState } from 'react';

// 定義藝術品項目的介面
interface Artwork {
  id: number;
  title: string;
  seen: boolean;
}

let nextId = 3;
const initialList: Artwork[] = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState<Artwork[]>(initialList);
  const [yourList, setYourList] = useState<Artwork[]>(initialList);

  // 處理我的清單中藝術品的狀態切換
  function handleToggleMyList(artworkId: number, nextSeen: boolean) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // 創建一個新的物件，包含更新後的狀態
        return { ...artwork, seen: nextSeen };
      } else {
        // 保持原樣
        return artwork;
      }
    }));
  }

  // 處理你的清單中藝術品的狀態切換
  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // 創建一個新的物件，包含更新後的狀態
        return { ...artwork, seen: nextSeen };
      } else {
        // 保持原樣
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>藝術品清單</h1>
      <h2>我想看的藝術品：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的藝術品：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

// 定義 ItemList 元件的屬性介面
interface ItemListProps {
  artworks: Artwork[];
  onToggle: (id: number, seen: boolean) => void;
}

function ItemList({ artworks, onToggle }: ItemListProps) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
