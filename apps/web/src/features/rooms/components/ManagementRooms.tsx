import { Bath, BedDouble, Layers, Plus } from "lucide-react";

import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
  StatusBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListParams } from "@/hooks/useListParams";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { CreateRoomDialog } from "../rooms/components/CreateRoomDialog";
import { useRooms } from "../rooms/hooks/useRooms";
import type { Room } from "../rooms/rooms.types";
import { RoomTypeGrid } from "../roomTypes/components/RoomTypeGrid";

import { RoomActionDropdownMenu } from "./RoomActionDropdownMenu";
import { RoomsStats } from "./RoomsStats";

const tabs = [
  {
    name: "Rooms",
    value: "rooms",
    icon: BedDouble,
    content: (
      <>
        <RoomTable />
      </>
    ),
  },
  {
    name: "Rooms Types",
    value: "roomsTypes",
    icon: Layers,
    content: (
      <>
        <RoomTypeGrid />
      </>
    ),
  },
  {
    name: "Amenities",
    value: "amenities",
    icon: Bath,
    content: (
      <>
        <AmenityGrid />
      </>
    ),
  },
];

export function TabsLine() {
  return (
    <div className="w-full text-card-foreground">
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="mb-0 flex h-auto w-full gap-1 rounded-3xl border border-primary/15 bg-card p-1 shadow-sm group-data-horizontal/tabs:h-auto sm:gap-2">
          {tabs.map(({ name, value, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="max-h-10 min-w-0 flex-1 gap-2 rounded-2xl px-2 py-3 text-xs font-semibold text-foreground/80 transition-colors hover:bg-muted/60 sm:gap-3 sm:px-4 sm:text-sm md:text-base data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
            >
              <Icon className="size-4 shrink-0 sm:size-5" aria-hidden="true" />
              <span className="truncate">{name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-2">
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
        <span className="">
          <OccupancyBadge value={item.occupancyStatus} />
        </span>
      ),
    },
    {
      key: "housekeeping",
      header: "Housekeeping",
      cell: (item) => (
        <span className="">
          <HousekeepingBadge value={item.housekeepingStatus} />
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      cell: (item) => (
        <span className="">
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

  const { setSearch, setPage, params, setFilter } = useListParams();
  const { items, pagination, isLoading, isError, refetch } = useRooms(params);
  const occupancy = ["VACANT", "RESERVED", "OCCUPIED", "OUT_OF_ORDER"];
  const housekeeping = ["CLEAN", "DIRTY", "CLEANING"];

  return (
    <>
      <DataTable
        title="Rooms"
        description="Manage rooms and bookings."
        headerActions={
          <CreateRoomDialog>
            <Button className="h-10">
              <Plus className="size-4" />
              New Room
            </Button>
          </CreateRoomDialog>
        }
        data={items}
        columns={columns}
        searchPlaceholder="Search rooms..."
        onSearchChange={(value) => {
          setSearch(value);
        }}
        filters={[
          {
            key: "isActive",
            label: "Status",
            options: [
              {
                label: "Active",
                value: true,
              },
              {
                label: "Inactive",
                value: false,
              },
            ],
          },

          {
            key: "occupancyStatus",
            label: "Occupancy",
            options: occupancy.map((status) => ({
              label: status,
              value: status,
            })),
          },
          {
            key: "housekeepingStatus",
            label: "Housekeeping",
            options: housekeeping.map((status) => ({
              label: status,
              value: status,
            })),
          },
        ]}
        onFilterChange={(key, value) => {
          setFilter({ [key]: value });
        }}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        onPageChange={setPage}
        pagination={pagination}
        errorMessage="Could not load rooms. Please try again."
        emptyMessage="No rooms match your search."
        showPagination
      />
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
