import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";

export const withAuthenticatedOrRedirect = async (
  context: NextPageContext,
  destination: string = "/",
  fn?: (context: NextPageContext) => object
) => {
  const session = await getSession(context);
  const isUser = !!session?.user;

  const defaultResponse = { props: { session } };
  // No authenticated session
  if (session?.error === "RefreshAccessTokenError") {
    signIn();
    return fn ? { ...defaultResponse, ...fn(context) } : defaultResponse;
  }

  if (!isUser) {
    return {
      redirect: {
        permanent: false,
        destination,
      },
    };
  }

  // Returned by default, when `fn` is undefined

  return fn ? { ...defaultResponse, ...fn(context) } : defaultResponse;
};
