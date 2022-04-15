import { ru } from "date-fns/locale";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import Table from "components/ui-kit/Table";
import { mappedDeliveries } from "utils/mappers/statistic";
import { statsDeliveries } from "constants/tables";

function StatisticDetailsPage({ getDeliveries, deliveries }) {
  let { id } = useParams();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(
    () =>
      getDeliveries({
        date_from: moment(range[0].startDate).format("Y-MM-DD"),
        date_to: moment(range[0].endDate).format("Y-MM-DD"),
        user_id: id,
      }),
    [range]
  );

  const renderTable = () => {
    return (
      <Table data={mappedDeliveries(deliveries)} scheme={statsDeliveries} />
    );
  };

  return (
    <Wrapper>
      <Content>
        <Title>
          {deliveries &&
            `${deliveries[0]?.user?.first_name} ${deliveries[0]?.user?.last_name}`}
        </Title>
        {deliveries && renderTable()}
      </Content>

      <SideBar>
        <DateRange
          onChange={(date) => setRange([date.selection])}
          ranges={range}
          maxDate={new Date()}
          locale={ru}
        />
      </SideBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div``;

const Title = styled.h4`
  margin-bottom: 15px;
`;

const SideBar = styled.div``;

export default React.memo(StatisticDetailsPage);
