import { LoadingSpinner } from '@/components/customui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
