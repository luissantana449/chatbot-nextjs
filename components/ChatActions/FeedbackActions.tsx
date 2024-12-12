import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";

import Tooltip from "../Tooltip";

import { Slide, toast } from "react-toastify";
import { useState } from "react";
import Modal from "../Modal";
import { FEEDBACK_MSGS } from "./constants";

interface FeedbackActionsInterface {
  message: string;
}

export default function FeedbackActions({ message }: FeedbackActionsInterface) {
  const [like, setLike] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      toast.dark("Resposta copiada!", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
    } catch (err) {
      toast.error("Falha ao copiar");
      console.error("Falha ao copiar: ", err);
    }
  };

  const handleLike = () => {
    //TO DO - REQUISIÇÃO PARA API
    setLike(true);
  };
  const handleDisLike = async () => {
    //TO DO - REQUISIÇÃO PARA API
    setLike(false);
  };
  const handleChangeModel = async () => {
    //TO DO - REQUISIÇÃO PARA API
  };
  return (
    <>
      <div className="flex gap-8 text-lg mt-2">
        <button onClick={() => handleCopy(message)}>
          <Tooltip
            icon={<IoCopyOutline />}
            description="Copiar"
            iconColor="hover:bg-zinc-300 p-1 rounded-md cursor-pointer transition-colors "
          />
        </button>

        <button onClick={handleLike}>
          <Tooltip
            icon={<AiOutlineLike />}
            description="Resposta satisfatória"
            iconColor="hover:bg-zinc-300 p-1 rounded-md cursor-pointer transition-colors "
          />
        </button>
        <button onClick={openModal}>
          <Tooltip
            icon={<AiOutlineDislike />}
            description="Resposta insatisfatória"
            iconColor="hover:bg-zinc-300 p-1 rounded-md cursor-pointer transition-colors"
          />
        </button>
        <button disabled={like !== false} className="disabled:text-zinc-400">
          {
            <Tooltip
              icon={<FiRefreshCw />}
              description="Alterar modelo"
              iconColor={`${
                !like && "hover:bg-zinc-300"
              } p-1 rounded-md cursor-pointer transition-colors`}
            />
          }
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Feedback"
        footer={
          <div className="flex justify-end gap-2 text-zinc-800">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-primary transition-colors text-sm"
              onClick={() => alert("Action executed!")}
            >
              Enviar
            </button>
          </div>
        }
      >
        <div className="flex gap-2 text-sm text-zinc-800 flex-wrap">
          {FEEDBACK_MSGS.map((msg, i) => {
            return (
              <div
                key={msg}
                className="p-1.5 hover:bg-zinc-200 rounded-md border cursor-pointer transition-colors select-none"
              >
                {msg}
              </div>
            );
          })}
        </div>
        <form action="">
          <input
            type="text"
            className="border w-full p-1.5 rounded-md mt-4 placeholder:text-xs text-sm focus:border"
            placeholder="(Opcional) Fique a vontade para adicionar detalhes específicos"
          />
        </form>

        <p className=""></p>
      </Modal>
    </>
  );
}
