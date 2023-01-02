
"use strict"

const currentMonthUI = document.querySelector('.current_month')
const currentDayDateUI = document.querySelector('.todays-date--date')
const monthDaysUI = document.querySelector('.month-days')
const mainContainer = document.querySelector('.main-container')

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


let itamDate = 2
let recordedItamDay = new Date(2023, 0, 2);




const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();




const getMonthData = function(year, month){

  const monthData = {
    
    year,
    currentMonth : month,
    prevMonth : month - 1,
    nxtMonth : month + 1,
    currentMonthDays : [],
    currentMonthItamDays : [],
    prevMonthDays : [],
    nxtMonthDays : [],
    firstDay : weekDays[new Date(year,month,1).getDay()],
    lastDay  : weekDays[new Date(year,month,getLastDateOfMonth(year,month)).getDay()],

    purpulateMonthsData(month){

      for (let date = 1; date <= getLastDateOfMonth(year,month); date++) {

        if(month === this.currentMonth) monthData.currentMonthDays.push([date, weekDays[new Date(year,month,date).getDay()]])
        if(month === this.prevMonth) monthData.prevMonthDays.push([date, weekDays[new Date(year,month,date).getDay()]])
        if(month === this.nxtMonth) monthData.nxtMonthDays.push([date, weekDays[new Date(year,month,date).getDay()]])
        
      }
    },

    purpulateItamDays(){

      monthData.currentMonthItamDays.push(recordedItamDay.getDate())
    

      const increaseAndPush = function(day, isSunday = false){

        
        isSunday === true ? monthData.currentMonthItamDays.push(day[0] + 1) : monthData.currentMonthItamDays.push(day[0])
        itamDate += 8
        recordedItamDay = new Date(2023, 0, itamDate);
      }

      itamDate += 8
      recordedItamDay = new Date(2023, 0, itamDate);

      for (let day of this.currentMonthDays ) {

        if(day[0] === recordedItamDay.getDate()){

          
          if(day[1] !== 'Sunday'){
            
            increaseAndPush(day)

          }else{

            increaseAndPush(day, true)


          }
        }

        
        
      }
      
    }
  }


  monthData.purpulateMonthsData(monthData.currentMonth)
  monthData.purpulateMonthsData(monthData.prevMonth)
  monthData.purpulateMonthsData(monthData.nxtMonth)

  monthData.purpulateItamDays()


  return monthData
}

const generateItamDaysForTheYear = function(year = new Date().getFullYear(), FirstItamDay = 2){

  const itamDaysForTheYear = [
    ["January", []],
    ["February", []],
    ["March", []],
    ["April", []],
    ["May", []],
    ["June", []],
    ["July", []],
    ["August", []],
    ["September", []],
    ["October", []],
    ["November", []],
    ["December", []],
  ]


  

  let generatedDate = new Date(year, 0,FirstItamDay)

  for (let day = 1; day <= 365; day++){

    
    if(day === FirstItamDay){

      if(weekDays[generatedDate.getDay()] === 'Sunday'){
        
        FirstItamDay += 1

        generatedDate = new Date(year, 0,FirstItamDay)

        for (let month = 0; month < 12; month++){

          if(months[generatedDate.getMonth()] === itamDaysForTheYear[month][0]){
            
            itamDaysForTheYear[month][1].push(generatedDate.getDate())
            
          }
          
        }

        FirstItamDay -= 1
        generatedDate = new Date(year, 0,FirstItamDay)

      }else{

      
        for (let month = 0; month < 12; month++){

          if(months[generatedDate.getMonth()] === itamDaysForTheYear[month][0]){

            itamDaysForTheYear[month][1].push(generatedDate.getDate())
          
          }

        }

      }

      FirstItamDay += 8
      generatedDate = new Date(year, 0,FirstItamDay)

    }
  
  }


  return itamDaysForTheYear
}





const setCurrentMonthAndDateUI = function(){
  currentMonthUI.textContent = months[new Date().getMonth()]

  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  currentDayDateUI.textContent = new Intl.DateTimeFormat(navigator.language,options).format(new Date());
}




const fullMonthAndYear = (dateToWorkWith = new Date()) => [dateToWorkWith.getFullYear(),dateToWorkWith.getMonth() === 0 ? dateToWorkWith.getMonth() + 1 : dateToWorkWith.getMonth()]




const purpulateDaysOfMonth = function(monthData){
  
  
  

  // monthDaysUI.innerHTML = '';

  let monthDaysHTML =''



  const beforeDates = monthData.prevMonthDays.slice(-weekDays.indexOf(monthData.firstDay));


  const afterDates = monthData.nxtMonthDays.slice(0, 7 - (weekDays.indexOf(monthData.lastDay) + 1));



  beforeDates.length < 7 && beforeDates.forEach(day =>  monthDaysHTML +=`<div class="day-date prev-or-nxt">${day[0]}</div>`)

  console.log(monthData.currentMonthDays);
  
  monthData.currentMonthDays.forEach(day => {
    const checkForToday = new Date().getFullYear() === new Date(monthData.year, monthData.currentMonth).getFullYear() &&
    new Date().getMonth() === new Date(monthData.year, monthData.currentMonth).getMonth() &&
    new Date().getDate() === day[0]

    for(const [month, itamDays] of generateItamDaysForTheYear(monthData.year)){
      if(month === months[monthData.currentMonth]){
        if(checkForToday && itamDays.includes(day[0])){
          monthDaysHTML +=`<div class="day-date today-and-itam-day">${day[0]}</div>` 
        }else  if(itamDays.includes(day[0])){
          monthDaysHTML +=`<div class="day-date itam-day">${day[0]}</div>` 
        }else if(checkForToday){
          monthDaysHTML +=`<div class="day-date today">${day[0]}</div>` 
        }else {
          monthDaysHTML +=`<div class="day-date">${day[0]}</div>`
        }
      }
    }
    
    
  })

  afterDates.length < 7 && afterDates.forEach(day =>  monthDaysHTML +=`<div class="day-date prev-or-nxt">${day[0]}</div>`)

  return monthDaysHTML
  
  
  
}


//launch
// setCurrentMonthAndDateUI()

// Get days of current month

const loadPage = function(calenderCount, year, month){

  

  mainContainer.innerHTML = '';


  --month



  for (let count = 0; count < calenderCount; count++) {

    const monthData = getMonthData(year, month)

    let displayMOnthUI = monthData.currentMonth

    if(displayMOnthUI === -1){
      displayMOnthUI = 11
    }else if(displayMOnthUI === 12){
      displayMOnthUI = 0
    }


    const containerHTML = 
    `<div class="calender-container">
      <div class="month">
        <div class="month-nav month-prev">&#60;</div>
        <div class="month-title current_month">${months[displayMOnthUI]}</div>
        <div class="month-nav month-next">&#62;</div>
      </div>
      <div class="days">
        <span class="week-days sunday">Su</span>
        <span class="week-days monday">Mo</span>
        <span class="week-days tuesday">Tu</span>
        <span class="week-days wednesday">We</span>
        <span class="week-days thursday">Th</span>
        <span class="week-days friday">Fr</span>
        <span class="week-days saturday">Sa</span>
      </div>
      <div class="month-days">
        ${purpulateDaysOfMonth(getMonthData(year,month))}
      </div>
    </div>`



    mainContainer.insertAdjacentHTML('beforeend',containerHTML)
    
    month++
    
  }
}



loadPage(3,...fullMonthAndYear())








console.log(generateItamDaysForTheYear());
