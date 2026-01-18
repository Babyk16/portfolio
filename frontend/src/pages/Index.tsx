import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { GallerySection } from "@/components/GallerySection";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/artworks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ARTWORKS FROM API:", data);
        setArtworks(data);
      });
  }, []);

  // Group artworks by category
  const groupedByCategory = artworks.reduce((acc: any, art: any) => {
    const categoryName = art.category || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(art);
    return acc;
  }, {});

  return (
    <Layout>
      <HeroSection />

      <div id="gallery" className="bg-background">
        {/* Divider */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Gallery Sections from Database */}
        {Object.entries(groupedByCategory).map(
          ([categoryName, categoryArtworks]: any) => (
            <GallerySection
              key={categoryName}
              category={{
                name: categoryName,
                artworks: categoryArtworks,
              }}
            />
          )
        )}
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <AboutSection />
    </Layout>
  );
};

export default Index;
