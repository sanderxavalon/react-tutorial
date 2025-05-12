import { useState } from 'react';

// Panel 組件：用於創建可展開/收起的面板
// 接收 title（標題）和 children（內容）作為屬性
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  // 使用 useState 來管理面板的展開/收起狀態
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          顯示
        </button>
      )}
    </section>
  );
}

// 主要的 Accordion 組件
export default function Accordion() {
  return (
    <>
      <h2>阿拉木圖，哈薩克斯坦</h2>
      <Panel title="關於">
        阿拉木圖是哈薩克斯坦最大的城市，人口約200萬。從1929年到1997年，它曾是該國的首都。
      </Panel>
      <Panel title="詞源">
        這個名字來自哈薩克語 <span lang="kk-KZ">алма</span>，意思是"蘋果"，通常被翻譯為"充滿蘋果的地方"。
        事實上，阿拉木圖周邊地區被認為是蘋果的發源地，野生的 <i lang="la">Malus sieversii</i> 被認為可能是現代栽培蘋果的祖先。
      </Panel>
    </>
  );
}
