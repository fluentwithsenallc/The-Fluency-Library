interface Album {
  title: string;
  artist: string;
  link: string;
  spotify_id: string;
  cover?: string;
}

interface SingSectionProps {
  albums: Album[];
}

export default function SingSection({ albums }: SingSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Sing
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-4 min-w-min">
          {albums.map((album) => (
            <AlbumCard key={album.spotify_id} album={album} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <a
      href={album.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 group cursor-pointer"
    >
      <div className="relative w-36 h-36 rounded-lg overflow-hidden bg-gray-800 mb-3 transition-transform duration-300 group-hover:scale-105">
        {album.cover ? (
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
            <span className="text-blue-200 text-xs text-center px-2 font-medium">
              {album.title}
            </span>
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-white truncate">{album.title}</p>
      <p className="text-xs text-gray-500 truncate">{album.artist}</p>
    </a>
  );
}
