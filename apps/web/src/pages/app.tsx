import { InferGetServerSidePropsType, NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { withAuthenticatedOrRedirect } from "../utils/withAuthRedirect";

const MainRouter = dynamic(() => import("../router/MainRouter"), {
  suspense: true,
  ssr: false,
}); //<- set SSr to false

const App: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  sth,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [router.isReady]);

  return isMounted ? (
    <Suspense fallback={<h1>Loading....</h1>}>
      <MainRouter sth={sth} />
    </Suspense>
  ) : null;
};

export default App;

export const getServerSideProps = (context: NextPageContext) =>
  withAuthenticatedOrRedirect(
    context,
    "/signin",
    (context: NextPageContext) => {
      console.log("SERVER", context.query);
      return {
        props: {
          sth: "SHeeesh" + context.query?.path ?? "",
        },
      };
    }
  );
