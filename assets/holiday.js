const apiKey = '8BNwUuq4RtWSDwnixUF4E3nEIkV1oPQx';
const country = 'US';
const year = 2024;
const today = dayjs();

const getHolidaysForNextWeek=function(){
        const endOfWeek = dayjs(today)+7; 
        const requestUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
        fetch(requestUrl)
        .then(function (response) {
            return response.json();
          })
        .then(
            function (data) {
                const holidays = data.response.holidays;
                const holidayList = document.createElement("div");
                let count=0;
                for (const holiday of holidays){
                    if (dayjs(holiday.date.iso)>today && dayjs(holiday.date.iso)<today.add(7,"day")) {
                const listItem=document.createElement("li");
                const listDesc=document.createElement("p");
                listItem.textContent=`${holiday.name}: ${holiday.date.iso}`;
                listDesc.textContent=`${holiday.description}`;
                listItem.appendChild(listDesc);
                holidayList.appendChild(listItem);
                console.log(holidayList);
                }
            }
            document.body.appendChild(holidayList);
        }
    );
        
    }         

getHolidaysForNextWeek();
