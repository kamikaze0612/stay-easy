import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateSettings } from "./useUpdateSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Loader from "../../ui/Loader";
import { useSettings } from "./useSettings";

export type Settings = {
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
};

const UpdateSettingsForm: React.FC = () => {
  const { settings, isLoading } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Settings>();

  const { updateSettings, isUpdating } = useUpdateSettings();

  const onSubmit: SubmitHandler<Settings> = (data) => {
    updateSettings(data);
  };

  if (isLoading) return <Loader />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="regular">
      <FormRow
        label="Min days/booking"
        id="min-booking-length"
        error={errors?.min_booking_length}
      >
        <Input
          disabled={isUpdating}
          type="number"
          id="min-booking-length"
          defaultValue={settings?.[0].min_booking_length}
          {...register("min_booking_length", {
            required: "Minimum days for booking must be provided",
          })}
        />
      </FormRow>

      <FormRow
        label="Max days/booking"
        id="max-booking-length"
        error={errors?.max_booking_length}
      >
        <Input
          disabled={isUpdating}
          type="number"
          id="max-booking-length"
          defaultValue={settings?.[0].max_booking_length}
          {...register("max_booking_length", {
            required: "Maximum days for booking must be provided",
          })}
        />
      </FormRow>

      <FormRow
        label="Max guests/booking"
        id="max-guests"
        error={errors?.max_guests_per_booking}
      >
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={settings?.[0].max_guests_per_booking}
          {...register("max_guests_per_booking", {
            required: "Maximum number of guests per booking must be provided",
          })}
        />
      </FormRow>

      <FormRow
        label="Breakfast price/person"
        id="breakfast-price"
        error={errors?.breakfast_price}
      >
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={settings?.[0].breakfast_price}
          {...register("breakfast_price", {
            required: "Breakfast price must be provided",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="submit">Update settings</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
