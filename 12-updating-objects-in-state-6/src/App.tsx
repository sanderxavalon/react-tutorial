import { useImmer } from 'use-immer';
import { ChangeEvent } from 'react';

// 定義 Artwork 介面
interface Artwork {
  title: string;
  city: string;
  image: string;
}

// 定義 Person 介面
interface Person {
  name: string;
  artwork: Artwork;
}

export default function Form() {
  // 使用 useImmer 來管理複雜的物件狀態
  // useImmer 提供了一個 draft 參數，讓我們可以直接修改狀態
  const [person, updatePerson] = useImmer<Person>({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  // 處理名字變更的函數
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    // 使用 Immer 的 draft 函數直接修改狀態
    // Immer 會在內部處理不可變性更新
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  // 處理作品標題變更的函數
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    // 使用 Immer 的 draft 函數直接修改巢狀物件
    // 不需要手動展開物件，Immer 會自動處理
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  // 處理城市變更的函數
  function handleCityChange(e: ChangeEvent<HTMLInputElement>) {
    // 使用 Immer 的 draft 函數直接修改巢狀物件
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  // 處理圖片變更的函數
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    // 使用 Immer 的 draft 函數直接修改巢狀物件
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
