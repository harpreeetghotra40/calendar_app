let lookAhead = 0;
let eventDate = null;
let requiredDay = null;
//adds eventListeners to '+ add new event btns'

function addEventListen() {
    let newEventBtns = document.querySelectorAll('.new-event');
    for (var i = 0; i < newEventBtns.length; i++) {
        newEventBtns[i].addEventListener('click', getEventTime);
    }
}
addEventListen();

function getEventTime(event) {
    eventDate = event.target.parentElement.parentElement.dataset.today;
    requiredDay = event.target.parentElement.parentElement;
    console.log(requiredDay);
}

document.addEventListener("DOMContentLoaded", function () {
    fetch(`http://localhost:3000/calendars/1`)
        .then(res => res.json())
        .then(res => {
            const calendarTitle = document.querySelector('.my-navbar p');
            calendarTitle.innerText = res.name;
            assignDays(lookAhead);
        })
})

function assignDays(iterator) {
    const days = document.querySelectorAll('.days');
    let thisWeek = moment().week() + iterator - 1;
    let todayNum = thisWeek * 7;
    let today = moment().dayOfYear(todayNum)._d;
    days.forEach(day => {
        day.dataset.dayOfYear = todayNum++;
        day.dataset.today = moment().dayOfYear(day.dataset.dayOfYear);
        assignShortDayDesc(day);
        removeEventsFromDay(day)
        fetch(`http://localhost:3000/events/1`)
            .then(res => res.json())
            .then(res => res.forEach(event => {
                let newDate = new Date(event.timing);
                let reqDate = new Date(day.dataset.today);
                if (validateDate(newDate, reqDate)) {
                    addEventToDay(event, day)
                }
            }));
    });
}

function assignShortDayDesc(day) {
    day.childNodes.forEach(childNode => {
        if (childNode.classList != null && childNode.classList.value.includes("day-short-desc")) {
            childNode.innerText = day.dataset.today.split(" ").slice(1,4).join(" ");
        }
    })
}

function removeEventsFromDay(day) {
    day.childNodes.forEach(node => {
        if (node.classList != null && node.classList.value.includes("events-container")) {
            node.childNodes.forEach(eventNode => {
                if (eventNode.classList != null) {
                    if (eventNode.classList.value.includes("day-events")) {
                        eventNode.innerHTML = "";
                    }
                }
            });
        }
    });
}

function addEventToDay(event, day) {
    day.childNodes.forEach(node => {
        if (node.classList != null) {
            if (node.classList.value.includes("events-container")) {
                node.childNodes.forEach(eventNode => {
                    if (eventNode.classList != null) {
                        if (eventNode.classList.value.includes("day-events")) {
                            let insertElement = document.createElement('div')
                            insertElement.classList.add('event');
                            insertElement.setAttribute('draggable', true);
                            insertElement.innerText = event.name;
                            eventNode.appendChild(insertElement);
                        }
                    }
                });
            }
        }
    });
}

function validateDate(date1, date2) {
    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth()) {
        return true;
    } else {
        return false;
    }
}

let arrow = document.querySelector('.arrows-container');
arrow.addEventListener('click', function (event) {
    if (event.target.innerText == 'keyboard_arrow_left') {
        assignDays(--lookAhead);
    } else
    if (event.target.innerText == 'keyboard_arrow_right') {
        assignDays(++lookAhead);
    }
    if (lookAhead == 0) {
        document.querySelector(".arrows-container p").innerText = "This Week"
    } else
    if (lookAhead == -1) {
        document.querySelector(".arrows-container p").innerText = "Last Week";
    } else
    if (lookAhead == 1) {
        document.querySelector(".arrows-container p").innerText = "Next Week";
    }
})



let addEventForm = document.querySelector('#create-event-form');
addEventForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let eventTitle = document.querySelector('#event-title').value;
    let eventDescription = document.querySelector('#event-description').value;
    let eventTime = document.querySelector('#event-time').value;
    eventDate = eventDate.split(" ");
    eventDate[4] = eventTime;
    eventDate = eventDate.join(" ")
    document.querySelector("#close-event-creator").click();
    fetch(`http://localhost:3000/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": eventTitle,
                "description": eventDescription,
                "timing": eventDate
            })
        })
        .then(res => res.json())
        .then(res => {
            // put code here to display the event after creation
            addEventToDay(res, requiredDay)
        })
});