import { Plus } from "lucide-react";
import { useState } from "react";

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
            <Button className="h-10 rounded-none">
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
