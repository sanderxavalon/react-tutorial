export default function Color({ value }: { value: string }) {
  return <div className="colorbox" style={{ backgroundColor: value }} />;
}
