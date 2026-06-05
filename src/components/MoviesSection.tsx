import MediaCard from "./MediaCard";

interface Movie {
  title: string;
  level: string;
  link: string;
  tmdb_id: number;
  cover?: string;
}

interface MoviesSectionProps {
  movies: Movie[];
}

export default function MoviesSection({ movies }: MoviesSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Watch — Movies
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4 min-w-min">
          {movies.map((movie) => (
            <MediaCard
              key={movie.tmdb_id}
              title={movie.title}
              subtitle="Movie"
              level={movie.level}
              link={movie.link}
              cover={movie.cover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
