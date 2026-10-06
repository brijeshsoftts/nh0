import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AmenityGrid } from "../amenities/components/AmenityGrid";
import { RoomTypeGrid } from "../roomTypes/components/RoomTypeGrid";

const tabs = [
  {
    name: "Rooms",
    value: "rooms",
    content: (
      <>
        <span className="font-semibold text-foreground">Rooms</span>
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
