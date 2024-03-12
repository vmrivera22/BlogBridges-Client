import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import GetPosts from "../api/GetPosts";
import GetRooms from "../api/GetRooms";
import GetImage from "../api/GetProfileImage";
import GetRules from "../api/GetRules";
import GetComments from "../api/GetComments";
import GetRoom from "../api/GetRoom";

// Query for fetching many posts.
export const useGetPosts = (roomId: number) => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", `${roomId}`],
    queryFn: ({ pageParam = 1 }) =>
      GetPosts({ roomId: roomId, postId: -1, page: pageParam }),
    getNextPageParam: (oldpage) => Number(oldpage?.page) + 1,
    initialPageParam: 1,
  });
};

// Query for fetching one post.
export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: ["posts", `${id}`],
    queryFn: () => GetPosts({ roomId: -1, postId: id, page: -1 }),
  });
};

// Query for getting rooms.
export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => GetRooms(),
  });
};

// Query for getting a user - without posts.
export const useGetAvatar = (userName: string) => {
  return useQuery({
    queryKey: ["avatar"],
    queryFn: () => GetImage({ userName: userName, page: -1 }),
    enabled: userName != "",
  });
};

// Query for getting a user with their posts.
export const useGetUser = (userName: string) => {
  return useInfiniteQuery({
    queryKey: ["avatar", `${userName}`],
    queryFn: ({ pageParam = 1 }) =>
      GetImage({ userName: userName, page: pageParam }),
    enabled: userName != "",
    getNextPageParam: (oldpage) => Number(oldpage?.page) + 1,
    initialPageParam: 1,
  });
};

//Query for getting a room with posts.
export const useGetRoom = (roomId: number) => {
  return useInfiniteQuery({
    queryKey: ["rooms", `${roomId}`],
    queryFn: ({ pageParam = 1 }) => GetRoom({ id: roomId, page: pageParam }),
    getNextPageParam: (oldPage) => Number(oldPage?.page) + 1,
    initialPageParam: 1,
  });
};

// Query for getting a room's rules.
export const useGetRules = (roomId: number) => {
  return useQuery({
    queryKey: ["rules", `${roomId}`],
    queryFn: () => GetRules({ roomId: roomId }),
  });
};

// Query for getting a post's comments.
export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", `${postId}`],
    queryFn: () => GetComments({ postId: Number(postId) }),
  });
};
