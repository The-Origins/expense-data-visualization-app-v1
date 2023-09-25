//simple program that takes and expense sheet and visualizes statistics for you
//NOTE: syntax is very important. The top row should have the values: |Expense |Amount |Date |. Then fill in the columns. 
//NOTE: For entries in the expense column use this format: "expense name ("expense variant")", if there is no variant then parenthesis are not needed. e.g "Amazon purchase (RTX 4090)" 
//NOTE: Date format is important for the function 'findDatePercentage' xlsx files already have built in formating for dates it is important that you follow them.


//import xlsx
const XLSX = require("xlsx");

//create workbook from your .xlsx file
//cell dates is so that dates for all the entries are in js date format
const workbook = XLSX.readFile("expenses.xlsx" /** replace with your own file path */, { cellDates: true });

const ws1 = workbook.Sheets["Sheet1" /**select worksheet from work  book e.g "Sheet1" */];

//convert sheet data to json format using 'sheet to json'
const data = XLSX.utils.sheet_to_json(ws1);

//import utils
const utils = require("./utils");

//total for all expenses
let total = 0;

//loop through the data and change it to the desired format
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

console.log(utils.findDatePercentage(data));
