<template>
  <div ref="pieChart" class="w-full h-96" />
</template>
<script>
import * as echarts from 'echarts'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    series: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      required: false,
      default: () => []
    },
  },
  mounted() {
    const data_series = this.series.map((item, index) => {
      return {
        value: item,
        name: this.labels[index] + ' - ' + item + '%'
      }
    })
    var option = {
      title: {
        text: this.title,
        subtext: this.subTitle,
        top: '2%', // Đặt legend ở giữa theo chiều dọc
        left: '2%'
      },
      textStyle: {
        fontFamily: 'Arial, sans-serif'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // data: this.labels,
        top: '80%', // Đặt legend ở giữa theo chiều dọc
        // left: '75%', // Đặt legend ở bên phải, cách mép phải 25%
        orient: 'vertical', // Đặt legend theo chiều dọc horizontal/vertical
        align: 'left', // Căn các item của legend vào bên phải
        itemGap: 16
      },
      series: [
        {
          //   name: 'Access From',
          type: 'pie',
          radius: '42%',
          left: '0%',
          right: '0%', // Để đủ chỗ cho chú thích
          bottom: '15%',
          data: data_series,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    if (this.colors.length > 0) {
      option.color = this.colors
    }

    // Khởi tạo biểu đồ
    var myChartPieBrand = echarts.init(this.$refs.pieChart)
    myChartPieBrand.setOption(option)
    if (option && typeof option === 'object') {
      myChartPieBrand.setOption(option)
    }

    window.addEventListener('resize', myChartPieBrand.resize)
  },
  methods: {
    handleClick() {
      console.log('Xem thêm')
    }
  }
}
</script>
