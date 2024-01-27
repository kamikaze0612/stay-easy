import styled from "styled-components";

import GridBox from "../../ui/GridBox";
import BigStat from "./BigStat";
import { useRecentStays } from "./useRecentStays";
import { useRooms } from "../rooms/useRooms";
import Loader from "../../ui/Loader";
import { useTodaysActivities } from "./useTodayActivities";
import DurationGraph from "./DurationGraph";
import { Booking } from "../../pages/Bookings";
import TodaysActivities from "./TodaysActivities";
import SalesGraph from "./SalesGraph";
import Stats from "./Stats";
import { Room } from "../../pages/Rooms";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
`;

const DashboardContent: React.FC = () => {
  const {
    stays,
    numDays,
    confirmedStays,
    isLoading: isLoading1,
  } = useRecentStays();
  const { data: rooms, isLoading: isLoading2 } = useRooms();
  const { todaysBookings, isLoading: isLoading3 } = useTodaysActivities();

  if (isLoading1 || isLoading2 || isLoading3) return <Loader />;

  return (
    <StyledStats>
      <Stats
        confirmedStays={confirmedStays as Booking[]}
        rooms={rooms as Room[]}
        stays={stays as Booking[]}
        numDays={numDays}
      />

      <GridBox columnLength="2">
        <BigStat title="Today">
          <TodaysActivities bookings={todaysBookings as Booking[]} />
        </BigStat>
      </GridBox>

      <GridBox columnLength="2">
        <BigStat title="Stay duration">
          <DurationGraph confirmedStays={confirmedStays as Booking[]} />
        </BigStat>
      </GridBox>

      <GridBox columnLength="4">
        <SalesGraph bookings={stays as Booking[]} numDays={numDays} />
      </GridBox>
    </StyledStats>
  );
};

export default DashboardContent;
