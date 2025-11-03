import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full flex flex-col justify-between items-center">
      <header className="p-5 border-b w-full flex justify-between items-center shadow-sm">
        <Link href="/posts">
          <h1 className="text-teal-600 text-3xl font-bold">Jurol Book</h1>
        </Link>
        <ModeToggle />
      </header>
      {children}
      <footer className="p-5 shadow w-full text-center text-teal-600">
        Footer
      </footer>
    </section>
  );
}

export default PostsLayout;
