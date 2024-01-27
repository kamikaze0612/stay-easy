import Stats from "../features/dashboard/Stats";
import FilterTab from "../ui/FilterTab";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Dashboard: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading>Dashboard</Heading>
        <FilterTab
          fieldFilter="range"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last month" },
            { value: "90", label: "Last 3 months" },
          ]}
        />
      </Row>

      <Stats />
    </>
  );
};

export default Dashboard;
