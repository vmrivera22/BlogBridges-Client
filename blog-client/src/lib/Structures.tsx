interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  datePosted: string;
  user?: User;
}

interface Comment {
  id: number;
  content: string;
  comments?: Comment[];
  user: User;
}

interface Room {
  id: number;
  name: string;
  description: string;
  user?: User;
  posts?: Post[];
}

interface CreateRoom {
  name: string;
  description: string;
  creator: string;
}

interface Rule {
  id: number;
  ruleText: string;
}

interface User {
  id?: number;
  userName: string;
  imageUrl: string;
  posts?: Post[];
}
