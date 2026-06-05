interface Book {
  title: string;
  author: string;
  level: string;
  link: string;
  openlibrary_id: string;
  cover?: string;
}

interface ReadingSource {
  source: string;
  title: string;
  desc: string;
  link: string;
}

interface ReadSectionProps {
  books: Book[];
  readingSources: ReadingSource[];
}

export default function ReadSection({ books, readingSources }: ReadSectionProps) {
  return (
    <section>
      <h2 className="font-poppins text-sm font-semibold uppercase tracking-widest mb-6 gradient-blue">
        Read
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-semibold text-white uppercase mb-4">
            Books
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {books.map((book) => (
              <BookCard key={book.openlibrary_id} book={book} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white uppercase mb-4">
            Reading Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {readingSources.map((source, idx) => (
              <a
                key={idx}
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1420] border border-gray-800 rounded-lg p-4 h-full hover:border-blue-600 transition-colors duration-300">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {source.source}
                  </p>
                  <p className="text-sm font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {source.title}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {source.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer"
    >
      <div className="relative bg-gray-800 rounded mb-2 overflow-hidden aspect-[2/3] transition-transform duration-300 group-hover:scale-105">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center p-2">
            <span className="text-amber-100 text-xs text-center font-medium line-clamp-3">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded">
            {book.level}
          </span>
        </div>
        <p className="text-xs font-medium text-white truncate">{book.title}</p>
        <p className="text-xs text-gray-500 truncate">{book.author}</p>
      </div>
    </a>
  );
}
