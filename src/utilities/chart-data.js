export const data = (values, tagValues, initiatagValues, initialValues) => {
  const data = {
    labels: tagValues[0] ? tagValues : initiatagValues,
    datasets: [
      {
        label: "# of Votes",
        data: values[0] ? values : initialValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return data;
};
