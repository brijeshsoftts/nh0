import { BedDouble, Check, Loader2, Star, Trash2, Upload } from "lucide-react";
import * as React from "react";
import { useWatch } from "react-hook-form";

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useCreateRoomTypeFacade } from "../hooks/useCreateRoomType";

/* -------------------------------------------------------------------------- */
/*                              Component Props                               */
/* -------------------------------------------------------------------------- */

interface CreateRoomTypeDialogProps {
  children: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              Image Preview Type                             */
/* -------------------------------------------------------------------------- */

interface ImagePreview {
  id: string;
  file: File;
  preview: string;
  isPrimary: boolean;
}
const BED_TYPE_OPTIONS: SelectOption[] = BED_TYPES.map((bedType) => ({
  id: bedType,
  name: bedType.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
}));

/* -------------------------------------------------------------------------- */
/*                              Main Component                                */
/* -------------------------------------------------------------------------- */
import { useAmenities } from "../../amenities/hooks/useAmenities";
import { BED_TYPES, MAX_IMAGES } from "../schemas/createRoomType.schema";
export function CreateRoomTypeDialog({ children }: CreateRoomTypeDialogProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    submit,
    register,
    errors,
    isPending,
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    reset,
  } = useCreateRoomTypeFacade();

  const { items } = useAmenities({
    limit: 50,
  });

  const [imagePreviews, setImagePreviews] = React.useState<ImagePreview[]>([]);
  const imagePreviewsRef = React.useRef(imagePreviews);

  const selectedAmenities = useWatch({
    control: control,
    name: "amenities",
  });
  const smokingAllowed = useWatch({
    control: control,
    name: "smokingAllowed",
  });
  const petsAllowed = useWatch({
    control: control,
    name: "petsAllowed",
  });

  /* ------------------------------------------------------------------------ */
  /*                            Image Management                              */
  /* ------------------------------------------------------------------------ */

