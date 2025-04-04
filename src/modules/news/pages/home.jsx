import { Title } from "@/components/ui/title";
import { NewsCard } from "../components";

export const NewsHome = ({ data }) => {
  return (
    <section className="grid gap-4">
      <Title>Top 10 News</Title>
      <ul className="grid gap-4">
        {data.map((news) => {
          return (
            <li key={news.ID}>
              <NewsCard {...news} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
