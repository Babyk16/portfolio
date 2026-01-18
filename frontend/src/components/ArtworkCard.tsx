import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Artwork {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
}

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="group relative block overflow-hidden rounded-xl bg-zinc-900">
      {/* Image */}
      <img
        src={artwork.image_url}
        alt={artwork.title}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "h-full w-full object-cover transition-transform duration-500",
          "group-hover:scale-105"
        )}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-white text-lg font-medium">{artwork.title}</h3>
        {artwork.description && (
          <p className="text-zinc-300 text-sm line-clamp-2">
            {artwork.description}
          </p>
        )}
      </div>
    </Link>
  );
}