  const addImages = (files: FileList | File[]) => {
    const selectedFiles = Array.from(files);

    const currentImages = getValues("images");

    if (currentImages.length + selectedFiles.length > MAX_IMAGES) {
      setError("images", {
        type: "manual",
        message: `You can upload a maximum of ${MAX_IMAGES} images`,
      });
      return;
    }

    const newImages = selectedFiles?.map((file) => ({
      image: file,
      isPrimary: currentImages.length === 0,
    }));

    const updatedImages = [...currentImages, ...newImages];

    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });

    const newPreviews: ImagePreview[] = selectedFiles?.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      isPrimary: currentImages.length === 0 && index === 0,
    }));

    setImagePreviews((previous) => [...previous, ...newPreviews]);

    clearErrors("images");
  };

  const removeImage = (index: number) => {
    const images = getValues("images");
    const removedImage = images[index];

    const updatedImages = images.filter(
      (_, imageIndex) => imageIndex !== index
    );

    if (removedImage?.isPrimary && updatedImages.length > 0) {
      updatedImages[0] = {
        ...updatedImages[0],
        isPrimary: true,
      };
    }

    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreviews((previous) => {
      const removed = previous[index];

      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }

      const updated = previous.filter((_, imageIndex) => imageIndex !== index);

      if (removed?.isPrimary && updated.length > 0) {
        updated[0] = {
          ...updated[0],
          isPrimary: true,
        };
      }

      return updated;
    });
  };

  const setPrimaryImage = (index: number) => {
    const images = getValues("images");

    const updatedImages = images?.map((item, imageIndex) => ({
      ...item,
      isPrimary: imageIndex === index,
    }));

    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreviews((previous) =>
      previous?.map((item, imageIndex) => ({
        ...item,
        isPrimary: imageIndex === index,
      }))
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addImages(event.target.files);
    }

    event.target.value = "";
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      imagePreviews.forEach((image) => URL.revokeObjectURL(image.preview));
      setImagePreviews([]);
      reset();
    }
  };

  React.useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  React.useEffect(
    () => () => {
      imagePreviewsRef.current.forEach((image) =>
        URL.revokeObjectURL(image.preview)
      );
    },
    []
  );

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="flex max-h-[92vh] max-w-4xl flex-col gap-0 overflow-hidden rounded-2xl border bg-background p-0 shadow-2xl sm:w-full md:min-w-150">
        {/* Header */}
        <DialogHeader className="border-b px-5 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
              <BedDouble className="size-5" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Create room type
              </DialogTitle>

              <DialogDescription className="mt-1 max-w-2xl text-sm">
                Define the room type, occupancy, pricing, amenities and images
                for your hotel.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content */}
        <ScrollArea className="min-h-0 flex-1 overflow-y-scroll">
          <div className="px-5 py-6 sm:px-7">
            <form
              id="create-room-type-form"
              onSubmit={handleSubmit(submit)}
              className="space-y-8"
            >
              <section className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Basic information</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Give this room type a clear name and description.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <InputField
                    label="Room type name"
                    placeholder="e.g. Deluxe King Room"
                    required
                    className="sm:col-span-2"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <InputField
                    label="Size (sq ft)"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="450"
                    {...register("sizeSqFt", {
                      setValueAs: (value: string) =>
                        value === "" ? undefined : Number(value),
                    })}
                    error={errors.sizeSqFt?.message}
                  />
                  <InputField
                    label="Base price / night (₹)"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="5000"
                    required
                    {...register("basePrice", { valueAsNumber: true })}
                    error={errors.basePrice?.message}
                  />
                  <InputField
                    label="Currency"
                    placeholder="INR"
                    maxLength={3}
                    required
                    {...register("currency", {
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                        setValue("currency", event.target.value.toUpperCase(), {
                          shouldValidate: true,
                        }),
                    })}
                    error={errors.currency?.message}
                  />
                </div>
                <TextareaField
                  label="Description"
                  placeholder="Describe the room type..."
                  className="min-h-28 resize-none"
                  {...register("description")}
                  error={errors.description?.message}
                />
              </section>

              <Separator />

              <section className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Occupancy</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Define how many guests this room can accommodate.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <InputField
                    label="Maximum guests"
                    type="number"
                    min={1}
                    step={1}
                    required
                    {...register("maxGuests", { valueAsNumber: true })}
                    error={errors.maxGuests?.message}
                  />
                  <InputField
                    label="Adults"
                    type="number"
                    min={1}
                    step={1}
                    required
                    {...register("adults", { valueAsNumber: true })}
                    error={errors.adults?.message}
                  />
                  <InputField
                    label="Children"
                    type="number"
                    min={0}
                    step={1}
                    required
                    {...register("children", { valueAsNumber: true })}
                    error={errors.children?.message}
                  />
                </div>
              </section>

              <Separator />

              <section className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Bed details</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Specify the bed configuration for this room type.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    name="bedType"
                    control={control}
                    label="Bed type"
                    placeholder="Select bed type"
                    options={BED_TYPE_OPTIONS}
                    error={errors.bedType?.message}
                  />
                  <InputField
                    label="Bed count"
                    type="number"
                    min={1}
                    step={1}
                    required
                    {...register("bedCount", { valueAsNumber: true })}
                    error={errors.bedCount?.message}
                  />
                </div>
              </section>

              <Separator />

              <section className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Room policies</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
                    <Checkbox
                      checked={smokingAllowed}
                      onCheckedChange={(checked) =>
                        setValue("smokingAllowed", checked === true, {
                          shouldDirty: true,
                        })
                      }
                      aria-label="Smoking allowed"
                    />
                    <span className="space-y-1">
                      <span className="block text-sm font-medium">
                        Smoking allowed
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        Guests may smoke in this room.
                      </span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
                    <Checkbox
                      checked={petsAllowed}
                      onCheckedChange={(checked) =>
                        setValue("petsAllowed", checked === true, {
                          shouldDirty: true,
                        })
                      }
                      aria-label="Pets allowed"
                    />
                    <span className="space-y-1">
                      <span className="block text-sm font-medium">
                        Pets allowed
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        Guests may bring pets.
                      </span>
                    </span>
                  </label>
                </div>
              </section>

              <Separator />

              <section className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold">Amenities</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select the amenities available with this room type.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {items?.map((amenity) => {
                    const checked = selectedAmenities.includes(amenity.id);

                    return (
                      <label
                        key={amenity.id}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) =>
                            setValue(
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
                {errors.amenities?.message && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.amenities.message}
                  </p>
                )}
              </section>

              <Separator />

              <section className="space-y-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Room images
                      <span className="ml-1 text-destructive">*</span>
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload 1–8 JPG, JPEG or PNG images. One image must be
                      selected as the primary image.
                    </p>
                  </div>

                  <Badge variant="secondary">
                    {imagePreviews.length}/{MAX_IMAGES}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Upload area */}
                  {imagePreviews.length < MAX_IMAGES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="group flex min-h-32 w-full flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-8 text-center transition-colors hover:bg-muted/40"
                    >
                      <div className="mb-3 flex size-11 items-center justify-center rounded-xl border bg-background shadow-sm">
                        <Upload className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5" />
                      </div>

                      <span className="text-sm font-medium">
                        Upload room images
                      </span>

                      <span className="mt-1 text-xs text-muted-foreground">
                        JPG, JPEG or PNG · Maximum 5 MB each
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Image grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {imagePreviews?.map((item, index) => (
                        <div
                          key={item.id}
                          className="group relative aspect-4/3 overflow-hidden rounded-xl border bg-muted"
                        >
                          <img
                            src={item.preview}
                            alt={`Room image ${index + 1}`}
                            className="size-full object-cover"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />

                          {/* Primary badge */}
                          {item.isPrimary && (
                            <Badge
                              className="absolute top-2 left-2 gap-1"
                              variant="secondary"
                            >
                              <Star className="size-3 fill-current" />
                              Primary
                            </Badge>
                          )}

                          {/* Actions */}
                          <div className="absolute inset-x-2 bottom-2 flex justify-between gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {!item.isPrimary ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="h-8 gap-1.5 text-xs"
                                onClick={() => setPrimaryImage(index)}
                              >
                                <Star className="size-3.5" />
                                Make primary
                              </Button>
                            ) : (
                              <div />
                            )}

                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="size-8"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>

                          {/* Primary indicator */}
                          {item.isPrimary && (
                            <div className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full bg-background/90 shadow-sm">
                              <Check className="size-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.images?.message && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.images.message}
                  </p>
                )}
              </section>
            </form>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <DialogClose>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            form="create-room-type-form"
            disabled={isPending}
            className="min-w-36"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                <BedDouble className="size-4" />
                Create room type
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
