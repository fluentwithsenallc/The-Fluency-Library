import {
  IconCar,
  IconMoon,
  IconBriefcase,
  IconMoodSmile,
  IconFlame,
  IconChevronRight,
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

interface PlaylistsSectionProps {
  playlists: Playlist[];
  onSelectPlaylist: (playlist: Playlist) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  car: <IconCar className="w-8 h-8" stroke={1.7} />,
  moon: <IconMoon className="w-8 h-8" stroke={1.7} />,
  briefcase: <IconBriefcase className="w-8 h-8" stroke={1.7} />,
  "mood-laugh": <IconMoodSmile className="w-8 h-8" stroke={1.7} />,
  flame: <IconFlame className="w-8 h-8" stroke={1.7} />,
};

function PlaylistCard({
  playlist,
  onSelect,
  iconMap,
}: {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
  iconMap: Record<string, React.ReactNode>;
}) {
  return (
    <button onClick={() => onSelect(playlist)} className="group text-left">
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1420] border border-gray-800 rounded-lg p-6 h-full hover:border-blue-600 hover:from-[#1f2749] hover:to-[#141d2f] transition-all duration-300">
        <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
          {iconMap[playlist.icon]}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {playlist.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{playlist.desc}</p>
        <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
          <span>{playlist.items.length} picks</span>
          <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" stroke={1.7} />
        </div>
      </div>
    </button>
  );
}

export default function PlaylistsSection({
  playlists,
  onSelectPlaylist,
}: PlaylistsSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Playlists For What You're Working On
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlists.slice(0, 4).map((playlist, idx) => (
          <PlaylistCard key={idx} playlist={playlist} onSelect={onSelectPlaylist} iconMap={iconMap} />
        ))}
      </div>
      {playlists.length > 4 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {playlists.slice(4).map((playlist, idx) => (
            <div key={idx + 4} className="w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]">
              <PlaylistCard playlist={playlist} onSelect={onSelectPlaylist} iconMap={iconMap} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
