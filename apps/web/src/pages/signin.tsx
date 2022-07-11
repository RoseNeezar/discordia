import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  getSession,
} from "next-auth/react";

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  return (
    <>
      {providers &&
        Object.values(providers as ClientSafeProvider).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
};

export default SignIn;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const providers = await getProviders();

  const { req } = context;
  const session = await getSession({ req });
  console.log("Serer---", session);
  if (session) {
    return {
      redirect: { destination: "/app" },
    };
  }

  return {
    props: { providers },
  };
};
