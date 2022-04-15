import { isArray } from "lodash";
import { useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import moment from 'moment';

const TIME_DEFAULT = {
  time: '00:00',
  format: 'HH:MM'
};

export const TabHistory = () => {
  const theme = useTheme();
  const { history, delivered_date } = useSelector((state) => state.order.data);
  const { orderStatuses } = useSelector((state) => state.settings);

  return (
    <Wrapper theme={theme}>
      <ListHistory>
        {
          isArray(orderStatuses) && orderStatuses.map((item, index) => {
            let time = isArray(history) && history.find((itemTime) => itemTime.status === item.name);
            let timeStatus = false;

            if (time) {
              time = moment(time?.set_at).format(TIME_DEFAULT.format);
              timeStatus = true;
            } else {
              time = TIME_DEFAULT.time;
            }

            return (
              <HistoryItem key={index}>
                <HistoryItemTitle>{item.title}</HistoryItemTitle>
                <HistoryItemTime active={timeStatus}>{time}</HistoryItemTime>
              </HistoryItem>
            )
          })
        }
      </ListHistory>
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

const ListHistory = styled.ul`
`;

const HistoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.secondaryColor};
  padding: 10px 0;
  &:not(:last-child) {
    border-bottom: 1px solid #9D9D9D;
  }
`;

const HistoryItemTitle = styled.span`
`;

const HistoruNull = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: ${(p) => p.theme.secondaryColor};
`;

const HistoryItemTime = styled.span`
  margin-left: 10px;
  color: ${(p) => p.active ? '#fff' : '#9D9D9D'};
  text-decoration: underline;
  font-size: 14px;
`;