module.exports.findExpensePercentage = (data) => {
  let results = {};

  //initialize the array
  data.forEach((element) => {
    results[element.Expense] = { total: 0 };
  });

  //add the variants and totals
  data.forEach((element) => {
    results[element.Expense].total += element.Amount;
    results[element.Expense].percent = `${(
      (results[element.Expense].total / data.total) *
      100
    ).toFixed(1)}%`;

    if (element.variant.length) {
      results[element.Expense] = {
        ...results[element.Expense],
        [element.variant]: { amount: 0, percent: {} },
      };
    }
  });

  //calculate the totals and percents for the variants
  data.forEach((element) => {
    if (element.variant.length) {
      results[element.Expense][element.variant].amount += element.Amount;
      results[element.Expense][element.variant].percent.absolute = `${(
        (results[element.Expense][element.variant].amount / data.total) *
        100
      ).toFixed(1)}%`;
      results[element.Expense][element.variant].percent.relative = `${(
        (results[element.Expense][element.variant].amount /
          results[element.Expense].total) *
        100
      ).toFixed(1)}%`;
    }
  });

  return results;
};

module.exports.findDatePercentage = (data) => {
  let results = {};

  //initialize  the total for each
  data.forEach((element) => {
    results[element.Date.toDateString()] = { total: 0 };
  });

  //calculate the total and percentage for each date
  //initialize the amount for each expense
  data.forEach((element) => {
    results[element.Date.toDateString()].total += element.Amount;
    results[element.Date.toDateString()].percent = `${(
      (results[element.Date.toDateString()].total / data.total) *
      100
    ).toFixed(1)}%`;
    results[element.Date.toDateString()] = {
      ...results[element.Date.toDateString()],
      [element.Expense]: { amount: 0 },
    };
  });

  //calculate the total and percent for each expense
  //initialize the amount for each expense variant
  data.forEach((element) => {
    results[element.Date.toDateString()][element.Expense].amount +=
      element.Amount;
    results[element.Date.toDateString()][element.Expense].percent = `${(
      (results[element.Date.toDateString()][element.Expense].amount /
        results[element.Date.toDateString()].total) *
      100
    ).toFixed(1)}%`;
    if (element.variant) {
      results[element.Date.toDateString()][element.Expense][element.variant] = {
        amount: 0,
        percent: {},
      };
    }

    
  });

  //calculate the amount and percent for each expense variant
  data.forEach((element) => 
   {
    if (element.variant) {
      results[element.Date.toDateString()][element.Expense][element.variant].amount += element.Amount
      results[element.Date.toDateString()][element.Expense][element.variant].percent.relative = `${(
        (results[element.Date.toDateString()][element.Expense][element.variant].amount / results[element.Date.toDateString()][element.Expense].amount) *
        100
      ).toFixed(1)}%`; 
      results[element.Date.toDateString()][element.Expense][element.variant].percent.absolute = `${(
        (results[element.Date.toDateString()][element.Expense][element.variant].amount / results[element.Date.toDateString()].total) *
        100
      ).toFixed(1)}%`; 
    }
   })

   return results

};
