import { Container, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Line, defaults } from 'react-chartjs-2'
import { connect } from 'react-redux'


const data = (gridfinal) => {
    const data = {
        labels: [],
        datasets: []
    }
    const obj = {
        label: 'No of Zombie homes per day',
        data : [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1'
    }
    const obj1 = {
        label: 'Total No of Zombie homes',
        data : [],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2'
    }
    let sum = 0
    for(let i = 0; i<gridfinal.length;i++){
        sum += gridfinal[i].arr.length
        data.labels.push(i)
        obj.data.push(gridfinal[i].arr.length)
        obj1.data.push(sum)
        // data.datasets.push(gridfinal[i].arr.length.toString())
    }
    data.datasets.push(obj)
    data.datasets.push(obj1)
    return data
}
const options = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            beginAtZero: true,
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
          ticks: {
            beginAtZero: true,
          }
        },
      ],
    },
    legend:{
        labels:{
            fontColor: '#20639b'
        }
    }
}
  
const ZombieChart = ({ gridfinal , initialGrid, useLightMode}) => {
    defaults.global.defaultFontColor = '#9ba3bc'
    return (
        <div>
            
            {initialGrid.length !== 0 && <Container>
                <Typography component='h5' variant='h5'>Zombie Chart</Typography>
                {gridfinal && <Line data={data(gridfinal)} options={options}/> }
            </Container>}
        </div>
    )
}
const mapStateToProps = state => ({
    initialGrid :state.zombieReducer.initialGrid,
    useLightMode: state.uiReducer.useLightMode
})

export default connect(mapStateToProps, null)(ZombieChart)
