import { EllipsisVertical, Plus } from "lucide-react";
import { useState } from "react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
} from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { NewAmenityModal } from "../amenities/components/NewAmenityModal";
import { CreateRoomDialog } from "../rooms/components/CreateRoomDialog";
import { UpdateRoomDialog } from "../rooms/components/UpdateRoomDialog";
import { ViewRoomDialog } from "../rooms/components/ViewRoomDialog";
import { useDeleteRoom } from "../rooms/hooks/useDeleteRoom";
import { rooms, ROOMS_STAT } from "../rooms/rooms.mock";
import type { Room } from "../rooms/rooms.types";
import { CreateRoomTypeDialog } from "../roomTypes/components/CreateRoomTypeDialog";
import { RoomTypeGrid } from "../roomTypes/components/RoomTypeGrid";

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

export const TabList = () => {
  return (
    <div>
      <Tabs defaultValue="explore" className="gap-6">
        <TabsList className="justify-start rounded-none border-b bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-transparent! shadow-none! data-active:-mb-0.75 data-active:rounded-b-none data-active:border-b-2 data-active:border-border data-active:border-b-background!"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={"grid gap-6"}
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

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
      cell: (item) => <OccupancyBadge value={item.occupancyStatus} />,
    },
    {
      key: "housekeeping",
      header: "Housekeeping",
      cell: (item) => <HousekeepingBadge value={item.housekeepingStatus} />,
    },
    {
      key: "isActive",
      header: "Status",
      cell: (item) => <StatusBadge value={item.isActive} />,
    },
    {
      header: "Action",
      key: "action",
      cell: (row) => <RoomActionDropdownMenu room={row} />,
    },
  ];

  return (
    <>
      <DataTable
        title="Rooms"
        description="Manage rooms."
        data={rooms}
        columns={columns}
        errorMessage="Something went wrong while loading customers."
        emptyMessage="Please add customers to your hotel."
      />
    </>
  );
}

export function ManagementRooms() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS_STAT?.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>
      <div className="flex items-center gap-6 rounded-md border border-muted bg-card p-6">
        <CreateRoomDialog>
          <Button>
            <Plus className="size-4" />
            New Room
          </Button>
        </CreateRoomDialog>
        <CreateRoomTypeDialog>
          <Button>
            <Plus className="size-4" />
            New Room Type
          </Button>
        </CreateRoomTypeDialog>
        <NewAmenityModal>
          <Button>
            <Plus className="size-4" />
            New Amenity
          </Button>
        </NewAmenityModal>
      </div>
      <TabList />
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
          <IconBtn size={"sm"} variant={"ghost"}>
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
