export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-(--accent) animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-(--accent) animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-(--accent) animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
