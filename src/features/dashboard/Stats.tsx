import styled from "styled-components";
import {
  FaMoneyCheck,
  FaSuitcase,
  FaCalendar,
  FaChartBar,
} from "react-icons/fa";

import GridBox from "../../ui/GridBox";
import StatIcon from "./StatIcon";
import Stat from "./Stat";
import BigStat from "./BigStat";
import { useRecentStays } from "./useRecentStays";
import { useRooms } from "../rooms/useRooms";
import Loader from "../../ui/Loader";
import { formatCurrency } from "../../utils/helpers";
import { useTodaysActivities } from "./useTodayActivities";
import DurationGraph from "./DurationGraph";
import { Booking } from "../../pages/Bookings";
import TodaysActivities from "./TodaysActivities";
import SalesGraph from "./SalesGraph";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
`;

const Stats: React.FC = () => {
  const {
    stays,
    numDays,
    confirmedStays,
    isLoading: isLoading1,
  } = useRecentStays();
  const { data: rooms, isLoading: isLoading2 } = useRooms();
  const { todaysBookings, isLoading: isLoading3 } = useTodaysActivities();

  const checkins = `${confirmedStays?.length}`;
  const bookingsNum = `${stays?.length}`;
  const roomCount = rooms?.length as number;
  const totalSales = stays?.reduce((acc, cur) => acc + cur.fee, 0) as number;
  const occupancyRate =
    confirmedStays &&
    Math.ceil(
      (confirmedStays?.reduce((acc, cur) => acc + cur.stay_length, 0) /
        (numDays * roomCount)) *
        100
    );

  if (isLoading1 || isLoading2 || isLoading3) return <Loader />;

  return (
    <StyledStats>
      <GridBox>
        <Stat title="Check ins" statText={checkins}>
          <StatIcon icon={<FaCalendar />} color="yellow" />
        </Stat>
      </GridBox>

      <GridBox>
        <Stat title="Bookings" statText={bookingsNum}>
          <StatIcon icon={<FaSuitcase />} color="blue" />
        </Stat>
      </GridBox>

      <GridBox>
        <Stat title="Occupancy rate" statText={`${occupancyRate}%`}>
          <StatIcon icon={<FaChartBar />} color="indigo" />
        </Stat>
      </GridBox>

      <GridBox>
        <Stat title="Total sales" statText={String(formatCurrency(totalSales))}>
          <StatIcon icon={<FaMoneyCheck />} color="green" />
        </Stat>
      </GridBox>

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

export default Stats;
