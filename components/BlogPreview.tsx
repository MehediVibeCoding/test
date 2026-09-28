import BlogPreviewClient from "./BlogPreviewClient";
import { getPublishedBlogPosts } from "@/lib/academyData";

export default async function BlogPreview() {
  const posts = await getPublishedBlogPosts(3);

  return <BlogPreviewClient posts={posts} />;
}
