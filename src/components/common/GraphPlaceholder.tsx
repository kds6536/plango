interface GraphPlaceholderProps {
  height?: number;
}

export default function GraphPlaceholder({ height = 200 }: GraphPlaceholderProps) {
  return (
    <div
      className="bg-gray-100 rounded flex items-center justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="text-gray-400">그래프 영역</div>
    </div>
  );
} 