import React, { useState } from "react";

import Modal from "@mui/material/Modal";

export const ConfirmModal = ({
  confirm,
  show,
}: {
  confirm: (v: boolean) => void;
  show: boolean;
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <Modal
      open={show}
      onClose={() => setShowConfirmModal(false)}
      className="flex items-center justify-center"
    >
      <div className="bg-gray-800 rounded-xl p-5 w-[50%]">
        <h1 className="text-foreground text-xl">¿Estás segur@?</h1>
        <p className="text-accent">Esta acción no se puede deshacer</p>
        <div className="flex justify-end mt-5">
          <button
            className="p-3 bg-red-500 rounded-xl border-2 border-red-500 hover:bg-red-800 hover:bg-opacity-70"
            onClick={() => {
              confirm(true);
            }}
          >
            Eliminar grupo
          </button>

          <button
            className="px-4 py-2 mx-2 bg-[#2b2f31] rounded-md transition-all border border-accent"
            onClick={() => {
              setShowConfirmModal(false);
              confirm(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
