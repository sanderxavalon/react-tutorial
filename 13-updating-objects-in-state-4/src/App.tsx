import { useState } from 'react';

// 定義形狀的型別
type Shape = {
  id: number;
  type: 'circle' | 'square';
  x: number;
  y: number;
};

// 初始化形狀陣列
let initialShapes: Shape[] = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState<Shape[]>(
    initialShapes
  );

  // 處理點擊事件：將圓形向下移動
  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 方形保持不變
        return shape;
      } else {
        // 圓形向下移動 50 像素
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // 使用新的陣列重新渲染
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        將圓形向下移動！
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
            background: 'purple',
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            borderRadius:
              shape.type === 'circle'
                ? '50%' : '',
            width: 20,
            height: 20,
          }} />
      ))}
    </>
  );
}
