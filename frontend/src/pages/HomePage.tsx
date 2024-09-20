import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { GroupForm, SuggestionForm } from "../components";
import { Button } from "../components/ui";
import Modal from "@mui/material/Modal";

import { Group } from "../interfaces/interfaces";

import { api } from "../api/api";

import { onLogout } from "../store";
import { useAuthStore } from "../hooks/useAuthStore";
import { useAppDispatch } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { GroupList } from "../components/GroupList";

interface Movie {
  title: string;
}

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
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="min-h-screen bg-[#05080a] text-[#cddbe5]">
        <header className="fixed flex w-full h-20 bg-[#2d1f3b] items-center shadow-md px-4 md:px-8 border-b-4 border-[#c4853a] z-10">
          <div className="text-[#cddbe5] font-bold text-xl md:text-2xl">
            CapyCouch
          </div>
          <div className="flex-1"></div>

          <Link
            to="/profile"
            className="px-4 py-2 mx-2 bg-[#2b2f31] text-[#cddbe5] rounded-md border border-[#c4853a] transition-colors duration-200 ease-in-out hover:bg-[#2d1f3b] hover:text-[#c4853a]"
          >
            Ver perfil
          </Link>

          <button
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("token-init-date");
              Cookies.remove("user");
              Cookies.remove("user_id");
              dispatch(onLogout());
            }}
            className="px-4 py-2 mx-2 bg-[#2b2f31] text-[#cddbe5] rounded-md hover:bg-red-500 transition-all border border-[#c4853a]"
          >
            Cerrar sesión
          </button>
        </header>

        <section className="flex flex-row">
          <aside className="relative border-r top-20 flex-shrink w-[15rem]">
            <GroupList />

            <section className="flex justify-center p-3">
              <button
                className="bg-green-600 text-foreground rounded-xl p-3"
                onClick={() => setGroupModalVisible(true)}
              >
                Crear grupo
              </button>
              <Modal
                open={groupModalVisible}
                onClose={() => setGroupModalVisible(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-[#05080a] rounded-xl p-5 w-[50%] ">
                  <GroupForm />
                </div>
              </Modal>
            </section>
          </aside>

          <main className="relative top-20">
            <section className="flex border-b-2 top-20 w-5">
              <div className="flex-1"></div>
              <button
                className="bg-green-600 text-foreground rounded-xl p-3"
                onClick={() => setSuggestionModalVisible(true)}
              >
                Sugerir
              </button>
              <Modal
                open={suggestionModalVisible}
                onClose={() => setSuggestionModalVisible(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-[#05080a] rounded-xl p-5 w-[50%]">
                  <SuggestionForm />
                </div>
              </Modal>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}
