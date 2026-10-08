import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/format";

export const DropdownProfile = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { user } = useAuth();
  const { isLoading, handleLogout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"cursor-pointer"}
        render={
          children ? (
            <>{children} </>
          ) : (
            <Avatar>
              {user?.avatar?.url ? (
                <AvatarImage src={user?.avatar?.url} alt={user?.fullName} />
              ) : (
                <AvatarFallback className={"bg-primary text-background"}>
                  {getInitials(user?.fullName)}
                </AvatarFallback>
              )}
            </Avatar>
          )
        }
      />
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar>
              {user?.avatar?.url ? (
                <AvatarImage src={user?.avatar?.url} alt={user?.fullName} />
              ) : (
                <AvatarFallback className={"bg-primary text-background"}>
                  {getInitials(user?.fullName)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-popover-foreground">{user?.fullName}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/dashboard/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isLoading}
            onClick={handleLogout}
            className={"cursor-pointer"}
          >
            Logout
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/" className="w-full">
              Back to Home
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
