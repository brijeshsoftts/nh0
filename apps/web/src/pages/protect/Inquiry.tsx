import { EllipsisVertical, Eye, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import { Header } from "@/components/common/Header";
import { IconBtn } from "@/components/common/IconBtn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteInquiry } from "@/features/public/hooks/useDeleteInquiry";
import { useInquiries } from "@/features/public/hooks/useInquiries";
import type { Inquiry } from "@/features/public/public.types";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatSubject(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function InquiryPage() {
  const { user } = useAuth();
  const canViewInquiries = user?.role === "ADMIN" || user?.role === "MANAGER";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 350);
  const { inquiries, pagination, isLoading, isFetching, isError, refetch } =
    useInquiries(
      { search: debouncedSearch || undefined, page, limit: 20 },
      canViewInquiries
    );

  if (!canViewInquiries) {
    return <Navigate to="/dashboard" replace />;
  }

  const columns: ColumnDef<Inquiry>[] = [
    {
      key: "createdAt",
      header: "Submitted",
      className: "w-48",
      cell: (inquiry) => (
        <time
          dateTime={inquiry.createdAt}
          title={formatTimestamp(inquiry.createdAt)}
          className="text-xs text-muted-foreground"
        >
          {formatTimestamp(inquiry.createdAt)}
        </time>
      ),
    },
    {
      key: "fullName",
      header: "Contact",
      className: "w-56",
      cell: (inquiry) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {inquiry.fullName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {inquiry.email}
          </p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      className: "w-36",
      cell: (inquiry) => inquiry.phone || "-",
    },
    {
      key: "subject",
      header: "Subject",
      className: "w-40",
      cell: (inquiry) => formatSubject(inquiry.subject),
    },
    {
      key: "message",
      header: "Message",
      className: "min-w-72",
      cell: (inquiry) => (
        <p className="max-w-xl text-sm whitespace-normal text-muted-foreground">
          {inquiry.message || "-"}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (inquiry) => <ActionDropdownMenu inquiry={inquiry} />,
    },
  ];

  return (
    <>
      <Header
        title="Inquiries"
        description="Review messages sent through the contact form."
        rightContent={
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            {isFetching ? <Spinner /> : <RefreshCw />}
            Refresh
          </Button>
        }
      />

      <DataTable
        title="Contact inquiries"
        description={`${pagination?.total ?? 0} total inquiries`}
        data={inquiries}
        pagination={pagination}
        columns={columns}
        defaultPageSize={20}
        searchPlaceholder="Search name, email, phone, subject, or message..."
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onPageChange={setPage}
        refetch={() => void refetch()}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Inquiries could not be loaded."
        emptyMessage="No inquiries match this search."
      />
    </>
  );
}

function ActionDropdownMenu({ inquiry }: { inquiry: Inquiry }) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { handleDelete, isDeleting } = useDeleteInquiry(inquiry.id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            size="sm"
            variant="ghost"
            shape="square"
            aria-label={`Actions for inquiry from ${inquiry.fullName}`}
          >
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className=" "
        >
          <DropdownMenuItem onClick={() => setIsViewOpen(true)}>
            <Eye className="mr-2 size-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-h-[min(90vh,48rem)] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Inquiry from {inquiry.fullName}</DialogTitle>
            <DialogDescription>
              Submitted {formatTimestamp(inquiry.createdAt)}
            </DialogDescription>
          </DialogHeader>

          <dl className="grid gap-x-6 gap-y-4 border-y py-4 sm:grid-cols-2">
            <div className="min-w-0 space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">
                Email
              </dt>
              <dd className="text-sm break-all text-foreground">
                {inquiry.email}
              </dd>
            </div>
            <div className="min-w-0 space-y-1">
              <dt className="text-xs font-medium text-muted-foreground">
                Phone
              </dt>
              <dd className="text-sm break-words text-foreground">
                {inquiry.phone || "Not provided"}
              </dd>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <dt className="text-xs font-medium text-muted-foreground">
                Subject
              </dt>
              <dd className="text-sm text-foreground">
                {formatSubject(inquiry.subject)}
              </dd>
            </div>
          </dl>

          <section className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">
              Message
            </h3>
            <p className="max-h-72 overflow-y-auto rounded-md border bg-muted/30 p-4 text-sm leading-6 wrap-break-word whitespace-pre-wrap text-foreground">
              {inquiry.message || "No message provided."}
            </p>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
