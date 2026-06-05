import { X, ChevronRight } from "lucide-react";
import {
  IconCar,
  IconMoon,
  IconBriefcase,
  IconMoodSmile,
  IconFlame,
} from "@tabler/icons-react";

interface Playlist {
  title: string;
  icon: string;
  desc: string;
  items: Array<{
    ref_type: string;
    ref_title: string;
  }>;
}

interface PlaylistModalProps {
  playlist: Playlist;
  onClose: () => void;
  contentData: any;
}

const iconMap: Record<string, React.ReactNode> = {
  car: <IconCar className="w-5 h-5" />,
  moon: <IconMoon className="w-5 h-5" />,
  briefcase: <IconBriefcase className="w-5 h-5" />,
  "mood-laugh": <IconMoodSmile className="w-5 h-5" />,
  flame: <IconFlame className="w-5 h-5" />,
};

export default function PlaylistModal({
  playlist,
  onClose,
  contentData,
}: PlaylistModalProps) {
  const getItemDetails = (
    ref_type: string,
    ref_title: string
  ): { subtitle: string; link?: string } | null => {
    switch (ref_type) {
      case "show":
        const show = contentData.shows.find(
          (s: any) => s.title === ref_title
        );
        return show
          ? { subtitle: `${show.level} • TV Show`, link: show.link }
          : null;
      case "movie":
        const movie = contentData.movies.find(
          (m: any) => m.title === ref_title
        );
        return movie
          ? { subtitle: `${movie.level} • Movie`, link: movie.link }
          : null;
      case "album":
        const album = contentData.albums.find(
          (a: any) => a.title === ref_title
        );
        return album
          ? { subtitle: `${album.artist} • Album`, link: album.link }
          : null;
      case "podcast":
        const podcast = contentData.podcasts.find(
          (p: any) => p.title === ref_title
        );
        return podcast
          ? { subtitle: `${podcast.tag} • ${podcast.mins} min`, link: podcast.link }
          : null;
      case "book":
        const book = contentData.books.find(
          (b: any) => b.title === ref_title
        );
        return book
          ? { subtitle: `${book.author} • ${book.level}`, link: book.link }
          : null;
      case "reading":
        const source = contentData.reading_sources.find(
          (s: any) => s.title === ref_title
        );
        return source
          ? { subtitle: source.source, link: source.link }
          : null;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#111827] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#1a1f3a] to-[#0f1420] border-b border-gray-800 p-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-400 mt-1">
              {iconMap[playlist.icon]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {playlist.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{playlist.desc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-3">
          {playlist.items.map((item, idx) => {
            const details = getItemDetails(item.ref_type, item.ref_title);
            if (!details) return null;

            return (
              <a
                key={idx}
                href={details.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg bg-[#0b0f1a] hover:bg-[#1a1f3a] border border-gray-800 hover:border-blue-600 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-400 uppercase mb-1">
                    {item.ref_type}
                  </p>
                  <p className="text-white font-medium truncate">
                    {item.ref_title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {details.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors ml-4 flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
