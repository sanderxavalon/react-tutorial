import { useState } from 'react';
import { useImmer } from 'use-immer';

// 定義藝術品介面
interface Artwork {
  id: number;
  title: string;
  seen: boolean;
}

let nextId = 3;
// 初始藝術品清單
const initialList: Artwork[] = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  // 使用 useImmer 管理我的清單狀態
  const [myList, updateMyList] = useImmer<Artwork[]>(
    initialList
  );
  // 使用 useImmer 管理你的清單狀態
  const [yourList, updateYourList] = useImmer<Artwork[]>(
    initialList
  );

  // 切換我的清單中藝術品的已看狀態
  function handleToggleMyList(id: number, nextSeen: boolean) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      if (artwork) {
        artwork.seen = nextSeen;
      }
    });
  }

  // 切換你的清單中藝術品的已看狀態
  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      if (artwork) {
        artwork.seen = nextSeen;
      }
    });
  }

  return (
    <>
      <h1>藝術品願望清單</h1>
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

// 藝術品清單元件
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
