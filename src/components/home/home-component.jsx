import axios from "axios";
import { useEffect, useState } from "react";
import { DOMAIN } from "../../utilities/utils";
import { Container, Row, Col } from "react-bootstrap";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { ChartContainer, ChartParentContainer } from "./home.styles";
import { data } from "../../utilities/chart-data";

const Home = () => {
  let [tagValues, setTagValues] = useState(["fixed", "in progress", "waiting"]);
  let [values, setValues] = useState([1, 1, 1]);
  let [tagValuesProirity, setTagValuesProirity] = useState([
    "fixed",
    "in progress",
    "waiting",
  ]);
  let [valuesPriority, setValuesPriority] = useState([1, 1, 1]);
  let [tagValuesType, setTagValuesType] = useState([
    "fixed",
    "in progress",
    "waiting",
  ]);
  let [valuestype, setValuesType] = useState([1, 1, 1]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getMe = async () => {
      const dataStatus = await axios.get(
        `${DOMAIN.localhost}/api/v1/tickets/get-my-tickets-by-status`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const dataPriority = await axios.get(
        `${DOMAIN.localhost}/api/v1/tickets/get-my-tickets-by-priority`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const dataType = await axios.get(
        `${DOMAIN.localhost}/api/v1/tickets/get-my-tickets-by-type`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setTagValues(dataStatus.data.tickets.map((el) => el._id));
      setValues(dataStatus.data.tickets.map((el) => el.length));
      setTagValuesProirity(dataPriority.data.tickets.map((el) => el._id));
      setValuesPriority(dataPriority.data.tickets.map((el) => el.length));
      setTagValuesType(dataType.data.tickets.map((el) => el._id));
      setValuesType(dataType.data.tickets.map((el) => el.length));
    };
    getMe();
  }, [token]);

  const TicketByStatus = data(
    values,
    tagValues,
    ["fixed", "in progress", "waiting"],
    [1, 1, 1]
  );
  const TicketByPriority = data(
    valuesPriority,
    tagValuesProirity,
    ["medium", "critical", "high", "critical high-priority"],
    [1, 1, 1, 1]
  );
  const TicketByType = data(
    valuestype,
    tagValuesType,
    ["bug", "feature request", "others"],
    [1, 1, 1]
  );

  ////
  ///
  ////
  ////
  return (
    <Container fluid as={ChartParentContainer}>
      <ChartParentContainer as={Row}>
        {/* Doughnut component for ticket by status */}

        <ChartContainer as={Col}>
          <h1>TICKETS BY STATUS</h1>
          <Doughnut data={TicketByStatus} />
        </ChartContainer>

        {/* Doughnut component for ticket by priority */}
        <ChartContainer as={Col}>
          <h1>TICKETS BY PRIORITY</h1>
          <Doughnut data={TicketByPriority} />
        </ChartContainer>

        {/* Doughnut component for ticket by type */}
        <ChartContainer as={Col}>
          <h1>TICKETS BY TYPE</h1>
          <Doughnut data={TicketByType} />
        </ChartContainer>
      </ChartParentContainer>
    </Container>
  );
};

export default Home;
