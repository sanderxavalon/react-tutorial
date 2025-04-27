import { useState, ChangeEvent } from 'react';

interface Item {
  title: string;
  id: number;
}

const initialItems: Item[] = [
  { title: '椒鹽脆餅', id: 0 },
  { title: '海苔脆片', id: 1 },
  { title: '燕麥棒', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id: number, e: ChangeEvent<HTMLInputElement>) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>您想帶什麼旅行零食？</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>選擇</button>
          </li>
        ))}
      </ul>
      <p>您選擇了 {selectedItem?.title}。</p>
    </>
  );
}
