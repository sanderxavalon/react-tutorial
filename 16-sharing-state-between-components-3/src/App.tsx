import { useState } from "react";

// 主要的 Accordion 組件
// 使用 activeIndex 來追踪當前展開的面板
export default function Accordion() {
  // 使用 useState 來管理當前活動面板的索引
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>阿拉木圖，哈薩克斯坦</h2>
      <Panel
        title="關於"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        阿拉木圖是哈薩克斯坦最大的城市，人口約200萬。從1929年到1997年，它曾是該國的首都。
      </Panel>
      <Panel
        title="詞源"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        這個名字來自哈薩克語 <span lang="kk-KZ">алма</span>，意思是"蘋果"，通常被翻譯為"充滿蘋果的地方"。
        事實上，阿拉木圖周邊地區被認為是蘋果的發源地，野生的 <i lang="la">Malus sieversii</i> 被認為可能是現代栽培蘋果的祖先。
      </Panel>
    </>
  );
}

// Panel 組件：用於創建可展開/收起的面板
// 接收四個屬性：
// - title: 面板標題
// - children: 面板內容
// - isActive: 控制面板是否展開
// - onShow: 點擊顯示按鈕時的回調函數
function Panel({ title, children, isActive, onShow }: { 
  title: string; 
  children: React.ReactNode; 
  isActive: boolean;
  onShow: () => void;
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>顯示</button>}
    </section>
  );
}
