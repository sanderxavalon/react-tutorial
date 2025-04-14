import { useState } from 'react'
import './App.css'

// 定義使用者資料的介面（TypeScript 型別定義）
interface UserProfile {
  name: string;        // 姓名
  age: number;         // 年齡
  address: {           // 地址（巢狀物件）
    city: string;      // 城市
    street: string;    // 街道
    details: {         // 詳細地址（更深層的巢狀物件）
      building: string; // 大樓
      floor: number;    // 樓層
    }
  };
  preferences: {       // 偏好設定（巢狀物件）
    theme: 'light' | 'dark';  // 主題：只能選擇 'light' 或 'dark'
    notifications: boolean;   // 通知：布林值
  };
}

function App() {
  // 使用 useState 初始化一個包含巢狀物件的狀態
  // 注意：React 中的狀態應該被視為不可變的（immutable）
  const [user, setUser] = useState<UserProfile>({
    name: '王小明',
    age: 30,
    address: {
      city: '台北市',
      street: '忠孝東路',
      details: {
        building: 'A棟',
        floor: 5
      }
    },
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  // 更新基本屬性：姓名
  // 使用 spread operator (...) 創建新的物件，保持其他屬性不變
  // 這是一個淺拷貝（Shallow Copy）的例子：
  // - 只複製了第一層的屬性
  // - 對於基本型別（string, number, boolean）來說，淺拷貝就足夠了
  const updateName = () => {
    setUser({
      ...user,  // 淺拷貝：複製所有現有的屬性
      name: '李小華'  // 只更新 name 屬性
    });
  };

  // 更新巢狀物件：地址中的城市
  // 這是一個深拷貝（Deep Copy）的例子：
  // - 需要對每一層的巢狀物件都使用 spread operator
  // - 這樣才能確保所有層級的物件都是新的
  // - 如果不這樣做，可能會意外修改到其他地方的引用
  const updateAddress = () => {
    setUser({
      ...user,  // 第一層淺拷貝
      address: {
        ...user.address,  // 第二層淺拷貝
        city: '高雄市'    // 只更新 city 屬性
      }
    });
  };

  // 更新更深層的巢狀物件：大樓詳細資訊
  // 這是一個更複雜的深拷貝例子：
  // - 需要對每一層的巢狀物件都使用 spread operator
  // - 展示了如何處理多層巢狀物件的更新
  // - 每一層都需要創建新的物件，以保持不可變性
  const updateBuildingDetails = () => {
    setUser({
      ...user,  // 第一層淺拷貝
      address: {
        ...user.address,  // 第二層淺拷貝
        details: {
          ...user.address.details,  // 第三層淺拷貝
          floor: 10                 // 只更新 floor 屬性
        }
      }
    });
  };

  // 更新多個屬性：主題和通知設定
  // 這是一個同時更新多個屬性的深拷貝例子：
  // - 展示了如何在同一個更新中處理多個屬性的變化
  // - 同時也展示了如何處理布林值的切換
  const updatePreferences = () => {
    setUser({
      ...user,  // 第一層淺拷貝
      preferences: {
        ...user.preferences,  // 第二層淺拷貝
        theme: user.preferences.theme === 'light' ? 'dark' : 'light',  // 切換主題
        notifications: !user.preferences.notifications                  // 切換通知設定
      }
    });
  };

  // 將物件轉換為格式化的 JSON 字串，用於顯示
  const formatState = (obj: any, indent = 0): string => {
    return JSON.stringify(obj, null, 2)
      .split('\n')
      .map(line => {
        const spaces = ' '.repeat(indent);
        return `${spaces}${line}`;
      })
      .join('\n');
  };

  return (
    <div className="App">
      <div className="main-content">
        <h1>React 狀態中的物件更新</h1>
        
        <div className="user-info">
          <h2>使用者資料</h2>
          <p>姓名：{user.name}</p>
          <p>年齡：{user.age}</p>
          <p>地址：{user.address.city}{user.address.street}</p>
          <p>大樓：{user.address.details.building}，{user.address.details.floor}樓</p>
          <p>主題：{user.preferences.theme === 'light' ? '淺色' : '深色'}</p>
          <p>通知：{user.preferences.notifications ? '開啟' : '關閉'}</p>
        </div>

        <div className="buttons">
          <button onClick={updateName}>更新姓名</button>
          <button onClick={updateAddress}>更新城市</button>
          <button onClick={updateBuildingDetails}>更新樓層</button>
          <button onClick={updatePreferences}>切換主題和通知</button>
        </div>

        <div className="explanation">
          <h3>重要概念：</h3>
          <ul>
            <li>React 中的狀態應該被視為不可變的（immutable）</li>
            <li>使用展開運算符（...）來創建新的物件</li>
            <li>對於巢狀物件，每一層需要更新的部分都要使用展開運算符</li>
            <li>永遠創建新的物件，而不是修改現有的物件</li>
            <li>淺拷貝（Shallow Copy）：
              <ul>
                <li>只複製物件的第一層屬性</li>
                <li>適合用於基本型別（string, number, boolean）</li>
                <li>使用 spread operator (...) 實現</li>
              </ul>
            </li>
            <li>深拷貝（Deep Copy）：
              <ul>
                <li>複製物件的所有層級</li>
                <li>對於巢狀物件，需要對每一層都進行拷貝</li>
                <li>確保所有層級的物件都是新的，避免意外修改</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="state-panel">
        <h3>當前狀態</h3>
        <div className="state-display">
          <pre>{formatState(user)}</pre>
        </div>
      </div>
    </div>
  )
}

export default App
