import { Component, OnInit } from '@angular/core';
import { AdgroupsService } from '../../../api/adgroups/adgroup.service';
import { Router } from '@angular/router';
declare const Chart;
@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss'],
    providers : [AdgroupsService]
})

export class DashboardCrmComponent implements OnInit {

    barLabel : string[] = [];
    barData : number[] = [];
    zdata : boolean[]= [];

    constructor(private adgroupsService: AdgroupsService, public router : Router) {
        if(localStorage.getItem('Token') == undefined || null || ""){
            this.router.navigate(['../login']);
        } else {
            this.router.navigate(['/auth/dashboard']);
        }
     }

    ngOnInit() {
        this.adgroupsService.barChart().then(data => {
            if(data.status){
                
                for(var i = 0 ; i < data.data.length ; i++){
                    var d1 = data.data[i]._id.day + '-' + data.data[i]._id.month + '-' + data.data[i]._id.year;
                    var d2 =  data.data[i].count;
                    this.barLabel.push(d1);
                    this.barData.push(d2);
                    
                }
            }
            
        })
        setTimeout(() => {
            this.createChart();
        }, 400)
    }
    createChart() {
        console.log(this.barData);
        new Chart('chart-0', {
            type: 'bar',
            data: {
                labels: this.barLabel,      // X- date array  length - 3
                datasets: [
                    {
                        backgroundColor: '#D32F2F' + 'BF',
                        borderColor: '#D32F2F',
                        data: this.barData,    // Y- Count 
                        label: 'Dataset',
                        fill: 'false'
                    },
                    {
                        
                        data: this.barData,
                        type: 'line'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                elements: {
                    line: {
                        tension: 0.000001
                        // tension: 1.0
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                    filler: {
                        propagate: true
                    }
                },
                title: {
                    display: true,
                    text: 'ACTIVE'
                },

                scales: {
                    xAxes: [{
                        barPercentage: 0.5,
                        barThickness: 50,
                        maxBarThickness: 50,
                        minBarLength: 2,
                        gridLines: {
                            offsetGridLines: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 10
                        }
                    }]
                }
            }
        })
    }

}
