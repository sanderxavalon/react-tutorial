import { useState, ChangeEvent } from 'react';

// 定義 Person 介面
interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Form() {
  // 使用 Person 介面作為 state 型別
  const [person, setPerson] = useState<Person>({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  // 處理名字變更的函數
  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 覆蓋 firstName 屬性為新的值
      firstName: e.target.value
    });
  }

  // 處理姓氏變更的函數
  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 覆蓋 lastName 屬性為新的值
      lastName: e.target.value
    });
  }

  // 處理電子郵件變更的函數
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      // 使用展開運算符複製 person 物件的所有屬性
      ...person,
      // 覆蓋 email 屬性為新的值
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
