import { NextPageContext } from "next";
import React from "react";
import { withAuthenticatedOrRedirect } from "../../../../../utils/withAuthRedirect";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;

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
