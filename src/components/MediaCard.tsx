interface MediaCardProps {
  title: string;
  subtitle: string;
  level: string;
  link: string;
  cover?: string;
}

export default function MediaCard({
  title,
  subtitle,
  level,
  link,
  cover,
}: MediaCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 group cursor-pointer"
    >
      <div className="relative w-40 h-60 rounded-lg overflow-hidden bg-gray-800 mb-3 transition-transform duration-300 group-hover:scale-105">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm text-center px-2">{title}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 bg-blue-950 px-2 py-1 rounded">
            {level}
          </span>
        </div>
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </a>
  );
}
