import { useState } from 'react';

// 定義藝術品項目的介面
interface Artwork {
  id: number;
  title: string;
  seen: boolean;
}

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
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    if (artwork) {
      artwork.seen = nextSeen;
      setMyList(myNextList);
    }
  }

  // 處理你的清單中藝術品的狀態切換
  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    if (artwork) {
      artwork.seen = nextSeen;
      setYourList(yourNextList);
    }
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
      {artworks.map((artwork: Artwork) => (
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
