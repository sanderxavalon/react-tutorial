import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

// 目前， Gallery.js 同時匯出 Profile 和 Gallery。
// 將 Profile 元件移動到其自己的 Profile.js ，然後更改 App 元件以依次渲染 <Profile /> 和 <Gallery /> 。
// 您可以對 Profile 使用預設或命名匯出，但請確保在 App.js 和 Gallery.js 中使用相應的匯入語法！

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
