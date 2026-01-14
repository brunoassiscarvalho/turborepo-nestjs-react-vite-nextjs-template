import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui";
import { LogoutButton } from "../login/LogoutButton";

export function UserProfile() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <div className="text-sm font-medium text-foreground">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.email}</div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback className="text-xs">
          {user.name?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  );
}
