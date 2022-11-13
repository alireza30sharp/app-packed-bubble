import { Component, VERSION,OnInit } from '@angular/core';
declare var Highcharts: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit  {
  SocialType = SocialTypeEnum;
  dataChart: any;
  chartModel;
  socialFilter = [
    {
      type: this.SocialType.telegram,
      name: "تلگرام",
      active: true,
      disabled: false,
      color: "#088ef5",
      icon: "fo-telegram-fill"
    },
    {
      type: this.SocialType.twitter,
      name: "توئیتر",
      active: true,
      disabled: false,
      color: "#7067ef",
      icon: "fo-twitter-fill"
    },
    {
      type: this.SocialType.instagram,
      name: "اینستاگرام",
      active: true,
      disabled: false,
      color: "#f6208b",
      icon: "fo-instagram-fill"
    }
  ]
arr:Array<PlatFormViewModel>=[{
FullName:'alireza',
Image:'https://o.remove.bg/uploads/4243de8c-6a6e-4d0f-bc93-e674bf8128c8/3.jpg',
UserName:'a-karimi',
Weight:30,
id:12,
FollowerCount:'90',
SocialName:'insta',
type:1
}]

ngOnInit(){
  this.showData()
}
showData() {
  const data = JSON.parse(JSON.stringify(this.arr));
  this.dataChart = data
    .filter(f => this.socialFilter.filter(s => s.active).map(s => s.type).includes(f.type))
    .map(f => ({ name: f.FullName, value: f.Weight, id:f.id,_data: f }));
  this.drawChart(this.dataChart);
}



drawChart(data) {
console.log(data)
  this.chartModel  = Highcharts.chart('packedBubbleElement', {
    chart: {
      type: 'packedbubble',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      layoutAlgorithm: {
        splitSeries: false,
        enableSimulation: false,
        seriesInteraction: false,
        dragBetweenSeries: false,
        parentNodeLimit: false
      },
    },
    title: { text: '' },
    tooltip:
    {
      backgroundColor: '#262a41',
      headerFormat: '',
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: 0,
      shadow: false,
      outside: true,
      useHTML: true,
      formatter: function () {
        const htm = `<div class="bubble-tootltip-node"><h6>${this.point._data.FullName}</h6>
                    <h6>${this.point._data.UserName}
                    <i class="fontIcon ml-2  fo-${this.point._data.SocialName}"></i></h6>
                    <h6 style="direction: rtl;text-align: right;font-size: 12px;">تعداد دنبال‌کنندگان :${this.point._data.FollowerCount} </h6>
                      </div>`;
          return htm;
      },
      style: { zIndex: 10000 }
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        point: {
          color: '#eeeeee',
          events: {
            click: (function (that) {
              that.point._data.selected = !that.point._data.selected;

              if (that.point._data.selected) {
                this.listPlatFrom.AddItemInListPlatForm.next(that.point._data);
                document.querySelector(`#node-${that.point._data.id}`).classList.add("active");
              } else {
                this.listPlatFrom.RmoveItemInListPlatForm.next(that.point._data);
                document.querySelector(`#node-${that.point._data.id}`).classList.remove("active");
              }
            }).bind(this)
          }
        }
      },
      packedbubble: {
        color: '#eeeeee',
        minSize: '10%',
        maxSize: '200%',
        zMin: 0,
        zMax: 100,
        draggable: false,
        useSimulation: false,
        displayNegative: false,
        layoutAlgorithm: {
          splitSeries: false,
          enableSimulation: false,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: false
        },
        dataLabels: {
          enabled: true,
          useHTML: true,
          align: 'center',
          varticalAlign: 'middle',
          formatter: function () {
            let url = this.point._data.Image || null;
            const w = this.point.marker.width;

            let type = this.point._data.SocialName;

            if (type === "instagram") {
              type = "insta";
            }
            url = `https://o.remove.bg/uploads/4243de8c-6a6e-4d0f-bc93-e674bf8128c8/3.jpg`


            return `<img
                    style="width:${w}px;height:${w}px;top:-${w / 2}px;left:-${w / 2}px"
                    onerror="this.src='assets/img/no-image.png'"
                    src="${url}"
                    class="node-img ${this.point._data.selected ? 'active' : ''} ${this.point._data.SocialName}"
                    id="node-${this.point._data.id}" />`
          }
        }
      }
    },
    series: [{
      name: '',
      data
    }]
  });

}

}




export class PlatFormViewModel {
  id: number;
  PprogressClass?: string;
  Image: string;
  FullName: string;
  UserName: string;
  Weight: number;
  SocialName?: string;
  selected?: boolean = true;
  pt?: number;
  IsFilter?: boolean;
  name?: string;
  value?: number;
  src?: string;
  width?: number;
  link?: string;
  type?: any;
  active?: boolean = true;
  FollowerCount?: string = null;
}
export enum SocialTypeEnum {
  telegram = 1,
  twitter = 2,
  instagram = 3,
  site = 4,
  facebook = 5,

}