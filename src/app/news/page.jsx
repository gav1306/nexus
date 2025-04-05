import { NewsHome } from "@/modules/news/pages";

export const revalidate = 3600;

export default async function News() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS_BASE_URL}/article/list?lang=EN&limit=10`
  );
  const news = await data.json();

  return <NewsHome data={news.Data} />;
}
