import { createCrud } from "@/lib/crud/createCrud";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import {
  adminCreateIssueSchema,
  customerCreateIssueSchema,
} from "./schemas/issue.schema";
import type { CustomerIssue } from "./issues.types";

type Issues = CustomerIssue | undefined;

export const issuesCrud = createCrud<Issues, undefined>()({
  resource: "issues",
  endpoint: "issues",
  label: "Issue",
  createSchema: customerCreateIssueSchema || adminCreateIssueSchema,
  updateSchema: adminCreateIssueSchema,
});

export const {
  useList: useIssues,
  useStats: useIssuesStats,
  useCreate: useCreateIssueCrud,
  useUpdate: useUpdateIssue,
  useDelete: useDeleteIssue,
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
