import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";

export const FEEDBACK_MSGS = [
  "Não gostei da resposta",
  "Falta de empenho",
  "Não seguiu as instruções por completo",
  "Resposta incorreta",
  " Não deveria ter usado memória",
];

export const OPTIONS = [
  {
    id: 1,
    label: "Resumir textos",
    icon: IoDocumentTextOutline,
    iconClass: "text-purple-500",
  },
  {
    id: 2,
    label: "Aconselhar",
    icon: HiOutlineAcademicCap,
    iconClass: "text-blue-500",
  },
  {
    id: 3,
    label: "Ajudar a escrever",
    icon: TfiWrite,
    iconClass: "text-orange-500",
  },
];
