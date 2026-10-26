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

// CUSTOMER TYPES
export interface CustomerIssue {
  id: string;
  title: string;
  category: IssueCategory;
  reportedAt: string;
  status: IssueStatus;
  priority: IssuePriority;
}

export type IssueDetails = {
  id: string;
  reference: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  reportedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  room: {
    id: string;
    roomNumber: string;
    name: string | null;
    floor: number;
  };
  reporter: {
    id: string;
    fullName: string;
  };
  assignee: {
    id: string;
    fullName: string;
  } | null;
  image: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};
