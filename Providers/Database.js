import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists menu (id primary key not null, category varchar(255), name varchar(255), description varchar(255), image varchar(255), price float) ",
    [],
    undefined,
    (tx, e) => console.log(e.message)
  );
});

export default db;
