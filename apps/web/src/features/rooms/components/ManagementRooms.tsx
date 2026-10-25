import {
  AlertCircle,
  EllipsisVertical,
  Inbox,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

import { type ColumnDef } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
} from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListParams } from "@/hooks/useListParams";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { CreateRoomDialog } from "../rooms/components/CreateRoomDialog";
import { UpdateRoomDialog } from "../rooms/components/UpdateRoomDialog";
import { ViewRoomDialog } from "../rooms/components/ViewRoomDialog";
import { useDeleteRoom } from "../rooms/hooks/useDeleteRoom";
import { useRooms } from "../rooms/hooks/useRooms";
import type { Room } from "../rooms/rooms.types";
import { RoomTypeGrid } from "../roomTypes/components/RoomTypeGrid";

import { RoomsStats } from "./RoomsStats";

const tabs = [
  {
    name: "Rooms",
    value: "rooms",
    content: (
      <>
        <RoomTable />
      </>
    ),
  },
  {
    name: "Rooms Types",
    value: "roomsTypes",
    content: (
      <>
        <RoomTypeGrid />
      </>
    ),
  },
  {
    name: "Amenities",
    value: "amenities",
    content: (
      <>
        <AmenityGrid />
      </>
    ),
  },
];

export function TabsLine() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  return (
    <div className="w-full overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-sm">
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList
          variant="line"
          className="mb-0 flex h-auto w-full justify-start rounded-none border-b border-border bg-muted/40 p-0"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`min-h-12 rounded-none px-5 py-3 text-sm ${activeTab === tab.value ? "bg-primary! text-primary-foreground!" : ""}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function RoomTable() {
  const columns: ColumnDef<Room>[] = [
    {
      key: "room",
      header: "Room",
      cell: (item) => (
        <div>
          <p>{item.name}</p>
          <p className="text-sm text-muted-foreground">#{item.roomNumber}</p>
        </div>
      ),
    },

    {
      key: "roomType",
      header: "Room Type",
      cell: (item) => item.roomType.name,
    },
    {
      key: "floor",
      header: "Floor",
      cell: (item) => item.floor,
    },
    {
      key: "occupancy",
      header: "Occupancy",
      cell: (item) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <OccupancyBadge value={item.occupancyStatus} />
        </span>
      ),
    },
    {
      key: "housekeeping",
      header: "Housekeeping",
      cell: (item) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <HousekeepingBadge value={item.housekeepingStatus} />
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      cell: (item) => (
        <span className="**:data-[slot=badge]:rounded-none">
          <StatusBadge value={item.isActive} />
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      cell: (row) => <RoomActionDropdownMenu room={row} />,
    },
  ];

  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useRooms({
    ...params,
    search: searchInput,
  });

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Rooms</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Manage rooms. {pagination?.total ?? items.length} total
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search rooms..."
              aria-label="Search rooms"
              className="h-10 rounded-none pl-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CreateRoomDialog>
              <Button className="h-10 rounded-none">
                <Plus className="size-4" />
                New Room
              </Button>
            </CreateRoomDialog>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-full text-left text-xs whitespace-nowrap">
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="px-4 py-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex h-40 items-center justify-center">
                    <Spinner className="size-7" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="size-6" />
                    <p className="text-sm font-medium">
                      Rooms could not be loaded.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-1 rounded-none"
                      onClick={() => void refetch()}
                    >
                      Try again
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Inbox className="size-6" />
                    <p className="text-sm font-medium">
                      {searchInput
                        ? "No rooms match your search."
                        : "No rooms added yet. Click ‘New Room’ to get started."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((room) => (
                <TableRow key={room.id} className="border-b border-border/65">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="px-4 py-4 text-sm">
                      {column.cell?.(room)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination pagination={pagination} onPageChange={setPage} />
    </>
  );
}

export function ManagementRooms() {
  return (
    <>
      <RoomsStats />
      <TabsLine />
    </>
  );
}

function RoomActionDropdownMenu({ room }: { room: Room }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteRoom();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn size={"sm"} variant={"ghost"} shape="square">
            <EllipsisVertical />
          </IconBtn>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsViewModal(true)}
            disabled={isDeleting}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsUpdateModal(true)}
            disabled={isDeleting}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"text-destructive"}
            onClick={() => handleDelete(room.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isUpdateModal && (
        <UpdateRoomDialog
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          room={room}
        />
      )}
      {isViewModal && (
        <ViewRoomDialog
          open={isViewModal}
          onOpenChange={setIsViewModal}
          room={room}
        />
      )}
    </>
  );
}
