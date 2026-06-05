interface Podcast {
  title: string;
  tag: string;
  mins: string;
  desc: string;
  link: string;
}

interface ListenSectionProps {
  podcasts: Podcast[];
}

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <a
      href={podcast.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1420] border border-gray-800 rounded-lg p-6 h-full hover:border-blue-600 transition-colors duration-300 cursor-pointer">
        <div className="absolute top-4 right-4 text-xs font-bold text-blue-400">
          {podcast.mins} MIN
        </div>
        <div className="flex gap-1 h-8 items-center mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="waveform-bar w-1 bg-blue-500 rounded-full" />
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
            {podcast.title}
          </p>
          <p className="text-sm text-gray-400 line-clamp-2">{podcast.desc}</p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs font-medium text-gray-500 uppercase bg-gray-900 px-2 py-1 rounded">
              {podcast.tag}
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-gray-600 group-hover:text-blue-500 transition-colors">
          <span className="text-sm">→</span>
        </div>
      </div>
    </a>
  );
}

export default function ListenSection({ podcasts }: ListenSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Listen
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.slice(0, 6).map((podcast, idx) => (
          <PodcastCard key={idx} podcast={podcast} />
        ))}
      </div>
      {podcasts.length > 6 && (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {podcasts.slice(6).map((podcast, idx) => (
            <div key={idx + 6} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <PodcastCard podcast={podcast} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
