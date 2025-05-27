"use client"

import React, { useState, useEffect, useRef } from 'react';

import { Doughnut } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip
} from 'chart.js'

ChartJS.register(
    ArcElement,
    // Tooltip
)

interface MyChartProps {
  width: number;
  height: number;
  percentages: number[];
  colors: string[]; // Array of colors for the paths
}

const Chart: React.FC<MyChartProps> = ({ width, height, percentages, colors }) => {
  const data = {
    labels: ['Current', 'Projected', 'Target'],
    datasets: [
        {
            label: 'Retirement Corpus',
            data: [30, 50, 20],
            backgroundColor: colors,
            borderColor: ['white'],
            circumference: 180,
            rotation: 270,
            cutout: '80%',
            borderRadius: 20
        }
    ]
  }

  const options = {
    aspectRatio: 2,
    plugins: {
        tooltip: {
            enabled: false
        },
        legend: {
            display: false
        }
    },
    hover: {
        mode: null
    }
  }

  const overlappingSegments = {
    id: "overlappingSegments",
    afterDatasetsDraw(chart: any, args: any, plugins: any) {
        const { ctx, data } = chart
        
        const x = chart.getDatasetMeta(0).data[0].x
        const y = chart.getDatasetMeta(0).data[0].y
        const angle = Math.PI / 180

        const length = data.labels.length - 1;

        ctx.save()
        chart.getDatasetMeta(0).data.forEach((value: any, index: number) => {
            if (index < length) {

                const innerRadius = chart.getDatasetMeta(0).data[index].innerRadius
                const outerRadius = chart.getDatasetMeta(0).data[index].outerRadius
                
                const endAngle = chart.getDatasetMeta(0).data[index].endAngle
        
                const radius = (outerRadius - innerRadius) / 2
        
                const xCoor = (innerRadius + radius)  * Math.cos(endAngle + Math.PI)
                const yCoor = (innerRadius + radius)  * Math.sin(endAngle)
        
                const coordinates = []
    
                for (let i = -0.06; i <= 0.06; i += 0.01) {
                    const xCoor = (innerRadius + radius) * Math.cos(endAngle + Math.PI + i)
                    const yCoor = (innerRadius + radius) * Math.sin(endAngle + i)
    
                    coordinates.push({ x: xCoor, y: yCoor })
                }

                // console.log(coordinates)
        
                ctx.save()
                ctx.fillStyle = data.datasets[0].backgroundColor[index]
                ctx.translate(x, y)
                ctx.beginPath()
                coordinates.forEach(({ x, y }) => {
                    ctx.arc(-x, y, radius - 1, 0, angle * 360, false)
                })
                ctx.fill()
                ctx.restore()
            }
        })
    }
  }

  const plugins = [overlappingSegments]

  return (
    <div>
        <Doughnut
            data={data}
            options={options as any}
            plugins={plugins}
        >
        </Doughnut>
    </div>
  )
};

export default Chart
