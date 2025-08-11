import { useRef, useState } from "react";

export default function ScrollList() {
  // 用來存放多個元素的 DOM 節點對應表（Map）
  const itemsRef = useRef(null);

  // 初始化項目清單（這裡用假資料產生 10 張圖片 URL）
  const [itemList, setItemList] = useState(setupItemList);

  // 捲動到指定項目
  function scrollToItem(item) {
    const map = getMap();
    const node = map.get(item); // 從 Map 中取得該項目的 DOM 節點
    node.scrollIntoView({
      behavior: "smooth", // 平滑捲動
      block: "nearest", // 垂直方向用最近的對齊方式
      inline: "center", // 水平方向捲到中間
    });
  }

  // 取得 Map（第一次呼叫時初始化）
  function getMap() {
    if (!itemsRef.current) {
      // 第一次使用時建立一個新的 Map
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      {/* 導覽按鈕，點擊可捲動到對應項目 */}
      <nav>
        <button onClick={() => scrollToItem(itemList[0])}>項目一</button>
        <button onClick={() => scrollToItem(itemList[5])}>項目六</button>
        <button onClick={() => scrollToItem(itemList[9])}>項目十</button>
      </nav>

      {/* 滾動視窗容器 */}
      <div>
        <ul>
          {itemList.map((item) => (
            <li
              key={item}
              ref={(node) => {
                const map = getMap();
                map.set(item, node); // 元素掛載時，記錄對應 DOM 節點

                // ⚠️ React 19 的寫法
                return () => {
                  map.delete(item); // 元素卸載時移除對應
                };
              }}
            >
              <img src={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// 假資料產生器：回傳 10 個不同圖片的 URL
function setupItemList() {
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push(`https://picsum.photos/id/${220 + i}/800/600`);
  }
  return list;
}
