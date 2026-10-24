import { EllipsisVertical, Plus } from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
} from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListParams } from "@/hooks/useListParams";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { NewAmenityModal } from "../amenities/components/NewAmenityModal";
import { CreateRoomDialog } from "../rooms/components/CreateRoomDialog";
import { UpdateRoomDialog } from "../rooms/components/UpdateRoomDialog";
import { ViewRoomDialog } from "../rooms/components/ViewRoomDialog";
import { useDeleteRoom } from "../rooms/hooks/useDeleteRoom";
import { useRooms } from "../rooms/hooks/useRooms";
import type { Room } from "../rooms/rooms.types";
import { CreateRoomTypeDialog } from "../roomTypes/components/CreateRoomTypeDialog";
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
    <Tabs defaultValue="rooms" className="w-full">
      <TabsList variant="line" className="mb-4 rounded-none bg-muted">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`rounded-none p-4 ${activeTab === tab.value ? "bg-primary! text-primary-foreground!" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
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
    { key: "floor", header: "Floor" },
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

  const { setSearch, setPage, params } = useListParams();
  const { items, pagination } = useRooms(params);

  return (
    <>
      <DataTable
        title="Rooms"
        description="Manage rooms."
        data={items}
        columns={columns}
        pagination={pagination}
        onPageChange={setPage}
        onSearchChange={setSearch}
        errorMessage="Something went wrong while loading customers."
        emptyMessage="Please add customers to your hotel."
      />
    </>
  );
}

export function ManagementRooms() {
  return (
    <>
      <RoomsStats />
      <div className="flex flex-wrap items-center gap-4 rounded-none border border-muted bg-card p-6">
        <CreateRoomDialog>
          <Button className="h-10 rounded-none">
            <Plus className="size-4" />
            New Room
          </Button>
        </CreateRoomDialog>
        <CreateRoomTypeDialog>
          <Button className="h-10 rounded-none" variant={"outline"}>
            <Plus className="size-4" />
            New Room Type
          </Button>
        </CreateRoomTypeDialog>
        <NewAmenityModal>
          <Button className="h-10 rounded-none" variant={"secondary"}>
            <Plus className="size-4" />
            New Amenity
          </Button>
        </NewAmenityModal>
      </div>
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

        <DropdownMenuContent
          align="end"
          className="rounded-none **:data-[slot=dropdown-menu-item]:rounded-none"
        >
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
