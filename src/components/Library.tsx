import { useState } from "react";
import TopNav from "./TopNav";
import HeroSection from "./HeroSection";
import ShowsSection from "./ShowsSection";
import MoviesSection from "./MoviesSection";
import SingSection from "./SingSection";
import ListenSection from "./ListenSection";
import ReadSection from "./ReadSection";
import PlaylistsSection from "./PlaylistsSection";
import PlaylistModal from "./PlaylistModal";
import Footer from "./Footer";
import { contentData } from "../data/content";

interface Playlist {
  title: string;
  icon: string;
  desc: string;
  items: Array<{
    ref_type: string;
    ref_title: string;
  }>;
}

export default function Library() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <TopNav />

      <main className="max-w-8xl mx-auto px-6 lg:px-8">
        <HeroSection />

        <div className="space-y-16 py-12">
          <ShowsSection shows={contentData.shows} />
          <MoviesSection movies={contentData.movies} />
          <SingSection albums={contentData.albums} />
          <ListenSection podcasts={contentData.podcasts} />
          <ReadSection
            books={contentData.books}
            readingSources={contentData.reading_sources}
          />
          <PlaylistsSection
            playlists={contentData.playlists}
            onSelectPlaylist={setSelectedPlaylist}
          />
        </div>
      </main>

      <Footer />

      {selectedPlaylist && (
        <PlaylistModal
          playlist={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
          contentData={contentData}
        />
      )}
    </div>
  );
}
