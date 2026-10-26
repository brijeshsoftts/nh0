import { EllipsisVertical, Eye, Flag, Pencil, RefreshCw } from "lucide-react";
import { useState } from "react";

import { IconBtn } from "@/components/common/IconBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

import type { IssueItem } from "../issues.types";

import { IssueDetailsSheet } from "./IssueDetailsSheet";
import { IssueUpdateDialog } from "./IssueUpdateDialog";

type ActionIssue = Pick<
  IssueItem,
  "id" | "title" | "category" | "priority" | "status" | "reportedAt"
> &
  Partial<Pick<IssueItem, "reference">>;
type UpdateMode = "edit" | "priority" | "status";

export function IssueRowActions({ issue }: { issue: ActionIssue }) {
  const { user } = useAuth();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState<UpdateMode | null>(null);
  const canManage = user?.role === "ADMIN" || user?.role === "MANAGER";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for ${issue.reference || issue.title}`}
          >
            <EllipsisVertical aria-hidden="true" />
          </IconBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye aria-hidden="true" />
            View Details
          </DropdownMenuItem>
          {canManage && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUpdateMode("edit")}>
                <Pencil aria-hidden="true" />
                Edit Issue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUpdateMode("priority")}>
                <Flag aria-hidden="true" />
                Set Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUpdateMode("status")}>
                <RefreshCw aria-hidden="true" />
                Update Status
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {detailsOpen && (
        <IssueDetailsSheet
          issueId={issue.id}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      )}
      {updateMode && (
        <IssueUpdateDialog
          issueId={issue.id}
          mode={updateMode}
          open={updateMode !== null}
          onOpenChange={(open) => {
            if (!open) setUpdateMode(null);
          }}
        />
      )}
    </>
  );
}
