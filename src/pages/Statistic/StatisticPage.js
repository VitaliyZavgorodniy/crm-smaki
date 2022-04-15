import { ru } from "date-fns/locale";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import Select from "react-select";

import history from "constants/history";
import Table from "components/ui-kit/Table";
import { mappedDistances } from "utils/mappers/statistic";
import { statisticKitchen } from "constants/tables";

import styles from "./StatisticPage.module.scss";

function StatisticPage({ getStatistic, statistic, kitchens }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectOptions, setSelectOptions] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => kitchens && configureSelect(), [kitchens]);

  const configureSelect = () => {
    const output = kitchens.map((el) => {
      return { value: el.code, label: el.title };
    });

    setSelectOptions(output);
    setSelectedOption(output[0]);
  };

  const getParams = (date, select) => {
    const { value: kitchen_code } = select;
    const { startDate, endDate } = date;
    const date_from = moment(startDate).format("Y-MM-DD");
    const date_to = moment(endDate).format("Y-MM-DD");
    const params = { date_from, date_to, kitchen_code };

    return params;
  };

  const updateStatistic = (params) => {
    getStatistic(params);
  };

  const handleDateChange = (date) => {
    const params = getParams(date.selection, selectedOption);

    setState([date.selection]);
    updateStatistic(params);
  };

  const handleSelectChange = (option) => {
    const params = getParams(state[0], option);

    setSelectedOption(option);
    updateStatistic(params);
  };

  const handleDetailRoute = (item) => history.push(`/statistic/${item.id}`);

  const renderCouriers = () => {
    console.log();

    return (
      <Table
        onClick={handleDetailRoute}
        data={mappedDistances(statistic)}
        scheme={statisticKitchen}
      />
    );
  };

  const selectStyles = {
    option: (provided, current) => ({
      ...provided,
      color: current.isSelected ? "#FFFFFF" : "#000000",
    }),
  };

  return (
    <div className={styles.statisticpage}>
      {renderCouriers()}

      <div className={styles.statisticpage__select}>
        <DateRange
          onChange={handleDateChange}
          ranges={state}
          maxDate={new Date()}
          locale={ru}
        />

        {selectOptions && (
          <Select
            options={selectOptions}
            value={selectedOption}
            onChange={handleSelectChange}
            isSearchable={false}
            styles={selectStyles}
          />
        )}
      </div>
    </div>
  );
}

StatisticPage.propTypes = {
  getStatistic: PropTypes.func.isRequired,
  statistic: PropTypes.array,
  kitchens: PropTypes.array,
};

StatisticPage.defaultProps = {
  statistic: {},
  kitchens: [],
};

export default React.memo(StatisticPage);
