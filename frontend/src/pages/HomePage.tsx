import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Modal from "@mui/material/Modal";
import {
  GroupForm,
  GroupList,
  Suggestion,
  User,
} from "../components";

import { onLogout } from "../store";
import {
  useAuthStore,
  useSuggestionStore,
} from "../hooks/stores";
import { useAppDispatch } from "../hooks/hooks";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function HomePage() {
  const [groupModalVisible, setGroupModalVisible] = useState(false);

  const { getUser, user: selfUser } = useAuthStore();
  const { getSuggestions, suggestions, createSuggestion, getSuggestionsById } =
    useSuggestionStore();
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
            <div
              className="bg-[#202020] p-2 rounded-xl cursor-pointer hover:underline text-accent font-bold hover:scale-105 hover:underline-offset-1 transition-all"
              onClick={getSuggestions}
            >
              <User name={selfUser.username || "N/A"} image="" />
            </div>
            <h2 className="font-bold">Tus grupos</h2>
            <GroupList className="max-h-[450px] overflow-y-scroll" />

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
                <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
                  <GroupForm />
                </div>
              </Modal>
            </section>
          </aside>
          <section className="flex-1 bg-gray-900 p-4">
            <div className="flex justify-end mb-4 bg-gray-800 p-2 max-w-[1280px]">
              <button
                className="bg-green-600 hover:bg-green-700 text-foreground rounded-xl p-3"
                // onClick={() => setSuggestionModalVisible(true)}
                onClick={() => {
                  const { genres, likes, dislikes, id } = selfUser;
                  createSuggestion({ genres, likes, dislikes } as {
                    genres: string[];
                    likes: string[];
                    dislikes: string[];
                  });
                  getSuggestionsById(id as string);
                }}
              >
                Sugerir
              </button>

              {/* <Modal
                open={suggestionModalVisible}
                onClose={() => setSuggestionModalVisible(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
                  <SuggestionForm />
                </div>
              </Modal> */}
            </div>

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
                    key={suggestion.description}
                    type={suggestion.type}
                    name={suggestion.title}
                    description={suggestion.description}
                    genres={suggestion.genres}
                    platforms={suggestion.platforms}
                  />
                ))
              )}

              {/* TODO: Carousel */}
              {/* <Carousel responsive={responsive}>
              </Carousel> */}
            </section>
          </section>
        </main>
      </div>
    </>
  );
}
