import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import { STATUS_TO_TAG_TYPE } from "../../utils/constants";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import ButtonsGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useCheckin } from "./useCheckin";
import { useEffect, useState } from "react";

const Box = styled.div`
  padding: 2.4rem 3.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
`;

const BookingCheckin: React.FC = () => {
  const { booking, isLoading, error } = useBooking();

  const [addBreakfast, setAddBreakFast] = useState<boolean>(false);
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);

  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const navigate = useNavigate();

  useEffect(() => {
    setConfirmPayment(booking?.is_paid ?? false);
  }, [booking]);

  const optionalBreakfastPrice =
    (booking &&
      settings &&
      booking?.guests_num *
        settings?.[0]?.breakfast_price *
        booking?.stay_length) ||
    0;

  if (error) {
    console.error("ERROR");
    throw new Error("Booking could not be fetched");
  }

  function handleCheckin() {
    if (!confirmPayment) return;

    if (booking && addBreakfast) {
      checkin({
        id: booking?.id,
        breakfast: {
          has_breakfast: true,
          extras_total_price: optionalBreakfastPrice,
          fee: booking?.fee + optionalBreakfastPrice,
        },
      });
    } else if (booking) {
      checkin({ id: booking?.id, breakfast: {} });
    }
  }

  if (isLoading || !booking || isSettingsLoading || !settings)
    return <Loader />;

  return (
    <>
      <Row type="horizontal">
        <Heading>
          Check in booking #{booking.id}{" "}
          {booking.status && (
            <Tag type={STATUS_TO_TAG_TYPE?.[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>
          )}
        </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Row>
      <Row type="vertical">
        <BookingDataBox booking={booking} />

        {!booking.has_breakfast && !booking.is_paid && (
          <Box>
            <Checkbox
              id="extras"
              checked={addBreakfast}
              onChange={() => setAddBreakFast((current) => !current)}
            >
              Want to add breakfast for{" "}
              {formatCurrency(+optionalBreakfastPrice)}
            </Checkbox>
          </Box>
        )}
        <Box>
          <Checkbox
            disabled={confirmPayment || isCheckingIn}
            checked={confirmPayment}
            id="payment"
            onChange={() => setConfirmPayment((current) => !current)}
          >
            I confirm that {booking.guests.full_name} has paid the total amount
            of {formatCurrency(+booking.fee)}
          </Checkbox>
        </Box>

        <ButtonsGroup>
          <Button
            size="big"
            disabled={!confirmPayment || isCheckingIn}
            onClick={handleCheckin}
          >
            Check in
          </Button>
          <Button
            size="big"
            disabled={isCheckingIn}
            variation="secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </ButtonsGroup>
      </Row>
    </>
  );
};

export default BookingCheckin;
