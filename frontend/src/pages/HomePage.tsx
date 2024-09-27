import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { GroupForm, SuggestionForm } from "../components";
import Modal from "@mui/material/Modal";

import { Group } from "../interfaces/interfaces";

import { api } from "../api/api";

import { onLogout } from "../store";
import { useAuthStore, useSuggestionStore } from "../hooks/stores";
import { useAppDispatch } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { GroupList } from "../components/GroupList";
import { Suggestion } from "../components/Suggestion";

const getGroups = async () => {
  const { data } = await api.get("/groups");

  return data as Group;
};

export default function HomePage() {
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const { user } = useAuthStore();
  const { createSuggestion, suggestions } = useSuggestionStore();
  const dispatch = useAppDispatch();

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

            <h1 className="text-accent font-bold text-2xl pb-3">Sugerencias</h1>
            <section className="flex space-x-3">
              {suggestions.movies.map((suggestion) => (
                <Suggestion
                  key={suggestion.title}
                  type={suggestion.type}
                  name={suggestion.title}
                  description={suggestion.description}
                  genres={suggestion.genres}
                  platforms={suggestion.platforms}
                />
              ))}
              {suggestions.series.map((suggestion) => (
                <Suggestion
                  key={suggestion.title}
                  type={suggestion.type}
                  name={suggestion.title}
                  description={suggestion.description}
                  genres={suggestion.genres}
                  platforms={suggestion.platforms}
                />
              ))}
              <Suggestion
                type="Serie"
                name="Stranger Things"
                description="Una serie donde ocurren cosas extrañas"
                genres={["Terror", "Suspenso"]}
                platforms={["Netflix"]}
              />
              <Suggestion
                type="Serie"
                name="Stranger Thingsa"
                description="Una serie donde ocurren cosas extrañas"
                genres={["Terror", "Suspenso"]}
                platforms={["Netflix"]}
              />
            </section>
          </section>
        </main>
      </div>
    </>
  );
}
