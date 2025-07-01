// services/followApi.ts
import axiosInstance from "@/lib/axios.interceptor";
import { createApi } from "@reduxjs/toolkit/query/react";
import toaster from "react-hot-toast";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

// region Axios instance with default configuration
const customBaseQuery = async ({ url, method, data }: any) => {
  try {
    const result = await axiosInstance({ url, method, data });
    return { data: result.data };
  } catch (error) {
    return { error };
  }
};


export const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // ----- Send Follow Request -----
    sendFollowRequest: builder.mutation({
      query: (followingId: string) => ({
        url: "/follow",
        method: "POST",
        data: { followingId },
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toaster.success("Follow request sent!");
        } catch (err) {
          console.error("Follow request failed:", err);
          toaster.error("Failed to send follow request.");
        }
      },
    }),

    // ----- Accept Follow Request -----
    acceptFollowRequest: builder.mutation({
      query: (followerId: string) => ({
        url: "/accept-follow",
        method: "POST",
        data: { followerId },
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toaster.success("Follow request accepted!");
        } catch (err) {
          console.error("Accept follow failed:", err);
          toaster.error("Failed to accept follow request.");
        }
      },
    }),

    // ----- Reject Follow Request -----
    rejectFollowRequest: builder.mutation({
      query: (followerId: string) => ({
        url: "/reject-follow",
        method: "POST",
        data: { followerId },
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toaster.success("Follow request rejected.");
        } catch (err) {
          console.error("Reject follow failed:", err);
          toaster.error("Failed to reject follow request.");
        }
      },
    }),

    // ----- Unfollow User -----
    unfollowUser: builder.mutation({
      query: (followingId: string) => ({
        url: "/unfollow",
        method: "POST",
        data: { followingId },
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toaster.success("Unfollowed user successfully.");
        } catch (err) {
          console.error("Unfollow failed:", err);
          toaster.error("Failed to unfollow user.");
        }
      },
    }),
  }),
});

export const {
  useSendFollowRequestMutation,
  useAcceptFollowRequestMutation,
  useRejectFollowRequestMutation,
  useUnfollowUserMutation,
} = followApi;
