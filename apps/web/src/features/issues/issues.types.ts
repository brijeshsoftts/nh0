import type {
  IssueCategory,
  IssuePriority,
  IssueStatus,
} from "@/types/enum.types";

export type IssueItem = {
  id: string;
  reference: string;
  title: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  room?: {
    id: string;
    roomNumber: string;
  };
  reporter?: {
    id: string;
    fullName: string;
  };
  assignee?: {
    id: string;
    fullName: string;
  };
  reportedAt: string;
};
