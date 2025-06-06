import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

import { toast } from "react-toastify";

import { onLogout } from "../store";
import {
  useAuthStore,
  useGroupStore,
  useSuggestionStore,
} from "../hooks/stores";
import { useAppDispatch } from "../hooks/hooks";

import {
  SuggestionList,
  SuggestionContext,
  GroupForm,
  GroupList,
  GroupInfo,
  EditGroup,
  User,
  UserInfo,
  EditUser,
} from "../components";
import { Group, User as IUser } from "../interfaces/interfaces";

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
  const [previewInfo, setPreviewInfo] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const { getUser, user: selfUser } = useAuthStore();
  const { groups, getGroups, loading } = useGroupStore();
  const {
    getSuggestions,
    createSuggestion,
    getSuggestionsById,
    id,
    type,
    errorMessage,
    suggestions,
    loading: suggestionLoading,
  } = useSuggestionStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser();
    getSuggestions();
    getGroups();
  }, []);

  const isGroupType = useMemo(() => type === "group", [type]);
  const groupRelated =
    isGroupType && !loading ? groups.find((group) => group.id === id) : null;

  return (
    <>
      <div className="flex flex-col h-screen max-w-full bg-gray-900 text-white">
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
            <GroupList className="max-h-[450px] overflow-y-scroll overflow-x-hidden" />

            <Divider orientation="horizontal" sx={{ background: "#505050" }} />
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
                  <GroupForm
                    handleAfterCreate={() => {
                      setGroupModalVisible(false);
                      toast.success("Grupo creado");
                    }}
                  />
                </div>
              </Modal>
            </section>
          </aside>
          <section className="flex-1 flex-row bg-gray-900 w-full">
            <div className="flex mb-4 bg-gray-800 p-2">
              <SuggestionContext
                name={isGroupType ? (groupRelated?.name as string) : "Tú"}
                genres={
                  (isGroupType
                    ? groupRelated?.genres || []
                    : selfUser?.genres) as string[]
                }
                image={isGroupType ? (groupRelated?.image as string) : ""}
                isGroup={isGroupType}
              />
              <div className="flex-1"></div>

              <button
                className="px-4 py-2 mr-3 bg-[#2b2f31] rounded-md transition-all border"
                onClick={() => setShowEditForm(true)}
              >
                Editar
              </button>

              <Modal open={showEditForm} onClose={() => setShowEditForm(false)}>
                <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
                  {isGroupType ? (
                    <EditGroup group={groupRelated as Group} />
                  ) : (
                    <EditUser user={selfUser as IUser} />
                  )}
                </div>
              </Modal>

              <button
                className="px-4 py-2 mr-3 bg-[#2b2f31] rounded-md transition-all border"
                onClick={() => setPreviewInfo(true)}
              >
                Acerca de
              </button>
              <Modal
                open={previewInfo}
                onClose={() => setPreviewInfo(false)}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
                  {isGroupType ? (
                    <GroupInfo
                      group={groupRelated as Group}
                      handleAfterDelete={() => setPreviewInfo(false)}
                    />
                  ) : (
                    <UserInfo user={selfUser as IUser} />
                  )}
                </div>
              </Modal>

              {/* FIXME: Parece que no funciona realmente bien para grupos, aparte de hacer alguna que otra cosa rara */}
              <button
                className="bg-green-600 hover:bg-green-700 text-foreground rounded-xl p-3 mr-3"
                onClick={async () => {
                  let { genres, likes, dislikes } = isGroupType
                    ? {
                        genres: groupRelated?.genres,
                        likes: groupRelated?.likes,
                        dislikes: groupRelated?.dislikes,
                      }
                    : {
                        genres: selfUser?.genres,
                        likes: selfUser?.likes,
                        dislikes: selfUser?.dislikes,
                      };
                  try {
                    genres = genres as string[];
                    likes = likes as string[];
                    dislikes = dislikes as string[];
                    const suggestionTitles = suggestions.map(
                      (suggestion) => suggestion.title
                    );

                    createSuggestion({
                      genres,
                      likes,
                      dislikes,
                      existingSuggestions: suggestionTitles,
                    });
                    !loading && toast.success("Sugerencia creada");
                  } catch (error) {
                    toast.error(errorMessage);
                  }

                  isGroupType ? getSuggestionsById(id as string) : getSuggestions();
                }}
              >
                Sugerir
              </button>
            </div>

            <section className="ml-2">
              <h1 className="text-accent font-bold text-2xl pb-3">
                {isGroupType ? "Sugerencias de grupo" : "Tus sugerencias"}
              </h1>
              <SuggestionList />
            </section>
          </section>
        </main>
      </div>
    </>
  );
}
