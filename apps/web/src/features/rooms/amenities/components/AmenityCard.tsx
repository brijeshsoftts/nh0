import { motion } from "framer-motion";
import { CircleCheck, CircleX, Pencil, Sparkles, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { icons } from "@/constants/icons";
import { formatString } from "@/lib/format";

import type { Amenity } from "../amenities.types";
import { useDeleteAmenity } from "../hooks/useDeleteAmenity";

import { UpdateAmenityModal } from "./UpdateAmenityModal";

interface AmenityCardProps {
  amenity: Amenity;
}
export function AmenityCard({ amenity }: AmenityCardProps) {
  const { icon } = amenity;
  const Icon = icons[icon] || Sparkles;
  const { handleDelete, isPending } = useDeleteAmenity(amenity.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-border/60 bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
        {/* Subtle hover accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:border-border group-hover:bg-muted group-hover:text-foreground">
              {amenity?.icon && <Icon />}
            </div>
            {/* Status */}
            <Badge
              variant={amenity.isActive ? "secondary" : "outline"}
              className="gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            >
              {amenity.isActive ? (
                <>
                  <CircleCheck className="size-3" /> Active
                </>
              ) : (
                <>
                  <CircleX className="size-3" /> Inactive
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-3">
          {/* Category */}
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {formatString(amenity.category)}
          </p>
          {/* Name */}
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-foreground">
            {amenity.name}
          </h3>
          {/* Description */}
          <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {amenity.description || "No description provided."}
          </p>
        </CardContent>

        {/* Actions */}
        <CardFooter className="grid grid-cols-2 gap-2 pt-4">
          <UpdateAmenityModal amenity={amenity}>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              disabled={isPending}
            >
              <Pencil className="size-3.5" /> Edit
            </Button>
          </UpdateAmenityModal>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="size-3.5" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
