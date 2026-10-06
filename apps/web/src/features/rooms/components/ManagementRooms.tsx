import { useState } from "react";

import { StatCard } from "@/components/common/StatCard";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { ROOMS_STAT } from "../rooms/rooms.mock";
import { RoomTypeGrid } from "../roomTypes/components/RoomTypeGrid";

import { TabList } from "./TabList";

export function ManagementRooms() {
  const [activeTab, setActiveTab] = useState("rooms");

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS_STAT?.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>

      <TabList value={activeTab} onValueChange={setActiveTab} />

      {activeTab === "room-types" && <RoomTypeGrid />}
      {activeTab === "amenities" && <AmenityGrid />}
    </>
  );
}
