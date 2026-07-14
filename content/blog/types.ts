export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO "YYYY-MM-DD"
  tags: string[];
  readTime: number; // minutes
  lang: "fr" | "en";
}

export interface BlogPost {
  meta: PostMeta;
  Content: () => React.JSX.Element;
}
