import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { ComponentWithAuth } from "../../utils/types";
import { withAuthenticatedOrRedirect } from "../../utils/withAuthRedirect";

const App: NextPage & ComponentWithAuth<{}> = () => {
  const { data } = useSession();
  const getT = async () => {
    const t = await getSession();
    console.log("t--", t);
  };
  useEffect(() => {
    getT();
  }, []);

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

App.authenticationEnabled = true;

export default App;

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

// export const getServerSideProps: GetServerSideProps = async (
//   _: GetServerSidePropsContext
// ) => {
//   console.log("EJS---SERVER--APP");
//   return {
//     props: {
//       stateee: "hello",
//     },
//   };
// };
