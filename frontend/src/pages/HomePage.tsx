import React, { useState } from 'react'
import SuggestionForm from '../components/SuggestionForm';
import { Media } from '../../../backend/src/interfaces/interfaces';
import { GroupForm } from '../components/GroupForm';

interface Movie {
  title: string
}

export default function HomePage() {
  const [groups, setGroups] = useState([
    "Los Pibes",
    "aguante marvel",
    "reinas del drama",
    "sanguchito"
  ])

  const [movies, setMovies] = useState<Movie[]>([
    { title: "El Show de Truman" },
    { title: "Son Como Niños 2" },
    { title: "Esperando la Carroza" },
    { title: "Avengers: Endgame" },
    { title: "Dr. House" }
  ])
  
  const [media, setMedia] = useState<Media[]>();
  
  const handleMedia = (newMedia: Media[]) => {
    setMedia([...(media || []), ...newMedia]);
  }
  
  return (
    <>
      <div className="min-h-screen bg-[#05080a] text-[#cddbe5]">
        <header className="fixed flex w-full h-20 bg-[#2d1f3b] items-center shadow-md px-4 md:px-8 border-b-4 border-[#c4853a] z-10">
          <div className="text-[#cddbe5] font-bold text-xl md:text-2xl">
            CapyCouch
          </div>
          <div className="flex-1"></div>
          {/* <button
            onClick={() => logout()}
            className="px-4 py-2 mx-2 bg-[#2b2f31] text-[#cddbe5] rounded-md hover:bg-[#000000] hover:text-[#c4853a] transition-all border border-[#c4853a]"
            >
            Cerrar sesión
          </button> */}
        </header>

        <section>
          <SuggestionForm />
        </section>

        <section>
          <GroupForm />
        </section>

        <main className="pt-24 px-4 md:px-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#c4853a]">
              Tus Grupos
            </h2>
            <ul className="space-y-2">
              {groups.map((group, index) => (
                <li
                  key={index}
                  className="bg-[#2b2f31] p-3 rounded-md shadow-md hover:bg-[#2d1f3b] transition-all cursor-pointer"
                >
                  {group}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#c4853a]">Tu Lista</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="bg-[#2b2f31] rounded-md shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="w-full h-48 bg-white"></div>
                  <div className="p-2 text-center">{movie.title}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
