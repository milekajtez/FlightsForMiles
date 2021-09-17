const dayChartData = {
  type: "bar",
  data: {
    labels: [
      "00:00 - 04:00",
      "04:00 - 08:00",
      "08:00 - 12:00",
      "12:00 - 16:00",
      "16:00 - 20:00",
      "20:00 - 00:00",
    ],
    datasets: [
      {
        label: "# of sold ticket per hour",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(15, 176, 217, 0.2)",
          "rgba(137, 22, 199, 0.2)",
          "rgba(199, 22, 22, 0.2)",
          "rgba(22, 199, 34, 0.2)",
          "rgba(255, 234, 0, 0.2)",
          "rgba(28, 22, 199, 0.2)",
        ],
        borderColor: [
          "rgba(15, 176, 217, 1)",
          "rgba(137, 22, 199, 1)",
          "rgba(199, 22, 22, 1)",
          "rgba(22, 199, 34, 1)",
          "rgba(255, 234, 0, 1)",
          "rgba(28, 22, 199, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const weekChartData = {
  type: "bar",
  data: {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "# of sold ticket per day",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(15, 176, 217, 0.2)",
          "rgba(137, 22, 199, 0.2)",
          "rgba(199, 22, 22, 0.2)",
          "rgba(22, 199, 34, 0.2)",
          "rgba(255, 234, 0, 0.2)",
          "rgba(28, 22, 199, 0.2)",
          "rgba(0, 0, 0, 0.2)",
        ],
        borderColor: [
          "rgba(15, 176, 217, 1)",
          "rgba(137, 22, 199, 1)",
          "rgba(199, 22, 22, 1)",
          "rgba(22, 199, 34, 1)",
          "rgba(255, 234, 0, 1)",
          "rgba(28, 22, 199, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const mounthChartData = {
  type: "doughnut",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "# of sold ticket per month",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(15, 176, 217, 0.2)",
          "rgba(137, 22, 199, 0.2)",
          "rgba(199, 22, 22, 0.2)",
          "rgba(22, 199, 34, 0.2)",
          "rgba(255, 234, 0, 0.2)",
          "rgba(28, 22, 199, 0.2)",
          "rgba(0, 0, 0, 0.2)",
          "rgba(209, 207, 207, 0.2)",
          "rgba(122, 255, 5, 0.2)",
          "rgba(15, 99, 95, 0.2)",
          "rgba(230, 11, 131)",
          "rgba(56, 255, 195, 0.2)",
        ],
        borderColor: [
          "rgba(15, 176, 217, 1)",
          "rgba(137, 22, 199, 1)",
          "rgba(199, 22, 22, 1)",
          "rgba(22, 199, 34, 1)",
          "rgba(255, 234, 0, 1)",
          "rgba(28, 22, 199, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(209, 207, 207, 1)",
          "rgba(122, 255, 5, 1)",
          "rgba(15, 99, 95, 1)",
          "rgba(230, 11, 131)",
          "rgba(56, 255, 195, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    radius: 200,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const timeChartData = {
  type: "bar",
  data: {
    labels: ["number of sold tickets"],
    datasets: [
      {
        label: "# of sold ticket in entered period",
        data: [0],
        backgroundColor: ["rgba(15, 176, 217, 0.2)"],
        borderColor: ["rgba(15, 176, 217, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

export { dayChartData, weekChartData, mounthChartData, timeChartData };
