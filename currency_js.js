const Base_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button"); 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const arrowReverse = document.getElementById("arrowReverse");
const FinalMessage = document.querySelector(".msg");    // access the msg

// for default loading action
window.addEventListener("load", () => {
    updateExchnage();
});

// add all optations in select from 'code.js' list
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        //for select 'USD' & 'INR' at default
        // if (select.name === "from" && currCode === "USD") {
        //     newOption.selected = "selected";
        // } else if (select.name === "to" && currCode === "INR") {
        //     newOption.selected = "selected";
        // }
        select.append(newOption);
    }

    // for track the change for update flat image
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        // console.log(evt.target.value);
    });
}

// update flag
const updateFlag = (element) => {
    // console.log(element.value);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(currCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    //access the image
    let image = element.parentElement.querySelector("img");
    image.src = newSrc; // finally replace the image
}

// work for button
btn.addEventListener("click", (evt) => {
    evt.preventDefault();   // for stop refresh action after click on button and stop to restore default
    updateExchnage();
});

// // eventListener for arroReverse
// arrowReverse.addEventListener("click", (evt)=>{
//     evt.preventDefault();   // for stop refresh after click on button and store default
//     // let tempfromCurr = 
//     console.log(fromCurr.value);
// });

// eventListener for arrowReverse & exchange currency
arrowReverse.addEventListener("click", (evt) => {
    evt.preventDefault();   // prevent page refresh

    // Swap the dropdown values
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // Update both flags after swapping
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Update the exchange rate after swap
    updateExchnage();

    // update the msg
    // FinalMessage.innerText = `Click on "Get Exchange`;
});


const updateExchnage = async () => {
    let amount = document.querySelector(".amount input");   // access the amount
    let amtVal = amount.value;
    // console.log(amtVal);

    // for control unsuitable value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
        alert("Please Enter a valid input.");
    }

    // update the msg
    FinalMessage.innerText = `Converting...`;

    // url handel

    // convert to lower case
    //store the value
    let fromCurrVal = fromCurr.value;
    let toCurrVal = toCurr.value;
    //convert to lower Case
    fromCurrVal = fromCurrVal.toLowerCase();
    toCurrVal = toCurrVal.toLowerCase();

    // console.log(fromCurrVal, toCurrVal);

    //fetch API and store Exchange rate
    const URL = `${Base_URL}/${fromCurrVal}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data[fromCurrVal][toCurrVal];
    // console.log(rate); // print the exchange rate

    // final amount print
    let finalAmount = amtVal * rate;
    // update the msg

    // FinalMessage.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    // Using innerHTML so we can add <b> tags for making bold only <b>...this part...</b>
    FinalMessage.innerHTML = `<b>${amtVal}</b> ${fromCurr.value} = <b>${finalAmount}</b> ${toCurr.value}`;

}