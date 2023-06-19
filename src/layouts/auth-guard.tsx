import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * AuthGuardProps is the type of the props object that must be passed to AuthGuard component.
 * children: The children to render if the user is authenticated.
 */
interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard is a component that will redirect the user to the main page if they are not authenticated.
 * @param children The children to render if the user is authenticated.
 * @returns The AuthGuard component.
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Get the session status from next-auth.
  const { status: sessionStatus } = useSession();
  // Get the router from next.
  const router = useRouter();

  // If the user is not authenticated, redirect them to the main page.
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
    }
  }, [router, sessionStatus]);

  // If the user is not authenticated, don't render anything.
  if (["loading", "unauthenticated"].includes(sessionStatus)) {
    return null;
  }
  // If the user is authenticated, render the children.
  return <>{children}</>;
};

export default AuthGuard;
