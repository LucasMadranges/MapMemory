export default function HorizontalBar({className}: { className?: string }) {
  return (
    <div className={`border-b border-gray-200 rounded-full w-full my-8 ${className}`}></div>
  );
}
