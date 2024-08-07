"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("name");
  const lastName = searchParams.get("lastname");
  const picture = searchParams.get("picture");
  const email = searchParams.get("email");
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    if (email) {
      setUser({
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        picture: picture || "",
      });
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Home;
