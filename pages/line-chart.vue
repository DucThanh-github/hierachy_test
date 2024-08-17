<template>
  <div style="height: 400px">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      borderColor: "blue",
      backgroundColor: "blue",
      data: [50, 29, 30, 20, 85, 50, 49],
      yAxisID: "y",
    },
    {
      label: "Data two",
      borderColor: "red",
      backgroundColor: "red",
      data: [-50, -60, -30, -80, -75, -28, -53],
      yAxisID: "y1",
      borderDash: [10, 5],
    },
  ],
};

const options = {
 plugins: {
  legend: {
    labels: {
      // padding:0
      usePointStyle: true,
      pointStyle:'line'

    },
  },
 },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      type: "linear",
      display: true,

      position: "left",
      min: 0,
      title: {
        display: true,
        text: "Sale amount/ Budget amount",
      },
    },

    y1: {
      type: "linear",
      display: true,
      position: "right",
      min: -100,
      max: 0,
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "%ACH",
      },
      ticks: {
        callback: (value) => value + "%",
      },
      // grid line settings
      //   grid: {
      //     drawOnChartArea: false, // only want the grid lines for one axis to show up
      //   },
    },
  },
};
</script>
