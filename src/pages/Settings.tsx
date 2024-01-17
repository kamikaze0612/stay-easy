import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Row from "../ui/Row";
import { getSettings } from "../services/apiSettings";
import { useUpdateSettings } from "../features/settings/useUpdateSettings";

export type Settings = {
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
};

const Settings: React.FC = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Settings>();

  const { updateSettings, isUpdating } = useUpdateSettings();

  const onSubmit: SubmitHandler<Settings> = (data) => {
    updateSettings(data);
  };

  if (isLoading) return <p>...Loading</p>;

  return (
    <Row type="vertical">
      <Heading>Update hotel settings</Heading>

      <UpdateSettingsForm onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button type="submit">Update settings</Button>
        </FormRow>
      </UpdateSettingsForm>
    </Row>
  );
};

export default Settings;
