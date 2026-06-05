import MediaCard from "./MediaCard";

interface Show {
  title: string;
  level: string;
  link: string;
  tmdb_id: number;
  cover?: string;
}

interface ShowsSectionProps {
  shows: Show[];
}

export default function ShowsSection({ shows }: ShowsSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Watch — Shows
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4 min-w-min">
          {shows.map((show) => (
            <MediaCard
              key={show.tmdb_id}
              title={show.title}
              subtitle="TV Show"
              level={show.level}
              link={show.link}
              cover={show.cover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
