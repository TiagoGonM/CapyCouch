import React, { useEffect, useState } from 'react'
import SuggestionForm from '../components/SuggestionForm';
import { Media } from '../../../backend/src/interfaces/interfaces';
import { GroupForm } from '../components/GroupForm';
import { Group } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';

interface Movie {
  title: string
}

const getGroups = async () => {
  const res = await fetch("https://shiny-palm-tree-94j47gq9v4pcxwvx-3000.app.github.dev/api/groups");

  return await res.json() as Group;
}

export default function HomePage() {
  const [groups, setGroups] = useState<Group[]>();

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

  useEffect(() => {
    getGroups();
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[#05080a] text-[#cddbe5]">
        <header className="fixed flex w-full h-20 bg-[#2d1f3b] items-center shadow-md px-4 md:px-8 border-b-4 border-[#c4853a] z-10">
          <div className="text-[#cddbe5] font-bold text-xl md:text-2xl">
            CapyCouch
          </div>
          <div className="flex-1"></div>
          
          <a
           href="/User"
            className="px-4 py-2 mx-2 bg-[#2b2f31] text-[#cddbe5] rounded-md border border-[#c4853a] transition-colors duration-200 ease-in-out hover:bg-[#2d1f3b] hover:text-[#c4853a]"
          >
            usuario
            
          </a>
          
        </header>

        <section>
          <SuggestionForm />
        </section>

        <section>
          <GroupForm />
        </section>

        <section>
          {groups?.map(({ name, ...group }) => (
            <React.Fragment key={name}>
              <h1>Nombre: {name}</h1>
              <p>Resto: {JSON.stringify(group)}</p>
            </React.Fragment>
          ))}
        </section>

        <main className="pt-24 px-4 md:px-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#c4853a]">
              Tus Grupos
            </h2>
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