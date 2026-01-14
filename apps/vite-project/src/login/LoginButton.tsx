import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@repo/ui";
import { LogIn } from "lucide-react";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Sign In with Auth0
    </Button>
  );
}
