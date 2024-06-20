let timerRef = document.querySelector('.timer-display');
const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');
const activeAlarms = document.querySelector('.activeAlarms');
const setAlarm = document.getElementById('setAlarm');

let alarmArray = [];
let alarmSound = new Audio('./alarm.mp3');

let initialHour = 0, initialMinute = 0, alarmIndex = 0;

//Append zero from single digit
const appendZero = (value) => (value<10?"0"+value:value);

//search for value in object
const searchObject = (paramater, value) => {
    let alarmObject,
        objIndex,
        exists=false;
        alarmArray.forEach((alarm, index) => {
        if(alarm[paramater] == value) {
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objIndex];
}

// Display Time
function displayTimer() {
    let date = new Date();
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds())
    ];
    //Display time
timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
    //Alarm
    alarmArray.forEach((alarm, index) => {
        if(alarm.isActive) {
            if(
                `${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`
            ) {
                alarmSound.play();
                alarmSound.loop 
                = true;
            }
        }
    });
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if(inputValue<10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
};

hourInput.addEventListener('input', () => {
    hourInput.value = inputCheck(hourInput.value);
});
minuteInput.addEventListener('input', () => {
    minuteInput.value = inputCheck(minuteInput.value);
});

//create alarm divs
const createAlarm = (alarmObj) => {
    //key from object
    const {id, alarmHour, alarmMinute} = alarmObj;
    //Alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute('data-id', id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    //checkbox
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', (e) => {
        if(e.target.checked) {
            startAlarm(e);
        }
        else{
            stopAlarm(e);
        }
    });
    alarmDiv.appendChild(checkbox);
    //Delete Button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
};

//set Alarm
setAlarm.addEventListener('click', () => {
    alarmIndex += 1;

    //alarmObject
    let alarmObj = [];
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;
    console.log(alarmObj);
    alarmArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

//start Alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject('id', searchId);
    if(exists) {
        alarmArray[index].isActive = true;
    }
};
//sop Alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject('id', searchId);
    if(exists) {
        alarmArray[index].isActive = false;
        alarmSound.pause();
    }
};
//delete Alarm
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.
    parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject('id', searchId);
    if(exists) {
        e.target.parentElement.parentElement.remove();
        alarmArray.splice(index, 1);
    }
};

window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
}
