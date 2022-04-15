const mappedProductTypes = (arr) => {
  arr.map((el) => ({
    value: el.sync_id,
    label: el.name,
  }));
};