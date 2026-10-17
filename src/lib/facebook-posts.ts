import { createServerFn } from "@tanstack/react-start";

const FALLBACK = [
  "https://www.facebook.com/61591089806027/posts/122107418271369660",
  "https://www.facebook.com/61591089806027/posts/122105359971369660",
];

type FacebookResult = { posts: string[]; live: boolean };

export const getFacebookPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<FacebookResult> => {
    const token = process.env.FACEBOOK_PAGE_TOKEN?.trim();
    if (!token) return { posts: FALLBACK, live: false };

    try {
      const url = new URL("https://graph.facebook.com/v21.0/me/posts");
      url.searchParams.set("fields", "permalink_url");
      url.searchParams.set("limit", "4");
      url.searchParams.set("access_token", token);
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      const body = (await res.json()) as {
        data?: Array<{ permalink_url?: string }>;
      };
      const posts = (body.data ?? [])
        .map((post) => post.permalink_url)
        .filter((href): href is string => Boolean(href));
      if (!posts.length) return { posts: FALLBACK, live: false };
      return { posts, live: true };
    } catch {
      return { posts: FALLBACK, live: false };
    }
  },
);
