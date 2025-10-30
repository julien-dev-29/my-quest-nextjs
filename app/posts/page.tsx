import { getPosts } from "@app/actions";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Titre de la page",
};
async function Page() {
  const posts = await getPosts();
  return (
    <div>
      <Link href="/posts/create">Create a posts</Link>
      {posts.map((p) => (
        <div key={p.id}>{p.content}</div>
      ))}
    </div>
  );
}

export default Page;
