import { useState, ChangeEvent } from 'react';

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
  // 使用 Person 介面作為 state 型別
  const [person, setPerson] = useState<Person>({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  // 處理名字變更的函數
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 覆蓋 name 屬性為新的值
      name: e.target.value
    });
  }

  // 處理作品標題變更的函數
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 更新 artwork 物件
      artwork: {
        // 使用展開運算符複製 artwork 物件的所有屬性
        ...person.artwork,
        // 覆蓋 title 屬性為新的值
        title: e.target.value
      }
    });
  }

  // 處理城市變更的函數
  function handleCityChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 更新 artwork 物件
      artwork: {
        // 使用展開運算符複製 artwork 物件的所有屬性
        ...person.artwork,
        // 覆蓋 city 屬性為新的值
        city: e.target.value
      }
    });
  }

  // 處理圖片變更的函數
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 更新 artwork 物件
      artwork: {
        // 使用展開運算符複製 artwork 物件的所有屬性
        ...person.artwork,
        // 覆蓋 image 屬性為新的值
        image: e.target.value
      }
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
