import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-calendar]',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  calendarVisible: boolean = false;
  d: any = new Date();
  weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  years: number[] = [
    2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
  ];
  currentDay: any = this.d.getDate();
  monthIndex: any = this.d.getMonth();
  year: any = this.d.getFullYear();
  firstDay: any;
  lastDay: any;
  monthsMenu: boolean = false;
  yearsMenu: boolean = false;
  daySpan: any[] = [];
  selectedDate: number;
  currentDate: number;

  ngOnInit() {
    this.firstLastDays();
  }

  calculateStartEndDate(firstDayOfMonth: number, lastDayOfMonth: number) {
    this.daySpan = [];
    let dayIndex = 1,
      emptyCells = 0;
      // 7 * 6 = 42 (MAX NUMBER OF CELLS)
    for (let i = 0; i < 42; i++) {
      if (firstDayOfMonth > i) emptyCells++;
      this.daySpan.push({
        value:
          i >= firstDayOfMonth && i < emptyCells + lastDayOfMonth
            ? dayIndex++
            : null,
      });
    }
  }

  firstLastDays() {
    this.firstDay = new Date(this.year, this.monthIndex, 1);
    this.lastDay = new Date(this.year, this.monthIndex + 1, 0);
    this.calculateStartEndDate(this.firstDay.getDay(), this.lastDay.getDate());
  }

  selectYear(i: number) {
    this.year = i;
    this.firstLastDays();
    this.checkForFutureDate(this.year, this.monthIndex, this.currentDay);
  }

  selectMonth(i: number) {
    this.monthIndex = i;
    this.firstLastDays();
    this.checkForFutureDate(this.year, this.monthIndex + 1, this.currentDay);
  }

  selectDay(i: number) {
    this.currentDay = i;
    this.currentDay = this.currentDay.value;
    this.checkForFutureDate(this.year, this.monthIndex, this.currentDay);
  }

  openCalendar() {
    this.calendarVisible = true;
  }

  closeCalendar() {
    this.calendarVisible = false;
  }

  showMonths() {
    this.monthsMenu = !this.monthsMenu;
    this.yearsMenu = false;
  }

  showYears() {
    this.yearsMenu = !this.yearsMenu;
    this.monthsMenu = false;
  }

  checkForFutureDate(y: number, m: number, d: number) {
    this.selectedDate = new Date(y, m, d).getTime();
    this.currentDate = new Date().getTime();
    this.currentDate > this.selectedDate
      ? ''
      : console.log('Please select a non future date');
  }
}
