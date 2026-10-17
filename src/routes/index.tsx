import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { getFacebookPosts } from "@/lib/facebook-posts";

export const Route = createFileRoute("/")({
  loader: () => getFacebookPosts(),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  return <HomePage posts={data.posts} live={data.live} />;
}
