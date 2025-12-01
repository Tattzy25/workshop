import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen w-screen grid place-items-center">
      <Link href="/dashboard" aria-label="Go to dashboard">
        <button className="text-6xl sm:text-8xl md:text-[10rem] leading-none h-auto w-auto bg-transparent">
          😊
        </button>
      </Link>
    </div>
  );
}
