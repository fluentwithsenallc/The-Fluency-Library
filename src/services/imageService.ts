const CACHE: Record<string, string | null> = {};

export const imageService = {
  async getShowPoster(tmdbId: number): Promise<string | null> {
    const cacheKey = `show-${tmdbId}`;
    if (cacheKey in CACHE) return CACHE[cacheKey];

    const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!tmdbKey) {
      CACHE[cacheKey] = null;
      return null;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${tmdbKey}`
      );
      if (!response.ok) throw new Error("TMDB fetch failed");
      const data = await response.json();
      if (data.poster_path) {
        const url = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
        CACHE[cacheKey] = url;
        return url;
      }
    } catch (error) {
      console.debug(`TMDB show ${tmdbId} fallback`);
    }

    CACHE[cacheKey] = null;
    return null;
  },

  async getMoviePoster(tmdbId: number): Promise<string | null> {
    const cacheKey = `movie-${tmdbId}`;
    if (cacheKey in CACHE) return CACHE[cacheKey];

    const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!tmdbKey) {
      CACHE[cacheKey] = null;
      return null;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${tmdbKey}`
      );
      if (!response.ok) throw new Error("TMDB fetch failed");
      const data = await response.json();
      if (data.poster_path) {
        const url = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
        CACHE[cacheKey] = url;
        return url;
      }
    } catch (error) {
      console.debug(`TMDB movie ${tmdbId} fallback`);
    }

    CACHE[cacheKey] = null;
    return null;
  },

  async getBookCover(
    openlibrary_id: string,
    title: string,
    author: string
  ): Promise<string | null> {
    const cacheKey = `book-${openlibrary_id}`;
    if (cacheKey in CACHE) return CACHE[cacheKey];

    const cleanId = openlibrary_id.replace("M", "");

    try {
      const coverResponse = await fetch(
        `https://covers.openlibrary.org/b/id/${cleanId}-M.jpg`,
        { method: "HEAD" }
      );
      if (coverResponse.ok) {
        const url = `https://covers.openlibrary.org/b/id/${cleanId}-M.jpg`;
        CACHE[cacheKey] = url;
        return url;
      }
    } catch (error) {
      console.debug(`OpenLibrary ${openlibrary_id} HEAD check failed`);
    }

    try {
      const searchQuery = `${title} ${author}`.replace(/\s+/g, "+");
      const searchResponse = await fetch(
        `https://openlibrary.org/search.json?title=${searchQuery}&author=${author}`
      );
      if (!searchResponse.ok) throw new Error("OpenLibrary search failed");
      const searchData = await searchResponse.json();

      if (searchData.docs && searchData.docs.length > 0) {
        const doc = searchData.docs[0];
        if (doc.cover_id) {
          const url = `https://covers.openlibrary.org/b/id/${doc.cover_id}-M.jpg`;
          CACHE[cacheKey] = url;
          return url;
        }
      }
    } catch (error) {
      console.debug(`OpenLibrary search for "${title}" failed`);
    }

    try {
      const googleQuery = `${title} ${author}`.replace(/\s+/g, "+");
      const googleResponse = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
      );
      if (!googleResponse.ok) throw new Error("Google Books failed");
      const googleData = await googleResponse.json();

      if (googleData.items && googleData.items.length > 0) {
        const book = googleData.items[0];
        if (book.volumeInfo?.imageLinks?.thumbnail) {
          const url = book.volumeInfo.imageLinks.thumbnail.replace(
            "http://",
            "https://"
          );
          CACHE[cacheKey] = url;
          return url;
        }
      }
    } catch (error) {
      console.debug(`Google Books for "${title}" failed`);
    }

    CACHE[cacheKey] = null;
    return null;
  },

  async getAlbumArt(
    spotifyId: string,
    title: string,
    artist: string
  ): Promise<string | null> {
    const cacheKey = `album-${spotifyId}`;
    if (cacheKey in CACHE) return CACHE[cacheKey];

    const accessToken = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;

    if (accessToken) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${spotifyId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.images?.[0]?.url) {
            CACHE[cacheKey] = data.images[0].url;
            return data.images[0].url;
          }
        }
      } catch (error) {
        console.debug(`Spotify album ${spotifyId} failed`);
      }
    }

    const googleKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    if (googleKey) {
      try {
        const googleQuery = `${title} ${artist} album cover`.replace(
          /\s+/g,
          "+"
        );
        const googleResponse = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${googleQuery}&key=${googleKey}`
        );
        if (googleResponse.ok) {
          const googleData = await googleResponse.json();

          if (googleData.items && googleData.items.length > 0) {
            const book = googleData.items[0];
            if (book.volumeInfo?.imageLinks?.thumbnail) {
              const url = book.volumeInfo.imageLinks.thumbnail.replace(
                "http://",
                "https://"
              );
              CACHE[cacheKey] = url;
              return url;
            }
          }
        }
      } catch (error) {
        console.debug(`Google fallback for "${title}" failed`);
      }
    }

    CACHE[cacheKey] = null;
    return null;
  },
};
