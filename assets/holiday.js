const apiKey = 'lGbpFvBDHMya0SxraF514q9D9Za18ZWq';
const country = document.getElementById("country");


const year = 2024;
const today = dayjs();

const getHolidaysForNextWeek=function(){
    const endOfWeek = dayjs(today)+7; 
    const requestUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country.value}&year=${year}`;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(
       
        function (data) {
            console.log(data);
            const holidays = data.response.holidays;
            const holidayList = document.createElement("div");
            holidayList.classList.add("holiday-list"); 
            for (const holiday of holidays){
                if (dayjs(holiday.date.iso)>today && dayjs(holiday.date.iso)<today.add(10,"day")) {
            const holidayCard = document.createElement("div");
            holidayCard.classList.add("holiday-card"); 

            const cardHeader = document.createElement("h3");
            const cardDate = dayjs(holiday.date.iso).format("MMM-DD"); 
            cardHeader.textContent = cardDate;
            holidayCard.appendChild(cardHeader);

            const cardDesc = document.createElement("h4");
            cardDesc.textContent = holiday.name;
            holidayCard.appendChild(cardDesc);

            const cardDescFull = document.createElement("p");
            cardDescFull.textContent = `Description: ${holiday.description}`;
            holidayCard.appendChild(cardDescFull);

            holidayList.appendChild(holidayCard);
            }
        }
        document.body.appendChild(holidayList);
    }
);
    
}        

getHolidaysForNextWeek();
