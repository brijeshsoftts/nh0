import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { createCrud } from "@/lib/crud/createCrud";

import {
  adminUpdateIssueSchema,
  customerCreateIssueSchema,
} from "./schemas/issue.schema";
import type { IssueDetails } from "./issues.types";

type Issues = IssueDetails;

export const issuesCrud = createCrud<Issues, undefined>()({
  resource: "issues",
  endpoint: "/issues",
  label: "Issue",
  createSchema: customerCreateIssueSchema,
  updateSchema: adminUpdateIssueSchema,
});

export const {
  useList: useIssues,
  useDetail: useIssue,
  useCreate: useCreateIssueCrud,
  useUpdate: useUpdateIssue,
  useDelete: useDeleteIssue,
  useStats: useIssueStats,
} = issuesCrud;

type CustomerCreateIssueInput = z.input<typeof customerCreateIssueSchema>;
type CustomerCreateIssueOutput = z.output<typeof customerCreateIssueSchema>;

export function useCreateIssue(
  options?: Parameters<typeof useCreateIssueCrud>[0]
) {
  const result = useCreateIssueCrud(options);

  return {
    ...result,
    form: result.form as unknown as UseFormReturn<
      CustomerCreateIssueInput,
      unknown,
      CustomerCreateIssueOutput
    >,
  };
}
