import { type ColumnDef, DataTable } from "@/components/common/DataTable";
import {
  HousekeepingBadge,
  OccupancyBadge,
} from "@/components/common/EnumBadges";
import { useListParams } from "@/hooks/useListParams";

import { useRooms } from "../rooms.crud";
import type { HousekeeperRoom } from "../types";

import { HouseKeeperRoomDetails } from "./HouseKeeperRoomDetails";
import { RoomsStats } from "./RoomsStats";

const columns: ColumnDef<HousekeeperRoom>[] = [
  {
    key: "roomNumber",
    header: "Room",
    className: "min-w-28",
    cell: (room) => <span className="font-medium">{room.roomNumber}</span>,
  },
  {
    key: "floor",
    header: "Floor",
    cell: (room) => room.floor,
  },
  {
    key: "roomType",
    header: "Room Type",
    className: "min-w-36",
    cell: (room) => <span className="font-medium">{room.roomType.name}</span>,
  },
  {
    key: "occupancyStatus",
    header: "Occupancy",
    className: "min-w-32",
    cell: (room) => <OccupancyBadge value={room.occupancyStatus} />,
  },
  {
    key: "housekeepingStatus",
    header: "Housekeeping Status",
    className: "min-w-44",
    cell: (room) => <HousekeepingBadge value={room.housekeepingStatus} />,
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-20",
    cell: (room) => <HouseKeeperRoomDetails roomId={room.id} />,
  },
];

function HouseKeeperRoomsTable() {
  const { searchInput, setSearch, setPage, params } = useListParams();
  const { items, pagination, isLoading, isError, refetch } =
    useRooms<HousekeeperRoom>({
      search: searchInput,
      page: params.page,
      limit: 10,
    });

  return (
    <DataTable
      title="Rooms"
      description="Manage rooms."
      data={items}
      columns={columns}
      searchPlaceholder="Search room number..."
      searchableKeys={[
        "roomNumber",
        "roomType",
        "occupancyStatus",
        "housekeepingStatus",
      ]}
      onSearchChange={setSearch}
      onPageChange={setPage}
      pagination={pagination}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      errorMessage="Could not load rooms. Please try again."
      emptyMessage="No rooms match your search or filters."
      showPagination
    />
  );
}

export function HouseKeeperRooms() {
  return (
    <>
      <RoomsStats />
      <HouseKeeperRoomsTable />
    </>
  );
}
