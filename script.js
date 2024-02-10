// -----> Fetching HTML Data and fields--------------------------------------------------------------------------------------------------
let timer = document.querySelector(".timer")
let inputs_section_container = document.querySelector(".inputs-section")
let buttons = Array.from(document.getElementsByTagName("button"))
let minutes_in = document.querySelector('.min_in')
let semi = ":"
let seconds_in = document.querySelector('.sec_in')

//Variable for interval, so that it can be accessed globally
let TimeUpdater;
//Stores Timer for resetting
let def_time = timer.innerText;



// -----> Functions ---------------------------------------------------------------------------------------------------------------------
//resets time when timer ends or user clicks reset button
const reset = () =>{
    clearInterval(TimeUpdater);
    timer.innerText = def_time;
    buttons[1].disabled = true;
    toggle()
}

// Disables, Enables and changes colour of buttons when Start button is pressed
const toggle = () => {
    if(buttons[2].innerText === "Start")
    {
        buttons[2].innerText = "Stop";
        buttons[2].style.background = "#ef6262";
        buttons[0].disabled = true;
        inputs_section_container.classList.add("none")
    } else {
            buttons[2].innerText = "Start"; 
            buttons[2].style.background = "#4aae70"
            buttons[0].disabled = false;
    }
}

//Updates Timer Every Second
const updateTimer = () =>{
    let time = timer.innerText.split(':')
        if(time[1]=="00") {
            time[1] = 59;
            time[0]--
            buttons[1].disabled = false;
        } else{
            time[1]--
            buttons[1].disabled = false;
        }

         String(time[0]).length == 1 ? time[0] = `0${time[0]}` : time[0] = time[0];
         String(time[1]).length == 1 ? time[1] = `0${time[1]}` : time[1] = time[1];
         timer.innerText = time.join(':')
     check_time(time);
}

//Starts or Stops Timer When start or stop button is pressed
const start_stop = () => {
    if(buttons[2].innerText == "Start"){    
        def_time = timer.innerText;
        TimeUpdater = setInterval(updateTimer, 1000);
    } else {
        clearInterval(TimeUpdater);
    }
}
 
//Checks timer every second, check if timer has ended
const check_time = (time) =>{
    if(time[0] == time[1] && time[0] == "00")
    {
        clearInterval(TimeUpdater);
        reset();
        alert("Timer Completed!")
    }
    else if(time[0] < 0 || time[1] < 0)
    {
        reset();
    }
}

//Checks if the time Given is valid then starts timer otherwise returns error
const checked = () =>{
    if(timer.innerText!== "00:00")
    {
        return true
    }
    alert(`Invalid Input!`)
    timer.innerText = "02:00"
    minutes_in.value = "02";
    seconds_in.value = "00";
}



// -----> Events ------------------------------------------------------------------------------------------------------------------------
//When Edit Timer is Pressed, Minutes and seconds fields becomes hidden or visible
buttons[0].addEventListener("click", ()=>{
    inputs_section_container.classList.toggle("none")
})

// Resets Timer
buttons[1].addEventListener("click",  ()=>{
    reset();
    if(buttons[2].innerText === "Stop")
    {
        toggle();
    }
})

//Starts or stops timer on click and Disables, Enables and changes colour of buttons
buttons[2].addEventListener("click", (e)=>{
    if(checked() == true)
    {
        start_stop();
        toggle();
    }
})

//Updates Inner HTML of timer when there is a change in seconds input field
minutes_in.addEventListener("change", ()=>{
    if(minutes_in.value<0 || minutes_in.value.trim() == ""  ||  minutes_in.value == "-0" || minutes_in.value == "-00" || String(minutes_in.value).length > 2)
    {
        minutes_in.value = 0;
    } else if(minutes_in.value.trim() > 99) minutes_in.value = 99;
        let arr = timer.innerHTML.split(":")
        arr[0] = minutes_in.value
        String(arr[0]).length == 1 ? arr[0] = `0${arr[0]}` : arr[0] = arr[0];
        String(arr[1]).length == 1 ? arr[1] = `0${arr[1]}` : arr[1] = arr[1];
        timer.innerHTML = arr.join(':');
        def_time = arr.join(':')
})

//Updates Inner HTML of timer when there is a change in seconds input field
seconds_in.addEventListener("change", ()=>{
    if(seconds_in.value<0 || seconds_in.value.trim() == "" ||  seconds_in.value == "-0"||seconds_in.value == "-00" || String(seconds_in.value).length > 2)
    {
        seconds_in.value = 0;
    }
    else if ( seconds_in.value.trim() > 59) seconds_in.value = 59;
        let ary = timer.innerHTML.split(":")
        ary[1] = seconds_in.value
        String(ary[0]).length == 1 ? ary[0] = `0${ary[0]}` : ary[0] = ary[0];
        String(ary[1]).length == 1 ? ary[1] = `0${ary[1]}` : ary[1] = ary[1];
        timer.innerHTML = ary.join(':');
        def_time = ary.join(':')
})