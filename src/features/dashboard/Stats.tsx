import {
  FaCalendar,
  FaChartBar,
  FaMoneyCheck,
  FaSuitcase,
} from "react-icons/fa";

import GridBox from "../../ui/GridBox";
import Stat from "./Stat";
import StatIcon from "./StatIcon";
import { formatCurrency } from "../../utils/helpers";
import { Booking } from "../../pages/Bookings";
import { Room } from "../../pages/Rooms";

type StatsProps = {
  confirmedStays: Booking[];
  stays: Booking[];
  rooms: Room[];
  numDays: number;
};

const Stats: React.FC<StatsProps> = ({
  confirmedStays,
  stays,
  rooms,
  numDays,
}) => {
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
  return (
    <>
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
    </>
  );
};

export default Stats;
