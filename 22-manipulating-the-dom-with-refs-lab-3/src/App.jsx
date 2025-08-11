import { useState } from "react";

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <nav>
        <button
          onClick={() => {
            if (index < itemList.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
          }}
        >
          Next
        </button>
      </nav>
      <div>
        <ul>
          {itemList.map((item, i) => (
            <li key={item.id}>
              <img
                className={index === i ? "active" : ""}
                src={item.imageUrl}
                alt={"Image #" + item.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const itemList = [];
for (let i = 0; i < 10; i++) {
  itemList.push({
    id: i,
    imageUrl: `https://picsum.photos/id/${300 + i}/100/100`,
  });
}
