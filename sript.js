
'use strict'




class App {



  //UI elements

  calenderContainerUI = document.querySelector('.calender-container')

  itamMarketDayIndicatorUI = document.querySelector('.itam-market-day-indicator')
  


  //------------------------------------------------------------------------


  constructor(year = new Date().getFullYear()){

    

    this.currentYear = year

    this.allItamMarketDayNumbers = this.getAllItamDaysForTheYear(this.currentYear)

    this.allDaysInCurrentYear = this.getAllDaysInCurrentYear(this.currentYear)

    this.AllMonthsInCurrentYear = this.getAllMonthsInCurrentYear()

    this.allItamMarketDayOBJs = this.getallItamMarketDayOBJs(this.allDaysInCurrentYear)

    this.init()

  }

  init(){

    this.calenderContainerUI.innerHTML = ''
    this.calenderContainerUI.innerHTML = this.renderMonthDates(this.AllMonthsInCurrentYear)
    this.ItamMarketDayChecker()

    this.scrollToCurrentMonth()
    
  }

  getallItamMarketDayOBJs(allDaysOfYear){

    const itamDays = []

    allDaysOfYear.forEach(function(day){
      if(day.isItamDay === true) itamDays.push(day)
    })

    return itamDays

  }

  ItamMarketDayChecker(){

    const datify = function(str){
      if(str[-1] === '1'){
        str += 'st'
      }else if(str[-1] === '2'){
        str += 'nd'
      }else if(str[-1] === '3'){
        str += 'rd'
      }else{
        str += 'th'
      }

      return str
    }
    

    const isMarketDay = this.allItamMarketDayOBJs.some(day => day.isToday === true)


    if(!isMarketDay){
      
      
      this.itamMarketDayIndicatorUI.style.color = 'black'

      const todayIndex = this.allDaysInCurrentYear.findIndex(function(day){
        return new Date().getMonth() === day.monthIndex  && new Date().getDate() === day.date
      })

      const nextItamDay = this.allDaysInCurrentYear.find(function(day, index){
        return index > todayIndex  && day.isItamDay
      })

      this.itamMarketDayIndicatorUI.textContent = `Next Itam day is ${nextItamDay.day }, ${datify(''+nextItamDay.date) } ${nextItamDay.month }`
      
    }else{
      
      this.itamMarketDayIndicatorUI.textContent = 'Today is ITAM Market'

      this.itamMarketDayIndicatorUI.style.color = 'red'
    }

    

    

    

  }



  renderMonthDates(monthInYear){

    

    let yearCalHTML = ``

    const addDaysBeforeCurrentMonth = function(month){

      let html =''

      const firstDayIndex = month.daysOfThisMonth[0].dayIndex
      let date = month.lastDateInLastMonth

      date -= firstDayIndex

      for (let i = 0; i < firstDayIndex; i++) {

        html += `<div class="calender-days--day-container other-month-days"><span class="day">${date + 1}</span></div>`
        date++
        
      }

      return html

    }

    const getDaysOfThisMonthUI = function(month){

      let html = ''

      month.daysOfThisMonth.forEach(function(day){

        if(day.isToday === true){

          if(day.isItamDay === true){

            html += `<div class="calender-days--day-container itam-day-container today-day-container"><span class="day">${day.date}</span></div>`
  
          }else{
            html += `<div class="calender-days--day-container today-day-container"><span class="day">${day.date}</span></div>`
          }

        }else{

          if(day.isItamDay === true){

            html += `<div class="calender-days--day-container itam-day-container"><span class="day">${day.date}</span></div>`
  
          }else{
            html += `<div class="calender-days--day-container"><span class="day">${day.date}</span></div>`
          }
        }
        
      
      })

      return html
    }

    const addremainingDays = function(month){

      let html =''

      const firstDayIndex = month.daysOfThisMonth[0].dayIndex

      const remainingPagesCount = 42 - (firstDayIndex + month.daysOfThisMonth.length)
      
      let dayNum = 1

      for (let i = 0; i < remainingPagesCount; i++) {

        
        
        html += `<div class="calender-days--day-container other-month-days"><span class="day">${dayNum}</span></div>`
        dayNum++
        
      }

      return html

    }

    monthInYear.forEach(function(month){

      let singleCalHTML = ``

      let monthsDayHTML = ``

      monthsDayHTML += addDaysBeforeCurrentMonth(month)

      monthsDayHTML += getDaysOfThisMonthUI(month)

      monthsDayHTML += addremainingDays(month)
      



      singleCalHTML += `
      <div class="calender " id ="${month.monthTitle}">
        <h3 class="calender-month-title" >${month.monthTitle}</h3>
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
          ${monthsDayHTML}
        </div>
      </div>
      
      `
      yearCalHTML += singleCalHTML

      



    })

    return yearCalHTML


  }

  
  getAllItamDaysForTheYear(year, firstItamDay = 2){

    const allItamDaysForTheYear = []
    let currItamDay = firstItamDay
    while (currItamDay < 365) {

      if(new Date(year, 0,currItamDay).getDay() === 0){
        allItamDaysForTheYear.push(currItamDay + 1)
      }else{
        allItamDaysForTheYear.push(currItamDay)
      }

      
      currItamDay += 8
    }

    if(allItamDaysForTheYear[-1] > 365) allItamDaysForTheYear.pop()

    return allItamDaysForTheYear
  }


