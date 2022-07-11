// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { AuthEnabledComponentConfig } from "../utils/types";
import { AppProps } from "next/app";

type AppAuthProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;
};

const Auth: FC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) router.replace("/signin"); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

const RESTRICTED_PATHS = ["/app", "/app/room"];

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router: { route },
}: AppAuthProps) => {
  const requireAuth = RESTRICTED_PATHS.some((path) => route.startsWith(path));

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {/* {requireAuth ? (
        <Auth> */}
      <Component {...pageProps} />
      {/* </Auth>
      ) : (
        <Component {...pageProps} />
      )} */}
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
