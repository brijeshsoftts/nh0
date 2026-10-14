import { Braces, Check, Clipboard, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  type ColumnDef,
  DataTable,
  type FilterOption,
} from "@/components/common/DataTable";
import { Header } from "@/components/common/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAuditLogs } from "@/features/auditLog/auditLog.crud";
import type { AuditLog, JsonValue } from "@/features/auditLog/auditLog.types";
import { useDebounce } from "@/hooks/useDebounce";

const ENTITY_TYPE_OPTIONS: FilterOption[] = [
  { label: "Amenity", value: "Amenity" },
  { label: "Booking", value: "Booking" },
  { label: "Customer", value: "Customer" },
  { label: "Housekeeping task", value: "HousekeepingTask" },
  { label: "Invoice", value: "Invoice" },
  { label: "Issue", value: "Issue" },
  { label: "Payment", value: "Payment" },
  { label: "Room", value: "Room" },
  { label: "Room type", value: "RoomType" },
  { label: "Staff", value: "Staff" },
  { label: "User", value: "User" },
];

function formatValue(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function countFields(value: JsonValue) {
  if (value === null) return 0;
  if (Array.isArray(value)) return value.length;
  if (typeof value === "object") return Object.keys(value).length;
  return 1;
}

function changesCount(log: AuditLog) {
  return Math.max(countFields(log.oldValues), countFields(log.newValues));
}

function JsonValuePanel({ title, value }: { title: string; value: JsonValue }) {
  const formattedValue = JSON.stringify(value, null, 2) ?? "null";
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(formattedValue);
      setCopied(true);
      toast.success(`${title} copied.`);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy JSON to the clipboard.");
    }
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-md border border-border bg-muted/30">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <h3 className="text-xs font-semibold text-foreground">{title}</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Copy ${title.toLowerCase()} JSON`}
          title="Copy JSON"
          onClick={() => void copyValue()}
        >
          {copied ? <Check /> : <Clipboard />}
        </Button>
      </div>
      <pre className="max-h-96 overflow-auto p-3 font-mono text-xs leading-5 wrap-break-word whitespace-pre-wrap text-foreground">
        {formattedValue}
      </pre>
    </section>
  );
}

function actionVariant(action: string) {
  if (/delete|remove/i.test(action)) return "destructive" as const;
  if (/create|add/i.test(action)) return "secondary" as const;
  return "outline" as const;
}

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const debouncedSearch = useDebounce(search, 350);

  const { items, pagination, isLoading, isError, refetch } = useAuditLogs({
    search: debouncedSearch || undefined,
    entityType: entityType || undefined,
    page,
    limit: 20,
  });

  const columns: ColumnDef<AuditLog>[] = [
    {
      key: "createdAt",
      header: "Time",
      className: "w-52",
      cell: (log) => (
        <time
          dateTime={log.createdAt}
          title={formatTimestamp(log.createdAt)}
          className="text-xs text-muted-foreground"
        >
          {formatTimestamp(log.createdAt)}
        </time>
      ),
    },
    {
      key: "actor",
      header: "Actor",
      className: "w-52",
      cell: (log) =>
        log.user ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {log.user.fullName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {log.user.email}
            </p>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">System</span>
        ),
    },
    {
      key: "action",
      header: "Action",
      className: "w-48",
      cell: (log) => (
        <Badge variant={actionVariant(log.action)}>
          {formatValue(log.action)}
        </Badge>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      cell: (log) => (
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            {formatValue(log.entityType)}
          </p>
          <p className="max-w-56 truncate font-mono text-xs text-muted-foreground">
            {log.entityId ?? "No entity ID"}
          </p>
        </div>
      ),
    },
    {
      key: "changes",
      header: "Changes",
      align: "right",
      className: "w-36",
      cell: (log) => (
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Braces aria-hidden="true" className="size-4" />
          {changesCount(log)} fields
        </span>
      ),
    },
  ];

  return (
    <>
      <Header
        title="Audit log"
        description="Review account activity and inspect recorded changes."
        rightContent={
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => void refetch()}
          >
            {isLoading ? <Spinner /> : <RefreshCw />}
            Refresh
          </Button>
        }
      />

      <DataTable
        title="Audit events"
        description={`${pagination?.total ?? 0} recorded events`}
        data={items}
        pagination={pagination}
        columns={columns}
        filters={[
          {
            key: "entityType",
            label: "entities",
            options: ENTITY_TYPE_OPTIONS,
            placeholder: "Filter entities",
          },
        ]}
        defaultPageSize={20}
        searchPlaceholder="Search actions, entities, or users..."
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onFilterChange={(key, value) => {
          if (key !== "entityType") return;
          setEntityType(value);
          setPage(1);
        }}
        onPageChange={setPage}
        onRowClick={setSelectedLog}
        refetch={() => void refetch()}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Audit events could not be loaded."
        emptyMessage="No audit events match these filters."
      />

      <Dialog
        open={selectedLog !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedLog(null);
        }}
      >
        {selectedLog ? (
          <DialogContent className="max-h-[calc(100vh-2rem)] max-w-5xl overflow-y-auto sm:max-w-5xl">
            <DialogHeader className="pr-8">
              <DialogTitle className="flex flex-wrap items-center gap-2">
                <span>{formatValue(selectedLog.action)}</span>
                <Badge variant="outline">
                  {formatValue(selectedLog.entityType)}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                {formatTimestamp(selectedLog.createdAt)}
                {selectedLog.entityId ? ` · ${selectedLog.entityId}` : ""}
                {selectedLog.user
                  ? ` · ${selectedLog.user.fullName}`
                  : " · System"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <JsonValuePanel
                title="Previous values"
                value={selectedLog.oldValues}
              />
              <JsonValuePanel
                title="New values"
                value={selectedLog.newValues}
              />
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
