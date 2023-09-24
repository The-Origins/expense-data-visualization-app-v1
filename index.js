//simple program that takes and expense sheet and visualizes statistics for you
//NOTE: syntax is very important. The top row should have the values: |Expense |Amount |Date |. Then fill in the columns
//NOTE: Date format is important for the function 'findDatePercentage' xlsx files already have built in formating for dates it is important that you follow them.

const XLSX = require("xlsx");
const workbook = XLSX.readFile("expenses.xlsx", { cellDates: true });
const ws1 = workbook.Sheets["0923"];
const data = XLSX.utils.sheet_to_json(ws1);
const utils = require("./utils");

let total = 0;

data.forEach((element) => {
  element.variant = String(element["Expense"])
    .substring(
      String(element.Expense).indexOf("(") + 1,
      String(element.Expense).indexOf(")")
    )
    .toLocaleLowerCase();
  if (String(element.Expense).includes("(")) {
    element["Expense"] = String(element.Expense).substring(
      0,
      String(element.Expense).indexOf("(") - 1
    );
  }

  element.Expense = String(element.Expense).toLocaleLowerCase();
  total += element.Amount;
});

data.total = total;
console.table(utils.findDatePercentage(data));
