import { Position } from './Box';

// 定義 Background 組件的 props 介面
interface BackgroundProps {
  position: Position;
}

export default function Background({
  position
}: BackgroundProps) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
}
  