import { NextPageContext } from "next";
import React from "react";
import { withAuthenticatedOrRedirect } from "../../../../utils/withAuthRedirect";

const Rooms = () => {
  return <div>Roooooooom</div>;
};

export default Rooms;

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
