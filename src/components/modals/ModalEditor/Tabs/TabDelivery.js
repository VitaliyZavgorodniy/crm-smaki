import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from 'moment';

import { updateOrderData, updateOrderAddress } from "store/actions/order";
import { citiesMapped } from "utils/mappers/cities";
import { kitchensMapped } from "utils/mappers/kitchens";

import { ClientSearch } from "../elements/ClientSearch";
import TabMap from "./TabMap";

import { TextInput } from "components/ui-kit/inputs/TextInput";
import { TextArea } from "components/ui-kit/inputs/TextArea";
import { Dropdown } from "components/ui-kit/inputs/Dropdown";
import { TimeInput } from "components/ui-kit/inputs/TimeInput";
import { DatePicker } from "components/ui-kit/inputs/DatePicker";

import Radio from "components/ui-kit/Radio";

const RADIO_SCHEME = [
  { value: "soon", label: "Як можна скоріше" },
  { value: "requested_time", label: "На час" },
];

export const TabDelivery = ({ }) => {
  const dispatch = useDispatch();

  const order = useSelector((store) => store.order.data);
  const address = useSelector((store) => store.order.data.address);
  const cities = useSelector((store) => store.settings.cities);
  const kitchens = useSelector((store) => store.settings.kitchens);

  const currentDate = new Date();
  const dormatCurrentDate = moment(currentDate).format('YYYY-MM-DD');

  const convertDate = (data) => {
    return new Date(data);
  }

  useEffect(() => {
    if (order?.type.includes(RADIO_SCHEME[1].value)) {
      dispatch(updateOrderData("delivered_till", moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')));
    } else {
      dispatch(updateOrderData("delivered_till", null));
    }
  }, [order?.type]);

  return (
    <Wrapper>
      <Dropdown
        title='Ресторан'
        type='text'
        onChange={(e) =>
          dispatch(updateOrderData("restaurant", e.target.value))
        }
        value={order.restaurant}
        list={[
          { title: "Smaki Maki", value: "smaki" },
          { title: "Sushi Go", value: "go" },
        ]}
      />

      <ClientSearch />

      <Dropdown
        title='Город'
        type='text'
        onChange={(e) => {
          console.log(e.target.value)
          dispatch(updateOrderAddress("city_sync_id", e.target.value))
        }}
        value={address.city_sync_id}
        list={citiesMapped(cities)}
      />

      <TextInput
        title='Вулиця'
        type='text'
        onChange={(e) => dispatch(updateOrderAddress("street", e.target.value))}
        value={address.street}
      />
      <Row>
        <TextInput
          width='25%'
          title='Будинок'
          type='text'
          onChange={(e) =>
            dispatch(updateOrderAddress("house_number", e.target.value))
          }
          value={address.house_number}
        />
        <TextInput
          width='25%'
          title='Квартира'
          type='text'
          onChange={(e) =>
            dispatch(updateOrderAddress("apartment", e.target.value))
          }
          value={address.apartment}
        />
        <TextInput
          width='25%'
          title="Під'їзд"
          type='text'
          onChange={(e) =>
            dispatch(updateOrderAddress("entrance", e.target.value))
          }
          value={address.entrance}
        />
        <TextInput
          width='25%'
          title='Поверх'
          type='text'
          onChange={(e) =>
            dispatch(updateOrderAddress("floor", e.target.value))
          }
          value={address.floor}
        />
      </Row>

      <Subtext>
        lat: {address.latitude} lng: {address.longitude}
      </Subtext>

      <Wr>
        <Radio
          items={RADIO_SCHEME}
          label='Час доставки'
          valueKey='status'
          value={order?.type}
          onChange={(e) => {
            dispatch(updateOrderData("type", e.value.value));
          }}
        />
      </Wr>

      {
        order?.type.includes(RADIO_SCHEME[1].value) && (
          <Row>
            <DatePicker
              title="День"
              width='50%'
              value={currentDate}
              disabled={true}
            />
            {/* нужно еще будет сделать ограничения времени */}
            <TimeInput
              width='50%'
              title="Час"
              min={moment().add('30', 'minutes')}
              value={convertDate(order?.delivered_till)}
              onChange={(e) => {
                let selectedTime = e.format("HH:mm:ss");

                dispatch(updateOrderData("delivered_till", `${dormatCurrentDate} ${selectedTime}`));
              }}
            />
          </Row>
        )
      }

      <Dropdown
        title='Кухня'
        onChange={(e) =>
          dispatch(updateOrderAddress("kitchen_code", e.target.value))
        }
        value={order.kitchen_code}
        list={kitchensMapped(kitchens)}
      />

      <TextArea
        title='Коментар адміністратору'
        onChange={(e) =>
          dispatch(updateOrderAddress("comment_to_administrator", e.target.value))
        }
        value={order?.address?.comment_to_administrator}
      />

      <TextArea
        title="Коментар кур'єру"
        onChange={(e) =>
          dispatch(updateOrderAddress("comment_to_courier", e.target.value))
        }
        value={order?.address?.comment_to_courier}
      />

      {/* {order.type === "soon" ? <div>29 min</div> : <div>timer</div>} */}

      <TabMap />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Subtext = styled.div`
  margin-top: 10px;
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
  font-size: 12px;
  border-bottom: ${(p) => p.theme.inputBorder};
  color: ${(p) => p.theme.lightAccentColor};
`;

const Wr = styled.div`
  color: #fff;
  margin-top: 10px;
`