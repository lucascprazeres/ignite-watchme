import { useEffect, useState } from "react";
import { GenreResponseProps } from "../App";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  selectedGenre: GenreResponseProps;
  onSelectGenre: (id: number) => void;
}

export function SideBar({ selectedGenre, onSelectGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectGenre(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}