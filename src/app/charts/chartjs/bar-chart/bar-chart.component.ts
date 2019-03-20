import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const Chart;
@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {
        setTimeout(() => {
            this.createChart();
        }, 400)
    }
    createChart() {
        new Chart('chart-0', {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],  // date array  length - 3
                datasets: [
                    {
                        backgroundColor: '#D32F2F' + 'BF',
                        borderColor: '#D32F2F',
                        data: [0, 1, 2, 15, 4, 5, 6, 7], // Count // length - 3
                        label: 'Dataset',
                        fill: 'false'
                    },
                    // {
                    //     backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    //     borderColor: 'rgba(255, 99, 132)',
                    //     data: [0, 1, 2, 3, 4, 5, 6, 7],
                    //     // data: [-76.97, 46.91, 32.31, -7.19, -9.85, -76.91, -50.36, 42.66],
                    //     label: 'Dataset',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    //     borderColor: 'rgba(255, 99, 132)',
                    //     data: [0, 1, 2, 3, 4, 5, 6, 7],
                    //     // data: [-76.97, 46.91, 32.31, -7.19, -9.85, -76.91, -50.36, 42.66],
                    //     label: 'Dataset',
                    //     fill: 'false'
                    // },
                    // {
                    //     backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    //     borderColor: 'rgba(255, 99, 132)',
                    //     data: [0, 1, 2, 3, 4, 5, 6, 7],
                    //     // data: [-76.97, 46.91, 32.31, -7.19, -9.85, -76.91, -50.36, 42.66],
                    //     label: 'Dataset',
                    //     fill: 'false'
                    // }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'SALES GRAPH'
                }
            }
        })
    }
}
