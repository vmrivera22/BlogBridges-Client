import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateComment from "../api/CreateComment";
import CreateRoom from "../api/CreateRoom";
import UpdateRoom from "../api/UpdateRoom";
import CreatePost from "../api/CreatePost";
import UpdatePost from "../api/UpdatePost";
import UpdateRules from "../api/UpdateRules";
import UpdateImage from "../api/UpdateProfileImage";
import DeletePost from "../api/DeletePost";
import DeleteRoom from "../api/DeleteRoom";
import { useNavigate } from "react-router-dom";

// Mutation for creating rooms.
export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
        exact: true,
      });
    },
  });
};

// Mutation for editing rooms.
export const useEditRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });
};

// Mutation for creating posts.
export const useCreatePostMutation = (
  userName: string,
  avatar: string,
  roomId: number
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreatePost,
    onSuccess: async (data, variables) => {
      await queryClient.setQueryData(["posts", `${data}`], () => {
        let date = new Date().toISOString();
        const newPost = {
          id: Number(data),
          title: variables.input.title,
          body: variables.input.description,
          image: variables.input.image,
          datePosted: date,
          user: { userName: userName, imageUrl: avatar },
        } as Post;
        return { data: [newPost] };
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
        refetchType: "all",
        exact: true,
      });
      await queryClient.invalidateQueries({
        queryKey: ["rooms", `${roomId}`],
      });
      navigate(`/post/${roomId}/${data}`);
    },
  });
};

// Mutation for editing posts.
export const useEditPostMutation = (
  _id: number,
  roomId: number,
  setState: any
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePost,
    onSuccess: async () => {
      if (roomId && roomId > 0) {
        await queryClient.invalidateQueries({
          queryKey: ["rooms", `${roomId}`],
          refetchType: "active",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["rooms"],
          refetchType: "active",
        });
      }
      await queryClient.invalidateQueries({
        queryKey: ["posts", `${_id}`],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts", "infinite", `${roomId}`],
        refetchType: "all",
      });
      setState(false);
    },
  });
};

// Mutation to create comments.
export const useCreateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", `${postId}`],
      });
    },
  });
};

// Mutation to change rules for a room.
export const useEditRulesMutation = (roomId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateRules,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rules", `${roomId}`],
      });
    },
  });
};

// Mutation to change a users profile avatar.
export const useEditAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["avatar"],
      });
    },
  });
};

// Mutation to delete posts.
export const useDeletePostMutation = (roomId: number, indiv = false) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: DeletePost,
    onSuccess: async () => {
      if (roomId != -1) {
        // Room Id is -1 when deleting from Home route.
        await queryClient.invalidateQueries({
          queryKey: ["rooms", `${roomId}`],
        });
        await queryClient.invalidateQueries({
          queryKey: ["posts", "infinite"],
          exact: true,
        });
        await queryClient.refetchQueries({
          queryKey: ["posts", "infinite"],
        });
        if (indiv) {
          navigate(`/room/${roomId}`);
        }
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["posts", "infinite"],
          exact: false,
        });
        await queryClient.refetchQueries({
          queryKey: ["posts", "infinite"],
        });
        if (indiv) {
          navigate(`/`);
        }
      }
    },
  });
};

// Mutation to delete rooms.
export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: DeleteRoom,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      navigate("/");
      return;
    },
  });
};
