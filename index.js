//simple program that takes and expense sheet and visualizes statistics for you
//NOTE: syntax is very important. The top row should have the values: |Expense |Amount |Date |. Then fill in the columns.
//NOTE: For entries in the expense column use this format: "expense name ("expense variant")", if there is no variant then parenthesis are not needed. e.g "Amazon purchase (RTX 4090)"
//NOTE: Date format is important for the function 'findDatePercentage' xlsx files already have built in formating for dates it is important that you follow them.

//import xlsx
const XLSX = require("xlsx");

const fs = require("fs")

//create workbook from your .xlsx file
//cell dates is so that dates for all the entries are in js date format
const workbook = XLSX.readFile(
  "expenses.xlsx" /** replace with your own file path */,
  { cellDates: true }
);

let data = [];

//loop through all worksheets
workbook.SheetNames.forEach((name) => {
  let ws = workbook.Sheets[name];
  //convert sheet data to json format using 'sheet to json'
  data = [...data, ...XLSX.utils.sheet_to_json(ws)];
});



//import utils
const utils = require("./utils");

//total for all expenses it includes an absolute property for the total of all expenses 
//then includes additional properties for each worksheet total
//worksheets should be divided by month

let total = {};

//loop through the data and change it to the desired format
data.forEach((element) => {
  let elementMY = `${
    element.Date.getMonth() + 1
  }/${element.Date.getFullYear()}`;

  //calculate l
  total.absolute = !total.absolute && total.absolute != 0 ? 0 : total.absolute;
  total[elementMY] =
    !total[elementMY] && total[elementMY] != 0 ? 0 : total[elementMY];

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
  element.Ref = String(element.Ref).split(",")

  total.absolute += element.Amount;
  total[elementMY] += element.Amount;
});

data.total = total;


//writes output into a .json file 

fs.writeFile("output.json", JSON.stringify(utils.findWeekPercentage(data), null, 4), (err) => {
  if(err) console.error(err)
  console.log("done")
})