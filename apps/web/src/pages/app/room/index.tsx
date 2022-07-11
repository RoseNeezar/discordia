import { NextPageContext } from "next";
import React from "react";
import { withAuthenticatedOrRedirect } from "../../../utils/withAuthRedirect";

const Room = () => {
  return <div>Room</div>;
};

export default Room;
export const getServerSideProps = (context: NextPageContext) =>
  withAuthenticatedOrRedirect(
    context,
    "/signin",
    (context: NextPageContext) => {
      return {
        props: {},
      };
    }
  );
