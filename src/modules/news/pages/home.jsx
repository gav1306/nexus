import { NewsCard } from "../components";

export const NewsHome = ({ data }) => {
  return (
    <section>
      <ul>
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
