import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, OnInit,
  AfterViewInit 
  } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit ,OnChanges  {
  @Input() data: any[] = [];
  @ViewChild('chart') chartElement: ElementRef | undefined;

  chartType = 'bar';
  chartTitle: string = '';
  chartTitleInput: string = '';
  chartOptions: any;
  selectedFormat: string = 'image';
  enableDownload: boolean = false;
  headers: string[] = [];
  selectedHeaders: string[] = [];
  xAxisKey: string = '';
  showMessage = false;

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length) {
      this.headers = Object.keys(this.data[0]);
      this.selectedHeaders = [...this.headers];
      this.xAxisKey = this.headers[0];
      this.chartTitle = '';
      this.chartTitleInput = '';

      this.generateChart();
      this.showSuccessMessage();
    }
  }

  showSuccessMessage(): void {
    this.enableDownload = true;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  toggleHeader(header: string): void {
    const index = this.selectedHeaders.indexOf(header);

    if (header === this.xAxisKey) {
      return;
    }

    if (this.selectedHeaders.length === 2 && index > -1) {
      return;
    }

    if (index > -1) {
      this.selectedHeaders.splice(index, 1);
    } else {
      this.selectedHeaders.push(header);
    }

    this.generateChart();
  }

  updateXAxis(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.xAxisKey = selectElement.value;
    this.generateChart();
  }

  updateChartTitle(): void {
    this.chartTitle = this.chartTitleInput;
    this.generateChart();
  }

  generateChart(): void {
    if (!this.data || this.data.length === 0) {
      console.error('JSON data is empty or undefined.');
      return;
    }

    const seriesKeys = this.selectedHeaders.filter(header => header !== this.xAxisKey);

    const xAxisData = this.data.map(item => item[this.xAxisKey]);
    const seriesData = seriesKeys.map(header => {
      const seriesValues = this.data.map(item => {
        const value = item[header];
        return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
      });

      return {
        name: header,
        type: this.chartType,
        data: seriesValues
      };
    });

    // Set up the chart options
    this.chartOptions = {
      backgroundColor: '#ffffff',
      title: {
        text: this.chartTitle === '' ? 'Data Visualization' : this.chartTitle,
        left: 'center',
        top: 'top', 
        padding: [0, 0, 20, 0], 
      },
      tooltip: {
        trigger: this.chartType === 'pie' ? 'item' : 'axis'
      },
      legend: {
        data: seriesKeys, // These are the names of the series
        top: '7%',
      },
      xAxis: this.chartType !== 'pie' ? {
        type: 'category',
        data: xAxisData
      } : undefined,
      yAxis: this.chartType !== 'pie' ? {
        type: 'value'
      } : undefined,
      series: this.chartType === 'pie' ? [
        {
          type: 'pie',
          radius: '50%',
          data: seriesKeys.map(header => ({
            value: this.data.reduce((sum, item) => sum + parseFloat(item[header] || 0), 0),
            name: header
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ] : seriesData
    };
    this.enableDownload = true;
  }

  downloadChart(formatType : string): void {
    this.selectedFormat = formatType;
    if (this.chartElement) { 
      const chart = this.chartElement.nativeElement;
      switch (this.selectedFormat) {
        case 'image':
          this.downloadImage(chart);
          break;
        case 'pdf':
          this.downloadPDF(chart);
          break;
        case 'ppt':
          this.downloadPPT(chart);
          break;
      }
    } else {
      console.error('Chart element is not defined');
    }
  }

  private downloadImage(chart: HTMLElement): void {
    htmlToImage.toPng(chart)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = this.chartType + '_chart.png';
        link.click();
      });
  }

  private downloadPDF(chart: HTMLElement): void {
    htmlToImage.toPng(chart)
      .then((dataUrl) => {
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297); 
        pdf.save(this.chartType + '_chart.pdf');
      });
  }

  private downloadPPT(chart: HTMLElement): void {
    htmlToImage.toPng(chart)
      .then((dataUrl) => {
        const pptx = new pptxgen();
        const slide = pptx.addSlide();
        slide.addImage({ data: dataUrl, x: 1, y: 1, w: 8, h: 4.5 });
        pptx.writeFile({ fileName: this.chartType + '_chart.pptx' });
      });
  }
}
