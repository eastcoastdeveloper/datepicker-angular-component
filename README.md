## Angular Custom Date Picker Component ##

A fully custom, Angular date-picker component built with HTML, SCSS, and TypeScript.
This component provides:

A dropdown calendar

Month & year selectors

Highlighting of the current day

Prevention of selecting future dates

A 6×7 (42-cell) grid that dynamically renders all days of the selected month

A clean UI wrapper matching standard Angular component patterns

### Directory Structure ###
/src/app/date-picker/

│── date-picker.component.html

│── date-picker.component.scss

│── date-picker.component.ts

Include the date picker inside any page using:

```
<div class="date-picker">
  <div app-calendar></div>
</div>
```

### Features ###

#### Custom Calendar Renderer ####

Builds a 42-cell date grid (6 weeks) including leading/trailing blank cells for alignment.

#### Month & Year Dropdowns ####

Click the month or year to toggle dropdown menus.

#### Current Date Highlight ####

Automatically highlights today’s date.

#### Future Date Restriction ####

Selecting a future date triggers an alert.

#### Simple, Reusable Markup ####

Can be dropped into any Angular component with minimal setup.

### Usage ###

```
<div id="calendar-component">
  <input
    type="text"
    placeholder="Select a date..."
    (focus)="openCalendar()"
    [ngClass]="{ 'future-date': selectedDate > currentDate }"
    value="{{ months[monthIndex] + ' ' + currentDay + ', ' + year }}"
  />

  <div *ngIf="calendarVisible" class="calendar">
    <!-- Navigation -->
    <nav>
      <div class="close-calendar" (click)="closeCalendar()">
        <span>&#x2715;</span>
      </div>

      <!-- Month selector -->
      <div class="month" (click)="showMonths()">
        <span>{{ months[monthIndex] }}</span>
        <div class="caret" [ngClass]="{ rotate: monthsMenu }"></div>
        <ul *ngIf="monthsMenu">
          <li *ngFor="let month of months; let i = index" (click)="selectMonth(i)">
            {{ month }}
          </li>
        </ul>
      </div>

      <!-- Year selector -->
      <div class="year" (click)="showYears()">
        <span>{{ year }}</span>
        <div class="caret" [ngClass]="{ rotate: yearsMenu }"></div>
        <ul *ngIf="yearsMenu">
          <li *ngFor="let year of years" (click)="selectYear(year)">
            {{ year }}
          </li>
        </ul>
      </div>
    </nav>

    <!-- Weekdays -->
    <div class="weekdays">
      <ul>
        <li *ngFor="let day of weekdays">{{ day }}</li>
      </ul>
    </div>

    <!-- Day Grid -->
    <div class="all-days-skeleton">
      <div
        *ngFor="let day of daySpan"
        (click)="selectDay(day)"
        [ngClass]="{
          'has-value': day.value != null,
          'current-date': day.value === currentDay
        }"
      >
        <div class="day-value">{{ day.value }}</div>
      </div>
    </div>
  </div>
</div>
```

### Component Logic (date-picker.component.ts) ###

The component handles:

Calculating first/last day of each month

Generating a 42-cell matrix

Toggling calendar visibility

Selecting month/year/day

Blocking future dates

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-calendar]',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  calendarVisible = false;
  d = new Date();

  weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Set Years
  years = [
    2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
  ];

  currentDay = this.d.getDate();
  monthIndex = this.d.getMonth();
  year = this.d.getFullYear();

  firstDay: any;
  lastDay: any;

  monthsMenu = false;
  yearsMenu = false;

  daySpan: any[] = [];

  selectedDate: number;
  currentDate: number;

  ngOnInit() {
    this.firstLastDays();
  }

  calculateStartEndDate(firstDayOfMonth: number, lastDayOfMonth: number) {
    this.daySpan = [];
    let dayIndex = 1, emptyCells = 0;

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

  selectYear(year: number) {
    this.year = year;
    this.firstLastDays();
    this.checkForFutureDate(year, this.monthIndex, this.currentDay);
  }

  selectMonth(i: number) {
    this.monthIndex = i;
    this.firstLastDays();
    this.checkForFutureDate(this.year, this.monthIndex + 1, this.currentDay);
  }

  selectDay(dayObj: any) {
    this.currentDay = dayObj.value;
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

    if (this.selectedDate > this.currentDate) {
      alert('Please select a non future date');
    }
  }
}
```

### License ###

MIT — free to use, modify, and integrate into any Angular project.



