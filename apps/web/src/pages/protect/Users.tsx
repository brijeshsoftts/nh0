import { Plus } from "lucide-react";

import { Header } from "@/components/common/Header";
import { HeaderActionButton } from "@/components/common/HeaderActionButton";
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { UsersStats } from "@/features/users/components/UsersStats";
import { UserTable } from "@/features/users/components/UserTable";

export default function UsersPage() {
  return (
    <>
      <Header
        title="Users"
        description="Manage users"
        rightContent={
          <CreateUserDialog>
            <HeaderActionButton id="btn-add-user">
              <Plus />
              <span>New User</span>
            </HeaderActionButton>
          </CreateUserDialog>
        }
      />
      <UsersStats />
      <UserTable />
    </>
  );
}
