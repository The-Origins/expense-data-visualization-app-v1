module.exports.findExpensePercentage = (data) => {
  let results = {};

  //add the variants and totals
  data.forEach((element) => {
    let elementMY = `${
      element.Date.getMonth() + 1
    }/${element.Date.getFullYear()}`;

    results[elementMY] = results[elementMY] || {};
    results[elementMY][element.Expense] =
      results[elementMY][element.Expense] || {};

    results[elementMY][element.Expense].total =
      !results[elementMY][element.Expense].total &&
      results[elementMY][element.Expense].total != 0
        ? 0
        : results[elementMY][element.Expense].total;
    results[elementMY][element.Expense].entries =
      !results[elementMY][element.Expense].entries &&
      results[elementMY][element.Expense].entries != 0
        ? 0
        : results[elementMY][element.Expense].entries;

    results[elementMY][element.Expense].total += element.Amount;
    results[elementMY][element.Expense].entries++;
    results[elementMY][element.Expense].percent = `${(
      (results[elementMY][element.Expense].total / data.total[elementMY]) *
      100
    ).toFixed(1)}%`;

    //calculations for expense variants (if any).
    if (element.variant.length) {
      results[elementMY][element.Expense][element.variant] =
        results[elementMY][element.Expense][element.variant] || {};
      results[elementMY][element.Expense][element.variant].percent =
        results[elementMY][element.Expense][element.variant].percent || {};

      results[elementMY][element.Expense][element.variant].amount =
        !results[elementMY][element.Expense][element.variant].amount &&
        results[elementMY][element.Expense][element.variant].amount != 0
          ? 0
          : results[elementMY][element.Expense][element.variant].amount;
      results[elementMY][element.Expense][element.variant].entries =
        !results[elementMY][element.Expense][element.variant].entries &&
        results[elementMY][element.Expense][element.variant].entries != 0
          ? 0
          : results[elementMY][element.Expense][element.variant].entries;

      results[elementMY][element.Expense][element.variant].amount +=
        element.Amount;
      results[elementMY][element.Expense][element.variant].entries++;
      results[elementMY][element.Expense][
        element.variant
      ].percent.absolute = `${(
        (results[elementMY][element.Expense][element.variant].amount /
          data.total[elementMY]) *
        100
      ).toFixed(1)}%`;
      results[elementMY][element.Expense][
        element.variant
      ].percent.relative = `${(
        (results[elementMY][element.Expense][element.variant].amount /
          results[elementMY][element.Expense].total) *
        100
      ).toFixed(1)}%`;

      if (results[elementMY][element.Expense][element.variant].entries > 1) {
        results[elementMY][element.Expense][element.variant].average = Number(
          (
            results[elementMY][element.Expense][element.variant].amount /
            results[elementMY][element.Expense][element.variant].entries
          ).toFixed(1)
        );
      }
    }

    if (results[elementMY][element.Expense].entries > 1) {
      results[elementMY][element.Expense].average = Number(
        (
          results[elementMY][element.Expense].total /
          results[elementMY][element.Expense].entries
        ).toFixed(1)
      );
    }

    //add the Month total to the results
    results[elementMY].total = data.total[elementMY];
  });
  results.total = data.total.absolute;
  return results;
};

module.exports.findDatePercentage = (data) => {
  let results = {};

  //calculate the total expenses and percentage for each date
  data.forEach((element) => {
    let elementDate = element.Date.toDateString()

    let elementMY = `${
      element.Date.getMonth() + 1
    }/${element.Date.getFullYear()}`;


    results[elementDate] = results[elementDate] || {}

    results[elementDate].total =
      !results[elementDate].total &&
      results[elementDate].total != 0
        ? 0
        : results[elementDate].total;
    results[elementDate].total += element.Amount;
    results[elementDate].percent = `${(
      (results[elementDate].total / data.total[elementMY]) *
      100
    ).toFixed(1)}%`;

    results[elementDate][element.Expense] =
      results[elementDate][element.Expense] || {};
    results[elementDate][element.Expense].amount =
      !results[elementDate][element.Expense].amount &&
      results[elementDate][element.Expense].amount != 0
        ? 0
        : results[elementDate][element.Expense].amount;

    results[elementDate][element.Expense].amount +=
      element.Amount;
    results[elementDate][element.Expense].percent = `${(
      (results[elementDate][element.Expense].amount /
        results[elementDate].total) *
      100
    ).toFixed(1)}%`;

    if (element.variant) {
      results[elementDate][element.Expense][element.variant] =
        results[elementDate][element.Expense][
          element.variant
        ] || {};

      results[elementDate][element.Expense][
        element.variant
      ].percent =
        results[elementDate][element.Expense][element.variant]
          .percent || {};

      results[elementDate][element.Expense][
        element.variant
      ].amount =
        !results[elementDate][element.Expense][element.variant]
          .amount &&
        results[elementDate][element.Expense][element.variant]
          .amount != 0
          ? 0
          : results[elementDate][element.Expense][
              element.variant
            ].amount;

      results[elementDate][element.Expense][
        element.variant
      ].amount += element.Amount;
      results[elementDate][element.Expense][
        element.variant
      ].percent.relative = `${(
        (results[elementDate][element.Expense][element.variant]
          .amount /
          results[elementDate][element.Expense].amount) *
        100
      ).toFixed(1)}%`;
      results[elementDate][element.Expense][
        element.variant
      ].percent.absolute = `${(
        (results[elementDate][element.Expense][element.variant]
          .amount /
          results[elementDate].total) *
        100
      ).toFixed(1)}%`;
    }
  });

  return results['Tue Oct 03 2023'];
};
