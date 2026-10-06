import { Plus } from "lucide-react";

import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";

import { NewAmenityModal } from "../amenities/components/NewAmenityModal";
import { ROOMS_STAT } from "../rooms/rooms.mock";
import { CreateRoomTypeDialog } from "../roomTypes/components/CreateRoomTypeDialog";

import { TabList } from "./TabList";

export function ManagementRooms() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS_STAT?.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>
      <div className="flex items-center gap-6 rounded-md border border-muted bg-card p-6">
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
