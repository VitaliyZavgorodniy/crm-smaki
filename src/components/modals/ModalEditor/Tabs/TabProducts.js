import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { debounce } from "lodash";

import { getProducts } from "store/actions/products";
import { addOrderItem } from "store/actions/order";

import { ClearButton } from "components/ui-kit/buttons/ClearButton";
import ButtonIcon from "components/ui-kit/ButtonIcon";
import { TextInputSearch } from "components/ui-kit/inputs/TextInputSearch";

import SaveClose from "@mui/icons-material/Close";

export const TabProducts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [activeCategory, setCategory] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  const categories = useSelector((store) => store.settings.productCategories);
  const products = useSelector((store) => store.products.list);
  const city = useSelector((store) => store.order.data.address.city_sync_id);
  const restaurant = useSelector((store) => store.order.data.restaurant);

  useEffect(() => {
    let params = {};
    if (currentSearch.length > 0) {
      params.search = currentSearch;
      setCategory(null);
    } else {
      if (!!activeCategory) params.category_sync_id = activeCategory;
      if (!!restaurant) params.restaurant = restaurant;
    }

    dispatch(getProducts(params));
  }, [activeCategory, restaurant, currentSearch]);

  const handleAddProduct = (data, price) => {
    const product = {
      id: data.id,
      article: data.article,
      description: data.description_ua,
      title: data.title_ua,
      weight: data.weight,
      weight_type: data.weight_type,
      image: data.image,
      prices: data.prices,
      price: parseInt(price),
    };

    dispatch(addOrderItem(product));
  };

  let startDebounceSearch = debounce((value) => {
    setCurrentSearch(value);
  }, 400);

  const handlerChangeSearch = (value) => {
    setTextSearch(value);

    if (value.length == 0) {
      handleClearSearch();
    }

    startDebounceSearch(value);
  }

  const handleClearSearch = () => {
    setTextSearch('');
    setCurrentSearch('');
  }

  const handlerCurrentClick = () => {
    setCurrentSearch(textSearch);
  }

  const renderCategories = () => {
    return categories.map((item, index) => {
      return (
        <ClearButton
          key={index}
          isActive={item.sync_id === activeCategory}
          onClick={() => { setCategory(item.sync_id); handleClearSearch(); }}
          title={item.name}
        />
      );
    });
  };

  const renderProducts = () => {
    return products.map((item, index) => {
      const element = item.prices.find((el) => el.city_sync_id === city);
      const price = element ? element.price : null;
      if (price)
        return (
          <ProdcutsItem
            key={index}
            onClick={() => handleAddProduct(item, price)}
          >
            <ProductImg src={item.image} alt={item.title_ua} />
            <div>
              <div>{item.title_ua}</div>
              {/* <div>{item.article}</div> */}
              <div>{price} грн.</div>
              <div>{item.restaurant}</div>
            </div>
          </ProdcutsItem>
        );
      return null;
    });
  };

  return (
    <Wrapper theme={theme}>
      <CategoriesList>
        <ClearButton
          isActive={activeCategory === null}
          onClick={() => { setCategory(null); handleClearSearch(); }}
          title='Все'
        />

        {categories.length > 0 && renderCategories()}

        {/* EDITING - здесь нужно доработать поиск по вводу  */}
        <WrSearch>
          <TextInputSearch
            title='Пошук по всім категоріям'
            type='text'
            width="calc(100% - 50px)"
            isSearch="true"
            onChange={(e) => handlerChangeSearch(e.target.value)}
            value={textSearch}
            onChangeButtonSearch={handlerCurrentClick}
          />
          <BtnCloseSearch>
            <ButtonIcon
              onClick={handleClearSearch}
              icon={<SaveClose />}
              disabled={textSearch.length == 0 && true}
            />
          </BtnCloseSearch>
        </WrSearch>

      </CategoriesList>
      <ProductsList>{products?.length > 0 && renderProducts()} </ProductsList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform-origin: right top;
  height: 100vh;
  top: 0;
  right: 460px;
  width: 460px;
  padding: 10px;
  background-color: ${(p) => p.theme.background};
  overflow-y: scroll;
  overflow-x: hidden;
`;

const BtnCloseSearch = styled.div`
  margin-left: 10px;
  margin-bottom: 3px;
  button {
    padding-top: 9px;
    padding-bottom: 9px;
    span {
      margin: 0;
    }
  }
;`

const WrSearch = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const CategoriesList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ProductsList = styled.ul``;

const ProdcutsItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 7px;
  background-color: ${(p) => p.theme.backgroundLight};
  border: ${(p) => p.theme.inputBorder};
  border-radius: 10px;
  color: ${(p) => p.theme.secondaryColor};

  &:hover {
    cursor: pointer;
    border: 2px solid ${(p) => p.theme.lightAccentColor};
  }
`;

const ProductImg = styled.img`
  width: 80px;
  height: 100%;
  margin-right: 10px;
  border-radius: 10px;
`;
