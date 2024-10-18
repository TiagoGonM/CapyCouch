import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Modal from "@mui/material/Modal";
import { GroupForm, SuggestionForm, GroupList, Suggestion } from "../components";

import { onLogout } from "../store";
import { useAuthStore, useSuggestionStore } from "../hooks/stores";
import { useAppDispatch } from "../hooks/hooks";

export default function HomePage() {
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);

  const { getUser } = useAuthStore();
  const { getSuggestions, suggestions } = useSuggestionStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser();
    getSuggestions();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <header className="bg-[#2d1f3b] p-4 flex justify-between items-center">
          <div className="font-bold text-xl md:text-2xl">CapyCouch</div>
          <div className="flex-1"></div>

          <Link
            to="/groups"
            className="px-4 py-2 mx-2 bg-[#2b2f31] text-[#cddbe5] rounded-md border border-[#c4853a] transition-colors duration-200 ease-in-out hover:bg-[#2d1f3b] hover:text-[#c4853a]"
          >
            Grupos y Perfil
          </Link>

          <button
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("token-init-date");
              Cookies.remove("user");
              Cookies.remove("user_id");
              dispatch(onLogout());
            }}
            className="px-4 py-2 mx-2 bg-[#2b2f31] rounded-md hover:bg-red-500 transition-all border border-accent"
          >
            Cerrar sesión
          </button>
        </header>
        <main className="flex flex-1">
          <aside className="w-64 bg-gray-800 p-4 space-y-4">
            <GroupList />

            <section className="space-y-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-foreground rounded-xl p-3 w-full"
                onClick={() => setGroupModalVisible(true)}
              >
                Crear grupo
              </button>
              <Modal
                open={groupModalVisible}
                onClose={() => setGroupModalVisible(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-800 rounded-xl p-5 w-[50%] ">
                  <GroupForm />
                </div>
              </Modal>
            </section>
          </aside>
          <section className="flex-1 bg-gray-900 p-4">
            <div className="flex justify-end mb-4 bg-gray-800 p-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-foreground rounded-xl p-3"
                onClick={() => setSuggestionModalVisible(true)}
              >
                Sugerir
              </button>

              <Modal
                open={suggestionModalVisible}
                onClose={() => setSuggestionModalVisible(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
                  <SuggestionForm />
                </div>
              </Modal>
            </div>

            {/* TODO: Carousel */}
            <h1 className="text-accent font-bold text-2xl pb-3">
              Tus sugerencias
            </h1>
            <section className="flex space-x-3">
              {!suggestions.length ? (
                <h1 className="text-[#707070] text-center pl-5 pb-3">
                  No hay sugerencias
                </h1>
              ) : (
                suggestions.map((suggestion) => (
                  <Suggestion
                    key={suggestion.title}
                    type={suggestion.type}
                    name={suggestion.title}
                    description={suggestion.description}
                    genres={suggestion.genres}
                    platforms={suggestion.platforms}
                  />
                ))
              )}
            </section>
          </section>
        </main>
      </div>
    </>
  );
}
