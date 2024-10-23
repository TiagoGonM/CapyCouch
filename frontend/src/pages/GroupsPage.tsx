import React, { useEffect, useState } from 'react'
import { Input } from '../components/ui'
import { useAuthStore } from '../hooks/stores'

export default function GroupsPage() {
  const groupGenres = ['Acción', 'Comedia', 'Ciencia Ficción', 'Drama', 'Aventura']
  const [activeTab, setActiveTab] = useState('user')
  const [guardados, setGuardados] = useState<string[]>([])
  const [newGuardado, setNewGuardado] = useState('')

  const { user, getUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [])
  
  const addGuardado = () => {
    if (newGuardado.trim() !== '') {
      setGuardados([...guardados, newGuardado.trim()])
      setNewGuardado('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#05080a] text-[#cddbe5] font-['Space_Grotesk',sans-serif]">
      {/* Top Rectangle with App Name */}
      <div className="w-full h-16 bg-[#2d1f3b] flex items-center relative">
        <h1 className="text-2xl font-bold ml-6">CapyCouch</h1>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4853a]"></div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#2b2f31] flex flex-col">
          <div className="flex flex-col h-full">
            <div 
              className={`p-6 cursor-pointer hover:bg-[#2d1f3b] ${activeTab === 'user' ? 'bg-[#2d1f3b]' : ''} text-center`}
              onClick={() => setActiveTab('user')}
            >
              <span className="block text-xl font-semibold">User</span>
            </div>
            <div className="h-0.5 bg-[#c4853a] mx-4"></div>
            <div 
              className={`p-6 cursor-pointer hover:bg-[#2d1f3b] ${activeTab === 'group1' ? 'bg-[#2d1f3b]' : ''} text-center`}
              onClick={() => setActiveTab('group1')}
            >
              <span className="block text-xl font-semibold">Grupo 1</span>
            </div>
            <div className="h-0.5 bg-[#c4853a] mx-4"></div>
            <div 
              className={`p-6 cursor-pointer hover:bg-[#2d1f3b] ${activeTab === 'group2' ? 'bg-[#2d1f3b]' : ''} text-center`}
              onClick={() => setActiveTab('group2')}
            >
              <span className="block text-xl font-semibold">Grupo 2</span>
            </div>
            <div className="h-0.5 bg-[#c4853a] mx-4"></div>
            <div 
              className={`p-6 cursor-pointer hover:bg-[#2d1f3b] ${activeTab === 'saved' ? 'bg-[#2d1f3b]' : ''} text-center`}
              onClick={() => setActiveTab('saved')}
            >
              <span className="block text-xl font-semibold">Guardados</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Secondary Rectangle - Only shown for 'group1' and 'group2' tabs */}
          {(activeTab === 'group1' || activeTab === 'group2') && (
            <div className="w-full bg-[#2b2f31] p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Grupo: Amantes del Cine</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {groupGenres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-[#2d1f3b] border border-[#c4853a] rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="text-sm">Miembros del grupo: 5</div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'user' ? (
              <div className="bg-[#2b2f31] p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Perfil de Usuario</h2>
                  <a className="px-4 py-2 bg-[#2d1f3b] text-[#cddbe5] border-2 border-[#c4853a] rounded-md hover:bg-black hover:text-[#c4853a] transition-colors duration-200">
                    Cambiar gustos
                  </a>
                </div>
                <div className="flex items-center justify-between mb-6 bg-[#2d1f3b] p-4 rounded-lg">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#c4853a]">{user.username}</h3>
                    <p className="text-lg text-[#cddbe5]">{user.email}</p>
                  </div>
                  <button className="px-3 py-1 bg-[#c4853a] text-[#05080a] rounded-md hover:bg-[#d3964b] transition-colors duration-200">
                    Editar
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Géneros favoritos:</label>
                  <Input type="text" value="Acción, Comedia, Drama" readOnly />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Actores favoritos: (Opcional)</label>
                  <Input type="text" value="Tom Hanks, Meryl Streep" readOnly />
                </div>
              </div>
            ) : (activeTab === 'group1' || activeTab === 'group2') ? (
              <div className="bg-[#2b2f31] p-6 rounded-lg">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recomendaciones para el grupo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#2d1f3b] p-4 rounded-lg flex items-center">
                        <div>
                          <h4 className="font-semibold">Película Recomendada {i}</h4>
                          <p className="text-sm">Género: Acción, Aventura</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Guardados del Grupo</h3>
                  <div className="flex mb-4">
                    <Input
                      type="text"
                      placeholder="Añadir nueva película o serie"
                      value={newGuardado}
                      onChange={(e) => setNewGuardado(e.target.value)}
                      className="mr-2"
                    />
                    <a onClick={addGuardado} className="px-4 py-2 bg-[#c4853a] text-[#05080a] rounded-md hover:bg-[#d3964b] transition-colors duration-200 cursor-pointer">
                      Añadir
                    </a>
                  </div>
                  <ul className="list-disc pl-5">
                    {guardados.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : activeTab === 'saved' ? (
              <div className="bg-[#2b2f31] p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Guardados</h2>
                <p className="text-lg">
                  En esta sección podrás ver todas tus películas o series favoritas guardadas, tanto personales como de grupos.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}