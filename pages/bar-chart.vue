<template>
  <div style="height: 400px">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10]
    },
    {
      label: 'Data Two',
      backgroundColor: 'blue',
      data: [50, 61, 30, 10, 60]
    },
    {
      label: 'Data Three',
      backgroundColor: 'green',
      data: [10, 35, 46, 20, 50]
    }
  ]
}

const options = {
  plugins: {
    legend: {
      labels: {
        // usePointStyle: true,
        // pointStyle: "line",
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
      
    },

    // y1: {
    //   type: "linear",
    //   display: true,
    //   position: "right",
    //   min: -100,
    //   max: 0,
    //   grid: {
    //     display: false,
    //   },
    //   title: {
    //     display: true,
    //     text: "%ACH",
    //   },
    //   ticks: {
    //     callback: (value) => value + "%",
    //   },
    // },
  },
};
</script>
