import { Plus } from "lucide-react";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { UserTable } from "@/features/users/components/UserTable";

export default function UsersPage() {
  return (
    <>
      <Header
        title="Users"
        description="Manage users"
        rightContent={
          <CreateUserDialog>
            <Button
              id="btn-add-user"
              variant="default"
              size="sm"
              className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New User</span>
            </Button>
          </CreateUserDialog>
        }
      />
      <UserTable />
    </>
  );
}
