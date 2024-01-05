/// <reference path="crud.d.ts" />
import { RowID, RowElement } from "./interface";
import * as CRUD from "./crud";

const row: RowElement = {
  firstName: 'Guillaume',
  lastName: 'Salva',
};
const newRowID: RowID = CRUD.insertRow(row);
// Insert row { firstName: 'Guillaume', lastName: 'Salva', }

const updatedRow: RowElement = { ...row, age: 23 };
CRUD.updateRow(newRowID, updatedRow);
/*
`Update row <newRowID> {
  firstName: 'Guillaume',
  lastName: 'Salva',
  age: 23,
}
*/

CRUD.deleteRow(newRowID);
// Delete row id <newRowID>
