export const HISTORY_MOCK = [
  {
    id: "4",
    title: "Como faço para solicitar assistência jurídica gratuita?",
    data: "2024-12-13T12:00:00Z",
  },
  {
    id: "5",
    title:
      "Quais documentos são necessários para abrir um processo na Defensoria Pública?",
    data: "2024-12-12T10:00:00Z",
  },
  {
    id: "6",
    title:
      "A Defensoria Pública pode me ajudar com questões de direito de família?",
    data: "2024-12-12T10:00:00Z",
  },
  {
    id: "7",
    title: "Onde encontro o posto de atendimento mais próximo da Defensoria?",
    data: "2024-12-12T10:00:00Z",
  },
  {
    id: "8",
    title: "Quais são os horários de atendimento da Defensoria Pública?",
    data: "2024-12-09T08:30:00Z",
  },
  {
    id: "9",
    title: "Como funciona o agendamento para ser atendido pela Defensoria?",
    data: "2024-12-09T08:30:00Z",
  },
  {
    id: "10",
    title: "Posso ser representado pela Defensoria em uma causa trabalhista?",
    data: "2024-12-09T08:30:00Z",
  },
  {
    id: "11",
    title: "O que devo fazer se perder a audiência agendada pela Defensoria?",
    data: "2024-12-10T14:30:00Z",
  },
  {
    id: "12",
    title: "A Defensoria oferece apoio para vítimas de violência doméstica?",
    data: "2024-12-10T14:30:00Z",
  },
  {
    id: "13",
    title: "Como posso saber o andamento do meu processo na Defensoria?",
    data: "2024-12-10T14:30:00Z",
  },
];

export function groupByRelativeDate(
  items: { id: string; title: string; data: string }[],
): Record<string, { id: string; title: string; data: string }[]> {
  // Função para converter a data em texto relativo
  const getRelativeDate = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "hoje";
    } else if (diffInDays === 1) {
      return "ontem";
    } else if (diffInDays > 1) {
      return `${diffInDays} dias anteriores`;
    } else if (diffInDays === -1) {
      return "amanhã";
    } else {
      return `${Math.abs(diffInDays)} dias à frente`;
    }
  };

  // Agrupando objetos por datas relativas
  return items.reduce(
    (groups, item) => {
      const relativeDate = getRelativeDate(item.data);
      if (!groups[relativeDate]) {
        groups[relativeDate] = [];
      }
      groups[relativeDate].push(item);
      return groups;
    },
    {} as Record<string, { id: string; title: string; data: string }[]>,
  );
}
