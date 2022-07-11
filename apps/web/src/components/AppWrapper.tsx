import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { isServer } from "../utils/isServer";

const AppWrapper: FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  if (isServer && loading) {
    return null;
  }
  if (!session) {
    router.replace("/signin");
  }

  return <>{children}</>;
};

export default AppWrapper;
