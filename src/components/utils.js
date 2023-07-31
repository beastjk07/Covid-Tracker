export const stateAbbreviations = {
  Alabama: "al",
  Alaska: "ak",
  Arizona: "az",
  Arkansas: "ar",
  California: "ca",
  Colorado: "co",
  Connecticut: "ct",
  Delaware: "de",
  Florida: "fl",
  Georgia: "ga",
  Hawaii: "hi",
  Idaho: "id",
  Illinois: "il",
  Indiana: "in",
  Iowa: "ia",
  Kansas: "ks",
  Kentucky: "ky",
  Louisiana: "la",
  Maine: "me",
  Maryland: "md",
  Massachusetts: "ma",
  Michigan: "mi",
  Minnesota: "mn",
  Mississippi: "ms",
  Missouri: "mo",
  Montana: "mt",
  Nebraska: "ne",
  Nevada: "nv",
  "New Hampshire": "nh",
  "New Jersey": "nj",
  "New Mexico": "nm",
  "New York": "ny",
  "North Carolina": "nc",
  "North Dakota": "nd",
  Ohio: "oh",
  Oklahoma: "ok",
  Oregon: "or",
  Pennsylvania: "pa",
  "Rhode Island": "ri",
  "South Carolina": "sc",
  "South Dakota": "sd",
  Tennessee: "tn",
  Texas: "tx",
  Utah: "ut",
  Vermont: "vt",
  Virginia: "va",
  Washington: "wa",
  "West Virginia": "wv",
  Wisconsin: "wi",
  Wyoming: "wy",
};

export const apiURL = (state) =>
  `https://api.covidtracking.com/v1/states/${state}/daily.json`;

export const formatDate = (date) => {
  const dateObj = new Date(
    date.slice(0, 4),
    date[4] + date[5] - 1,
    date[6] + date[7]
  );

  const adjustedMonth = dateObj.getMonth() + 1;

  const labelDate =
    adjustedMonth + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
  return labelDate;
};

export const getChartData = (data) => {
  const labels = data.map((item) => formatDate(item.date.toString()));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Rise of numbers in Covid-19 patients",
        data: data.map((item) => item.positiveIncrease),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Daily Fall of numbers in Covid-19 patients",
        data: data.map((item) => item.negativeIncrease),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#742774",
        tension: 0.1,
      },
    ],
  };

  return chartData;
};
