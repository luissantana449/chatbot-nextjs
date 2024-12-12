export interface ChatItem {
  id: string;
  title: string;
}

export interface ChatListProps {
  items: ChatItem[];
  onItemSelect: (id: string) => void;
}

export interface ChatItemProps {
  title: string;
  onClick: () => void;
}
