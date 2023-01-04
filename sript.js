
'use strict'

//UI elements

const itamMarketDayIndicatorUI = document.querySelector('.itam-market-day-indicator')
const calenderContainerUI = document.querySelector('.calender-container')

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthOfAYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



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
  
            if(monthOfAYear[generatedDate.getMonth()] === itamDaysForTheYear[month][0]){
              
              itamDaysForTheYear[month][1].push(generatedDate.getDate())
              
            }
            
          }
  
          FirstItamDay -= 1
          generatedDate = new Date(year, 0,FirstItamDay)
  
        }else{
  
        
          for (let month = 0; month < 12; month++){
  
            if(monthOfAYear [generatedDate.getMonth()] === itamDaysForTheYear[month][0]){
  
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

const createCalender = function(thisYear = new Date(),itamDaysForTheYear = generateItamDaysForTheYear()){

    const calender = {
        year : thisYear.getFullYear(),
        months : [],
        today: [weekDays[new Date().getDay()], thisYear.getDate(), [thisYear.getMonth(),monthOfAYear[thisYear.getMonth()]], thisYear.getFullYear()]


    }

    monthOfAYear.forEach(function(month, monthIndex){

        let days = []
    
        for (let date = 1; date <= new Date(thisYear.getFullYear(), monthIndex + 1, 0).getDate(); date++){
            
            days.push([date, weekDays[new Date(thisYear.getFullYear(), monthIndex,date).getDay()]])
        }

        calender.months.push({index: monthIndex, title:month, totalMonthDays: new Date(thisYear.getFullYear(), monthIndex + 1, 0).getDate(), days: days, itamDays: itamDaysForTheYear.find(monthArray => monthArray[0] === month)[1]})
    })

    return calender

    
    
    

            
    
            

    

    

}





createCalender()

const loadCalender = function(calender){

  calenderContainerUI.innerHTML = ''
  let html = ''
  calender.months.forEach(function(monthOBJ){
    let monthDays = ''

    if(monthOBJ.days[0][1] !== 'Sunday'){
      monthDays += `<div class="calender-days--day-container"><span class="day"> </span></div>`.repeat(weekDays.indexOf(monthOBJ.days[0][1])) 
    }

    for(const day of monthOBJ.days){

      

      const isToday = calender.today[0] === day[1] && calender.today[1] === day[0] && calender.today[2][1] === monthOBJ.title
      
      if(monthOBJ.itamDays.includes(day[0]) && isToday ){
        monthDays += `<div class="calender-days--day-container today-day-container itam-day-container"><span class="day">${day[0]}</span></div>`
      }else if(monthOBJ.itamDays.includes(day[0]) ){
        monthDays += `<div class="calender-days--day-container itam-day-container"><span class="day">${day[0]}</span></div>`
      }else if(isToday ){
        monthDays += `<div class="calender-days--day-container today-day-container"><span class="day">${day[0]}</span></div>`
      }else{
        
        monthDays += `<div class="calender-days--day-container"><span class="day">${day[0]}</span></div>`
      }

    } 


    const currentMonth = `
    <div class="calender">
    <h3 class="calender-month-title">${monthOBJ.title}</h3>
    <div class="week-days">
        <span class="week-days--day">Su</span>
        <span class="week-days--day">Mo</span>
        <span class="week-days--day">Tu</span>
        <span class="week-days--day">We</span>
        <span class="week-days--day">Th</span>
        <span class="week-days--day">Fr</span>
        <span class="week-days--day">Sa</span>
    </div>
    <div class="calender-days">
        ${monthDays}  
    </div>
    </div>
    
    `
    html += currentMonth;

  })

  calenderContainerUI.innerHTML = html

  const allItamMarketDays = []

  calender.months.forEach(month => allItamMarketDays.push([month.title, month.itamDays]))


  const TodayIsItamDay = calender.months.find(month => month.title === calender.today[2][1]).itamDays.includes(calender.today[1])
  let nextItamDay = new Date()

  if(calender.today[1] >= calender.months.find(month => month.title === calender.today[2][1]).itamDays[-1]){
    const nxtMontOBJ = calender.months.find(month => month.index === calender.months.find(month => month.title === calender.today[2][1]) + 1)
    nextItamDay = new Date(calender.year,nxtMontOBJ.index,nxtMontOBJ.itamDays[0])
  }else{
    nextItamDay = new Date(calender.year,calender.months.find(month => month.title === calender.today[2][1]).index,calender.months.find(month => month.title === calender.today[2][1]).itamDays.find(day => day > calender.today[1]))
  }


  
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: 'long',
  };

  TodayIsItamDay ? itamMarketDayIndicatorUI.textContent = `Today is ITAM Market Day !!!` : itamMarketDayIndicatorUI.textContent = `Next Market day is: ${new Intl.DateTimeFormat(navigator.language, options).format(nextItamDay)}`



}

loadCalender(createCalender())

