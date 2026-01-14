import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@repo/ui";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: globalThis.location.origin } })
      }
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  );
}
