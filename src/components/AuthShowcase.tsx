import { signIn, signOut, useSession } from "next-auth/react";
import { SiGithub as GithubIcon } from "react-icons/si";
import { trpc } from "../utils/trpc";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="mx-auto flex w-full max-w-[450px] flex-col items-center justify-center gap-4">
      {sessionData ? (
        <button
          className="mt-8 flex w-full cursor-pointer items-center justify-center rounded border border-black bg-white py-2 text-center font-semibold text-black"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign out
        </button>
      ) : (
        <div className="mt-12 flex w-full max-w-[450px] flex-col items-center justify-center gap-4">
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded bg-stone-900 py-2 text-center text-white"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <GithubIcon className="mr-2" />
            Sign in with Github
          </button>
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded border border-black bg-white py-2 text-center font-semibold text-black"
            onClick={() => signIn("discord", { callbackUrl: "/" })}
          >
            Sign in with Discord
          </button>
        </div>
      )}

      {/* TODO: delete */}
      <p className="mt-8 text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
    </div>
  );
};

export default AuthShowcase;
