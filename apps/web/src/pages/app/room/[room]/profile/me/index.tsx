import { NextPageContext } from "next";
import React from "react";
import { withAuthenticatedOrRedirect } from "../../../../../../utils/withAuthRedirect";

const Me = () => {
  return <div>Me</div>;
};

export default Me;

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
