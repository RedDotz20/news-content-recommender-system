export function BoxLoader({ text = 'L O A D I N G' }: { text?: string }) {
  return (
    <div className="flex h-[calc(100vh-140px)] w-full justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative h-16 w-16 animate-loader bg-current">
          <div className="animation-loader-inner absolute inset-0 rounded-full"></div>
        </div>
        <h1>{text}</h1>
      </div>
    </div>
  );
}
