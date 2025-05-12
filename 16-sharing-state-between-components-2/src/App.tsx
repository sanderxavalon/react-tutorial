import { useState } from 'react';

// 主要的 Accordion 組件
// 用於顯示阿拉木圖的相關信息
export default function Accordion() {
  return (
    <>
      <h2>阿拉木圖，哈薩克斯坦</h2>
      <Panel title="關於" isActive={true}>
        阿拉木圖是哈薩克斯坦最大的城市，人口約200萬。從1929年到1997年，它曾是該國的首都。
      </Panel>
      <Panel title="詞源" isActive={true}>
        這個名字來自哈薩克語 <span lang="kk-KZ">алма</span>，意思是"蘋果"，通常被翻譯為"充滿蘋果的地方"。
        事實上，阿拉木圖周邊地區被認為是蘋果的發源地，野生的 <i lang="la">Malus sieversii</i> 被認為可能是現代栽培蘋果的祖先。
      </Panel>
    </>
  );
}

// Panel 組件：用於創建可展開/收起的面板
// 接收三個屬性：
// - title: 面板標題
// - children: 面板內容
// - isActive: 控制面板是否默認展開
function Panel({ title, children, isActive }: { title: string; children: React.ReactNode; isActive: boolean }) {
  // 使用 useState 來管理面板的展開/收起狀態
  // 初始值使用傳入的 isActive 屬性
  const [active, setActive] = useState(isActive);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {active ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setActive(true)}>
          顯示
        </button>
      )}
    </section>
  );
}
