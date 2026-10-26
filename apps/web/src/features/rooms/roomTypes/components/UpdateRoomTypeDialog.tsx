import { zodResolver } from "@hookform/resolvers/zod";
import { BedDouble, Check, Loader2, Star, Trash2, Upload } from "lucide-react";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";

import { InputField } from "@/components/common/InputField";
import {
  SelectField,
  type SelectOption,
} from "@/components/common/SelectField";
import { TextareaField } from "@/components/common/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useAmenities } from "../../amenities/hooks/useAmenities";
import { useRoomType } from "../hooks/useRoomType";
import { useUpdateRoomType } from "../hooks/useUpdateRoomType";
import { BED_TYPES, MAX_IMAGES } from "../schemas/createRoomType.schema";
import {
  type UpdateRoomTypeForm,
  type UpdateRoomTypeFormOutput,
  UpdateRoomTypeFormSchema,
} from "../schemas/updateRoomType.schema";

interface NewImage {
  id: string;
  file: File;
  preview: string;
}

interface UpdateRoomTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: { id: string; slug: string; name: string };
}

const BED_TYPE_OPTIONS: SelectOption[] = BED_TYPES.map((bedType) => ({
  id: bedType,
  name: bedType
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase()),
}));

export function UpdateRoomTypeDialog({
  open,
  onOpenChange,
  roomType: roomTypeSummary,
}: UpdateRoomTypeDialogProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const initializedForOpen = React.useRef(false);
  const newImagesRef = React.useRef<NewImage[]>([]);
  const { roomType, isLoading, isError, refetch } = useRoomType(
    open ? roomTypeSummary.slug : ""
  );
  const updateMutation = useUpdateRoomType(roomTypeSummary.id);
  const { items: amenities, isLoading: isAmenitiesLoading } = useAmenities({
    limit: 50,
  });
  const [removedImageIds, setRemovedImageIds] = React.useState<string[]>([]);
  const [newImages, setNewImages] = React.useState<NewImage[]>([]);
  const [primaryImageKey, setPrimaryImageKey] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");

  const form = useForm<UpdateRoomTypeForm, unknown, UpdateRoomTypeFormOutput>({
    resolver: zodResolver(UpdateRoomTypeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      sizeSqFt: undefined,
      maxGuests: 1,
      adults: 1,
      children: 0,
      basePrice: 1,
      currency: "INR",
      bedType: undefined,
      bedCount: 1,
      smokingAllowed: false,
      petsAllowed: false,
      isActive: true,
      amenities: [],
      images: [],
    },
    mode: "onBlur",
  });

  const selectedAmenities = useWatch({
    control: form.control,
    name: "amenities",
  });
  const smokingAllowed = useWatch({
    control: form.control,
    name: "smokingAllowed",
  });
  const petsAllowed = useWatch({ control: form.control, name: "petsAllowed" });
  const isActive = useWatch({ control: form.control, name: "isActive" });
  const retainedImages =
    roomType?.images.filter((image) => !removedImageIds.includes(image.id)) ??
    [];
  const imageCount = retainedImages.length + newImages.length;
  const selectedPrimaryImageKey =
    primaryImageKey ||
    roomType?.images.find((image) => image.isPrimary)?.id ||
    roomType?.images[0]?.id ||
    "";

  React.useEffect(() => {
    newImagesRef.current = newImages;
  }, [newImages]);

  React.useEffect(() => {
    if (!open) {
      initializedForOpen.current = false;
      return;
    }

    if (!roomType || initializedForOpen.current) return;

    const hasMissingAmenityIds = roomType.amenities.some(
      (amenity) => typeof amenity.id !== "string" || amenity.id.length === 0
    );
    if (hasMissingAmenityIds && isAmenitiesLoading) return;

    const amenityIds = roomType.amenities
      .map((amenity) => {
        if (typeof amenity.id === "string" && amenity.id.length > 0) {
          return amenity.id;
        }

        return amenities.find((option) => option.name === amenity.name)?.id;
      })
      .filter((id): id is string => typeof id === "string" && id.length > 0);

    form.reset({
      name: roomType.name,
      description: roomType.description ?? "",
      sizeSqFt: roomType.sizeSqFt ?? undefined,
      maxGuests: roomType.maxGuests,
      adults: roomType.adults,
      children: roomType.children,
      basePrice: roomType.basePrice,
      currency: roomType.currency,
      bedType: roomType.bedType,
      bedCount: roomType.bedCount,
      smokingAllowed: roomType.smokingAllowed,
      petsAllowed: roomType.petsAllowed,
      isActive: roomType.isActive,
      amenities: amenityIds,
      images: [],
    });
    initializedForOpen.current = true;
  }, [amenities, form, isAmenitiesLoading, open, roomType]);

  React.useEffect(
    () => () => {
      newImagesRef.current.forEach((image) =>
        URL.revokeObjectURL(image.preview)
      );
    },
    []
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      newImages.forEach((image) => URL.revokeObjectURL(image.preview));
      setRemovedImageIds([]);
      setNewImages([]);
      setPrimaryImageKey("");
      setImageError("");
      setSubmitError("");
      form.reset();
      initializedForOpen.current = false;
    }
    onOpenChange(nextOpen);
  };

  const addImages = (files: FileList | null) => {
    if (!files?.length) return;
    const selectedFiles = Array.from(files);

    if (imageCount + selectedFiles.length > MAX_IMAGES) {
      const message = `A room type can have at most ${MAX_IMAGES} images.`;
      setImageError(message);
      setSubmitError(message);
      return;
    }

    const createdImages = selectedFiles.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((current) => [...current, ...createdImages]);
    if (!primaryImageKey && createdImages[0]) {
      setPrimaryImageKey(createdImages[0].id);
    }
    setImageError("");
    setSubmitError("");
  };

  const removeExistingImage = (imageId: string) => {
    setRemovedImageIds((current) => [...current, imageId]);
    if (selectedPrimaryImageKey === imageId) {
      const nextImage = [
        ...retainedImages.filter((image) => image.id !== imageId),
        ...newImages,
      ][0];
      setPrimaryImageKey(nextImage?.id ?? "");
    }
    setImageError("");
    setSubmitError("");
  };

  const removeNewImage = (imageId: string) => {
    const removedImage = newImages.find((image) => image.id === imageId);
    if (removedImage) URL.revokeObjectURL(removedImage.preview);
    const remainingImages = newImages.filter((image) => image.id !== imageId);
    setNewImages(remainingImages);
    if (primaryImageKey === imageId) {
      setPrimaryImageKey(retainedImages[0]?.id ?? remainingImages[0]?.id ?? "");
    }
    setImageError("");
    setSubmitError("");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = await form.trigger(undefined, { shouldFocus: true });
    if (!isValid) {
      const result = UpdateRoomTypeFormSchema.safeParse(form.getValues());
      setSubmitError(
        result.success
          ? "Check the highlighted fields and try again."
          : (result.error.issues[0]?.message ??
              "Check the highlighted fields and try again.")
      );
      return;
    }

    setSubmitError("");
    const values = form.getValues();
    if (imageCount < 1) {
      const message = "At least one room type image is required.";
      setImageError(message);
      setSubmitError(message);
      return;
    }
    if (imageCount > MAX_IMAGES) {
      const message = `A room type can have at most ${MAX_IMAGES} images.`;
      setImageError(message);
      setSubmitError(message);
      return;
    }

    const retainedImageIds = retainedImages.map((image) => image.id);
    const primaryImage = retainedImageIds.includes(selectedPrimaryImageKey)
      ? `existing:${selectedPrimaryImageKey}`
      : `new:${newImages.findIndex((image) => image.id === selectedPrimaryImageKey)}`;

    updateMutation.mutate(
      {
        ...values,
        images: newImages.map((item) => ({
          image: item.file,
          isPrimary: item.id === selectedPrimaryImageKey,
        })),
        retainedImageIds,
        primaryImage,
      },
      { onSuccess: () => handleOpenChange(false) }
    );
  };

  const allImages = [
    ...retainedImages.map((image) => ({
      id: image.id,
      src: image.url,
      alt: image.altText ?? roomTypeSummary.name,
      isExisting: true,
    })),
    ...newImages.map((image) => ({
      id: image.id,
      src: image.preview,
      alt: image.file.name,
      isExisting: false,
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[min(92dvh,52rem)] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-4 py-4 sm:px-7 sm:py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center border bg-muted/40">
              <BedDouble className="size-5" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-lg font-semibold">
                Edit room type
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm">
                Update {roomTypeSummary.name}, its policies, amenities and
                images.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : isError || !roomType ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-sm text-destructive">
              Could not load this room type.
            </p>
            <Button type="button" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-0 min-h-0 flex-1 overflow-hidden">
              <form
                id="update-room-type-form"
                onSubmit={submit}
                className="space-y-7 px-4 py-5 sm:px-7 sm:py-6"
              >
                <section className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Room type name"
                      required
                      {...form.register("name")}
                      error={form.formState.errors.name?.message}
                    />
                    <InputField
                      label="Size (sq ft)"
                      type="number"
                      min={1}
                      {...form.register("sizeSqFt", {
                        setValueAs: (value: string) =>
                          value === "" ? undefined : Number(value),
                      })}
                      error={form.formState.errors.sizeSqFt?.message}
                    />
                    <InputField
                      label="Base price / night (₹)"
                      type="number"
                      min={1}
                      required
                      {...form.register("basePrice", { valueAsNumber: true })}
                      error={form.formState.errors.basePrice?.message}
                    />
                    <InputField
                      label="Currency"
                      maxLength={3}
                      {...form.register("currency", {
                        onChange: (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          form.setValue(
                            "currency",
                            event.target.value.toUpperCase(),
                            {
                              shouldValidate: true,
                            }
                          ),
                      })}
                      error={form.formState.errors.currency?.message}
                    />
                    <TextareaField
                      label="Description"
                      className="min-h-24 resize-y sm:col-span-2"
                      {...form.register("description")}
                      error={form.formState.errors.description?.message}
                    />
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <h3 className="text-sm font-semibold">Occupancy and beds</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <InputField
                      label="Maximum guests"
                      type="number"
                      min={1}
                      {...form.register("maxGuests", { valueAsNumber: true })}
                      error={form.formState.errors.maxGuests?.message}
                    />
                    <InputField
                      label="Adults"
                      type="number"
                      min={1}
                      {...form.register("adults", { valueAsNumber: true })}
                      error={form.formState.errors.adults?.message}
                    />
                    <InputField
                      label="Children"
                      type="number"
                      min={0}
                      {...form.register("children", { valueAsNumber: true })}
                      error={form.formState.errors.children?.message}
                    />
                    <InputField
                      label="Bed count"
                      type="number"
                      min={1}
                      {...form.register("bedCount", { valueAsNumber: true })}
                      error={form.formState.errors.bedCount?.message}
                    />
                    <SelectField
                      name="bedType"
                      control={form.control}
                      label="Bed type"
                      options={BED_TYPE_OPTIONS}
                      error={form.formState.errors.bedType?.message}
                    />
                  </div>
                </section>

                <Separator />

                <section className="grid gap-3 sm:grid-cols-3">
                  <PolicyToggle
                    label="Smoking allowed"
                    checked={smokingAllowed}
                    onCheckedChange={(checked) =>
                      form.setValue("smokingAllowed", checked, {
                        shouldDirty: true,
                      })
                    }
                  />
                  <PolicyToggle
                    label="Pets allowed"
                    checked={petsAllowed}
                    onCheckedChange={(checked) =>
                      form.setValue("petsAllowed", checked, {
                        shouldDirty: true,
                      })
                    }
                  />
                  <PolicyToggle
                    label="Active"
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      form.setValue("isActive", checked, { shouldDirty: true })
                    }
                  />
                </section>

                <Separator />

                <section className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold">Amenities</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Select the amenities included with this room type.
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities?.map((amenity) => {
                      const checked = selectedAmenities.includes(amenity.id);
                      return (
                        <label
                          key={amenity.id}
                          className="flex cursor-pointer items-center gap-3 border p-3 transition-colors hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) =>
                              form.setValue(
                                "amenities",
                                value
                                  ? [...selectedAmenities, amenity.id]
                                  : selectedAmenities.filter(
                                      (id) => id !== amenity.id
                                    ),
                                { shouldDirty: true, shouldValidate: true }
                              )
                            }
                            aria-label={amenity.name}
                          />
                          <span className="text-sm">{amenity.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>

                <Separator />

                <section className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold">Room images</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Keep or replace images. Choose one primary image.
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {imageCount}/{MAX_IMAGES}
                    </Badge>
                  </div>

                  {imageCount < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex min-h-28 w-full flex-col items-center justify-center gap-2 border border-dashed bg-muted/20 px-4 py-5 text-center transition-colors hover:bg-muted/40"
                    >
                      <Upload className="size-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Add images</span>
                      <span className="text-xs text-muted-foreground">
                        JPG, JPEG or PNG, up to 5 MB each
                      </span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                      addImages(event.target.files);
                      event.target.value = "";
                    }}
                  />

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {allImages.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-4/3 overflow-hidden border bg-muted"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="size-full object-cover"
                        />
                        {selectedPrimaryImageKey === image.id && (
                          <Badge
                            className="absolute top-2 left-2 gap-1"
                            variant="secondary"
                          >
                            <Star className="size-3 fill-current" /> Primary
                          </Badge>
                        )}
                        <div className="absolute inset-x-2 bottom-2 flex justify-between gap-2">
                          {selectedPrimaryImageKey !== image.id ? (
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              className="h-8 gap-1.5 text-xs"
                              onClick={() => setPrimaryImageKey(image.id)}
                            >
                              <Star className="size-3.5" /> Primary
                            </Button>
                          ) : (
                            <span />
                          )}
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="size-8"
                            aria-label={`Remove ${image.alt}`}
                            onClick={() =>
                              image.isExisting
                                ? removeExistingImage(image.id)
                                : removeNewImage(image.id)
                            }
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {imageError && (
                    <p className="text-sm text-destructive" role="alert">
                      {imageError}
                    </p>
                  )}
                </section>
              </form>
            </ScrollArea>

            <div className="space-y-2 border-t bg-muted/20 px-4 py-3 sm:px-7">
              {submitError && (
                <p className="text-sm text-destructive" role="alert">
                  {submitError}
                </p>
              )}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="update-room-type-form"
                  disabled={updateMutation.isPending}
                  className="min-w-36"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="size-4" />
                      Update room type
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PolicyToggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border p-3">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        aria-label={label}
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
