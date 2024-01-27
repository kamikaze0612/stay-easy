import styled from "styled-components";

import { Booking } from "../../pages/Bookings";
import TodaysActivityItem from "./TodaysActivityItem";

type TodaysActivitiesProps = {
  bookings: Booking[];
};

const StyledTodaysActivities = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const TodaysActivities: React.FC<TodaysActivitiesProps> = ({ bookings }) => {
  return (
    <StyledTodaysActivities>
      {bookings.map((booking) => (
        <TodaysActivityItem
          key={booking.id}
          flag={booking.guests.flag_icon}
          fullName={booking.guests.full_name}
          stayLength={booking.stay_length}
          status={booking.status}
        />
      ))}
    </StyledTodaysActivities>
  );
};

export default TodaysActivities;
