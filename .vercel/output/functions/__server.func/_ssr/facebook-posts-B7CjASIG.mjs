import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/facebook-posts-B7CjASIG.js
var FALLBACK = ["https://www.facebook.com/61591089806027/posts/122107418271369660", "https://www.facebook.com/61591089806027/posts/122105359971369660"];
var getFacebookPosts_createServerFn_handler = createServerRpc({
	id: "4740591a24693fca127d7034a9e60f6d7721d1250574b4f441ad5fff4b8abfd1",
	name: "getFacebookPosts",
	filename: "src/lib/facebook-posts.ts"
}, (opts) => getFacebookPosts.__executeServer(opts));
var getFacebookPosts = createServerFn({ method: "GET" }).handler(getFacebookPosts_createServerFn_handler, async () => {
	const token = process.env.FACEBOOK_PAGE_TOKEN?.trim();
	if (!token) return {
		posts: FALLBACK,
		live: false
	};
	try {
		const url = new URL("https://graph.facebook.com/v21.0/me/posts");
		url.searchParams.set("fields", "permalink_url");
		url.searchParams.set("limit", "4");
		url.searchParams.set("access_token", token);
		const posts = ((await (await fetch(url, { signal: AbortSignal.timeout(8e3) })).json()).data ?? []).map((post) => post.permalink_url).filter((href) => Boolean(href));
		if (!posts.length) return {
			posts: FALLBACK,
			live: false
		};
		return {
			posts,
			live: true
		};
	} catch {
		return {
			posts: FALLBACK,
			live: false
		};
	}
});
//#endregion
export { getFacebookPosts_createServerFn_handler };
