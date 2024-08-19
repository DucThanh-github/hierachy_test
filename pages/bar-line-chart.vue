<template>
  <div style="height: 400px">
    <Bar :data="data" :options="options" type='bar'/>
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
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(PointElement,
  LineElement,CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
      type:'bar',
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10]
    },
    {
      type:'line',
      label: 'Data Two',
      backgroundColor: 'blue',
      data: [50, 61, 30, 10, 60]
    },

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
