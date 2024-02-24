import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

export class DoughnutChart extends React.Component {
    render() {
        const labels = [];
        const data = [];

        for(let key in this.props.data){
            labels.push(key.toUpperCase());
            data.push(this.props.data[key])
        }
        const config = {
      labels,
      datasets: [
        {
//          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data,
          borderDash: [0],
          borderWidth: 0,
          cutout: "95%"
        }
      ]
    }

        return (
            <div className="chart">
                <Doughnut
                    data={config}
                    options={ {
                        plugins: {
                            title:{
                                display:false,
                                text:'Average Rainfall per month',
                                fontSize:20
                            },
                            legend:{
                                display: true,
                                position:'right'
                            }
                        },
                        responsive: true,
                        aspectRatio: 3,
                        maintainAspectRatio: true
                    } }
                />
            </div>
        );
  }
}

export class LineChart extends React.Component {
    render() {
        const labels = [];
        const data = [];

        for(let key in this.props.data){
            labels.push(key.toUpperCase());
            data.push(this.props.data[key])
        }
        const config = {
            labels,
                datasets: [
                    {
//                        label: 'Rainfall',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: this.props.color ? this.props.color : '#e2ad0a',
                        borderWidth: 1,
                        data,
                    }
                ]
        }

        return (
          <div>
            <Line
              data={ config }
              options={
                {
                    plugins: {
                        title:{
                            display: false,
//                            text:'Average Rainfall per month',
                            fontSize:8
                        },
                        legend:{
                            display:false,
                            position:'right'
                        }
                    },
                    responsive: true,
//                    aspectRatio: 3,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                             grid: {
                                display: false,
                             },
                             ticks: {
                                display: false,
                             },
                             border: {
                               display: false,
                             },
                        },
                        y: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                               display: false,
                            },
                             border: {
                               display: false,
                             },
                        }
                    },
                    elements: {
                        point:{
                            radius: 0
                        }
                    }
                  }
              }
            />
          </div>
        );
    }
}