  getAllDaysInCurrentYear(year){

    const days = []
    
    let runningDayNumber = 1

    while (runningDayNumber <= 365) {
      if(this.allItamMarketDayNumbers.includes(runningDayNumber)){
        days.push(new Day(runningDayNumber, true))
      }else{
        days.push(new Day(runningDayNumber, false))
      }

      runningDayNumber ++
      
    }

    return days
  }

  getAllMonthsInCurrentYear(){

    const monthOfAYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    

    const thisBinderMap = function(month){
      const dayOM = []

      this.allDaysInCurrentYear.forEach(function(day){
        if(day.month === month) dayOM.push(day)

      })

      dayOM.sort(function(a,b){
        return a.date - b.date
      })
      
      


      return {
        monthTitle : month,
        daysOfThisMonth : dayOM
      }
    }

    const placeHolderArr = monthOfAYear.map(thisBinderMap.bind(this))

    return placeHolderArr.map(function(month, index, currArr){

      return {
        monthTitle : month.monthTitle,

        daysOfThisMonth : month.daysOfThisMonth,

        lastDateInLastMonth : month.monthTitle === 'January' ? 31 : currArr[index - 1].daysOfThisMonth.length
      }
    })
  }

  scrollToCurrentMonth(){
    const today = this.allDaysInCurrentYear.find(function(day){
      if(day.isToday === true) return day
    })

    const thisMonth = today.month

    let options = {
      root: null,
      threshold: 1,
    };
    
    const alerter = function(entries, observer){
    
      const [entry] = entries

      if(entry.isIntersecting === false){
        

        document.querySelector(`#${thisMonth}`).scrollIntoView({ behavior: 'smooth', block:'center' });

      }
    
      // console.log(entry);
    }
    
    let observer = new IntersectionObserver(alerter, options);
    
    let target = document.querySelector(`#${thisMonth}`);
    observer.observe(target);
    
    
  }

  
  

  
}


class Day {
  
  isWeekend = false;
  constructor(dayNumber, isItamDay){

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOfAYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    this.monthIndex = new Date(2023, 0,dayNumber).getMonth()
    this. date = new Date(2023, 0,dayNumber).getDate()
    this.dayIndex = new Date(2023, 0,dayNumber).getDay()
    this.day = weekDays[new Date(2023, 0,dayNumber).getDay()]
    this.month = monthOfAYear[this.monthIndex]
    this.isItamDay = isItamDay

    if(this.day === 'Saturday' || this.day === 'Sunday') this.isWeekend = true

    this.isToday = true ? new Date().getMonth() === this.monthIndex  && new Date().getDate() === this.date : false

  }
}

const cal =  new App()




