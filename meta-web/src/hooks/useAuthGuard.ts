"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCredentials } from "@/redux/slice/auth.slice";

export default function useAuthGuard() {
    const router = useRouter();
    const dispatch = useDispatch();

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

   useEffect(() => {
  try {
    if (!accessToken) {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAccessToken && storedRefreshToken) {
        dispatch(setCredentials({ accessToken: storedAccessToken, refreshToken: storedRefreshToken }));
      } else {
        router.push("/login");
      }
    }
  } catch (error) {
    console.error("AuthGuard Error:", error);
  }
}, [accessToken, dispatch, router]);

}
