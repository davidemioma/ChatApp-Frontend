export interface UserProps {
  _id: string;
  profileUrl: string;
  username: string;
}

export interface ConvoProps {
  _id: string;
  members: string[];
}

export interface MessageProps {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface ArrivalProps {
  senderId: string;
  text: string;
  createdAt: any;
}
