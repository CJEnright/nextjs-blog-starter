import Link from "next/link";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full px-8 lg:px-16" id="top">
      <nav className="max-w-[1152px] mx-auto w-full">
        <div className="h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight flex items-center gap-2"
          >
            <span className="hidden lg:inline">YourApp</span>
          </Link>

          <div className="flex gap-8 items-center">
            <Link
              href="/blog"
              className="font-semibold text-neutral-600 transition-all hover:text-neutral-900"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer className="max-w-[1152px] mx-auto w-full pt-16 pb-24 flex flex-col gap-8"></footer>
    </div>
  );
}
