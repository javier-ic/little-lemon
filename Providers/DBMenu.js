import db from "./Database";

const getMenu = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu;",
        [],
        (_tx, { rows: { _array } }) => resolve(_array),
        (_tx, e) => reject(e)
      );
    });
  });
};

const populateMenu = (items) => {
  const _items = items.map(
    (e) =>
      `("${e.id}", "${e.category}","${e.description}","${e.image}","${e.price}","${e.name}")`
  );
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO menu (id, category, description, image, price, name) VALUES " +
          _items.join(",") +
          ";",
        [],
        (_tx, r) => resolve(r),
        (_tx, e) => reject(e)
      );
    });
  });
};

const getCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT DISTINCT category from menu",
        [],
        (_tx, { rows: { _array } }) => resolve(_array),
        (_tx, e) => reject(e)
      );
    });
  });
};

const filterItems = (categories, keyWord) => {
  keyWord = keyWord ? keyWord : "%";

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `
      SELECT 
        * 
      FROM 
        menu 
      WHERE 
        name LIKE '%${keyWord}%'
        ${
          categories.length
            ? `AND category in ('${categories.join("', '")}')`
            : ``
        };`;
      tx.executeSql(
        sql,
        [],
        (_tx, { rows: { _array } }) => resolve(_array),
        (_tx, e) => reject(e)
      );
    });
  });
};

export { getMenu, populateMenu, getCategories, filterItems };
