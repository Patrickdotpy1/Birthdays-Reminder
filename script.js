window.onload = function() {
    updateTable();
    hidePopUp();
};



function sortBirthdays(){
    // Create a list with every person in the database and the time until their birthday
    let dataList = localStorage.getItem('data');
    dataList = dataList.split('|');
    let peopleBdays = [];
    for(person of dataList){
        peopleBdays.push(`${person.split('.')[0]}.${(person.split('.')[3])}`);
    }


    // Sort DAYS
    // Create a list with each person's name and the number of DAYS until their birthday
    // [name1.3, name2.7, name3.5]
    let peopleBdays_Days = [];
    for(personBday of peopleBdays){
        if(personBday.includes('day(s)')){
            peopleBdays_Days.push(personBday.replace(' day(s)', ''));}
    }
    console.log(`List 1 [${peopleBdays_Days}}`);

    // Create a similar list but with just the numbers
    // [3, 7, 5]
    let days = [];
    for(element of peopleBdays_Days){
        days.push(Number(element.split('.')[1]))
    }
    console.log(`List 2 [${days}]`);

    // Create a third list where the element of the first list are going to be placed in order
    let peopleBdays_DaysOrdered = [];
    while(days.length > 0){
        // Finding the sonnest birthday in Days
        let lowestNum = Math.min(...days);
        let index = days.indexOf(lowestNum);

        // Adding the person who has the sonnest birthday in the third list, peopleBdays_DaysOrdered
        peopleBdays_DaysOrdered.push(peopleBdays_Days[index]);

        days.splice(index, 1);
        peopleBdays_Days.splice(index, 1);
    }
    console.log(`List 3 [${peopleBdays_DaysOrdered}]`);



    // Sort MONTHS
    // Create a list with each person's name and the number of MONTHS until their birthday
    // [name1.3, name2.7, name3.5]
    let peopleBdays_Months = [];
    for(let personBday of peopleBdays){
        if(personBday.includes('month(s)')){
            peopleBdays_Months.push(personBday.replace(' month(s)', ''));}
    }
    console.log(`List 1 [${peopleBdays_Months}}`);

    // Create a similar list but with just the numbers
    // [3, 7, 5]
    let months = [];
    for(let element of peopleBdays_Months){
        months.push(Number(element.split('.')[1]))
    }
    console.log(`List 2 [${months}]`);

    // Create a third list where the element of the first list are going to be placed in order
    let peopleBdays_MonthsOrdered = [];
    while(months.length > 0){
        // Finding the sonnest birthday in Days
        let lowestNum = Math.min(...months);
        let index = months.indexOf(lowestNum);

        // Adding the person who has the sonnest birthday in the third list, peopleBdays_MonthsOrdered
        peopleBdays_MonthsOrdered.push(peopleBdays_Months[index]);

        months.splice(index, 1);
        peopleBdays_Months.splice(index, 1);
    }
    console.log(`List 3 [${peopleBdays_DaysOrdered}]`);



    // Adding the two main lists where days and months were sorted, together. 
    console.log(`RESULTS: ${peopleBdays_DaysOrdered}  ${peopleBdays_MonthsOrdered}`);
    let newData = peopleBdays_DaysOrdered.concat(peopleBdays_MonthsOrdered);
    let oldData = ((localStorage.getItem('data')).toString()).split('|');
    let orderedNewData = [];
    
    for(let element of newData){
        let personName = element.split('.')[0];
        // Finding the element that contains personName in oldData
        oldData.forEach(el =>{
            console.log(el);
            if(el.includes(personName)){
                orderedNewData.push(`${el.replace(',','')}|`);
            }
        })
    }
    /*console.log(`New data ${orderedNewData}`);
    for(let element in orderedNewData){
        console.log(element);
    }
    orderedNewData.forEach(element => {
        console.log(element);
    });*/
    

    // Changing the 'sort by birthdays' button in HTML
    let sortName = document.getElementById('sortByName');
    let sortAge = document.getElementById('sortByAge');
    
    let sortBirth = document.getElementById('sortByBirth');
    html = ((sortBirth.outerHTML).toString()).split('id="sortByBirth"');
    sortBirth.outerHTML = `${html[0]} id="sortByBirth" style="background-color:lightgrey" ${html[1]}`;

    // Updating localStorage
    localStorage.setItem('data', orderedNewData);

    // Refreshing the page
    //location.reload();
}



function addGift(){
    // Modifying the HTML
    let gift = document.getElementsByClassName('gifts-input')[0].value;
    let label = document.getElementsByClassName('prefered-gift-label')[0];
    label.innerHTML = `<p>${gift}</p>`;
    
    // Saving the changes to the localStorage
    let personName = document.getElementsByClassName('person-name')[0].innerHTML;
    localStorage.setItem(personName, gift);
}
function removeGift(){
    // Removing the gift preference from the HTML
    let giftLabel = document.getElementsByClassName('prefered-gift-label')[0];
    giftLabel.innerHTML = '<p style="color:lightgray;">No prefered gifts...</p>';

    // Removing the gift preference from the localStorage
    let personName = document.getElementsByClassName('person-name')[0].innerHTML;
    localStorage.setItem(personName, "No prefered gifts...");
}


function unHidePopUp(){
    try{
        let popUp = document.getElementsByClassName('pop-up')[0];
        let HTML = (popUp.outerHTML).replace(' style="display:none"', '');
        popUp.outerHTML = HTML;
    }
    catch{}
}
function hidePopUp(){
    let popUp = document.getElementsByClassName('pop-up')[0];
    let oldHTML = popUp.outerHTML;
    let HTML = `<div class="pop-up" style="display:none"${oldHTML.split("pop-up")[1]}`;
    popUp.outerHTML = HTML;
}

function openPopUp(personName, personAge, personBday, personUntilBday){
    unHidePopUp();
    let name = document.getElementsByClassName('person-name')[0];
    name.innerHTML = `${personName}`;

    let age = document.getElementsByClassName('person-age')[0];
    age.innerHTML = `Age: ${personAge}`;

    let bday = document.getElementsByClassName('person-bday')[0];
    bday.innerHTML = `Birth date: ${personBday}`;

    let bdayIn = document.getElementsByClassName('person-bday-in')[0];
    if(personUntilBday !== 'Today'){
        bdayIn.innerHTML = `Birthday: ${personUntilBday} away`;
    }
    else{
        bdayIn.innerHTML = `Birthday: ${personUntilBday}!`;
    }

    // Getting and inserting the person's prefered gifts into the HTML
    let preferedGifts = localStorage.getItem(personName);
    let label = document.getElementsByClassName('prefered-gift-label')[0];
    if(preferedGifts !== null && preferedGifts !== 'No prefered gifts...'){
        label.innerHTML = `<p>${preferedGifts}</p>`;
    }
    else{
        label.innerHTML = '<p style="color: lightgray">No prefered gifts...</p>';
    }
}


function getMonth(numericMonth){
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[numericMonth - 1];
}
function updateTable(){
    // Updating the table with the user's data stored in localStorage
    // Storing the data in the variable data
    let data = (localStorage.getItem('data')).toString();

    // If the data isn't null...
    if (data !== null){
    // ... then loop through the data of each person and load it into the table
        data = data.split('|');
        for(personsData of data){
            if (personsData !== '' && personsData !== 'null'){
                let mainTable = document.getElementById('main_table');
                let HTMLcontent = `<center>
                                    <tr>
                                        <td><button type="button" onclick="openPopUp('${(personsData.split('.'))[0]}', '${(personsData.split('.'))[1]}', '${(personsData.split('.'))[2]}', '${(personsData.split('.'))[3]}')" class="hidden-button-css">${(personsData.split('.'))[0]}</button></td>
                                        <td>${(personsData.split('.'))[1]}</td>
                                        <td>${(personsData.split('.'))[2]}</td>
                                        <td>${(personsData.split('.'))[3]}</td>
                                    </tr>
                                </center>\n`;
                mainTable.innerHTML += HTMLcontent;
            }
        }
    }
    else{
        // If the user doesn't have any data stored, then load an example into the table
        let mainTable = document.getElementById('main_table');
        let HTMLcontent = `<center>
                            <tr>
                                <td class="example-font-css">Example</td>
                                <td class="example-font-css">27</td>
                                <td class="example-font-css">17/05</td>
                                <td class="example-font-css">3 Month(s)</td>
                            </tr>
                        </center>\n`;
        mainTable.innerHTML += HTMLcontent;
    }
}



function addInfo(){
    // Getting the person's information
    let personName = document.querySelector('#input-name').value;
    let personAge = document.querySelector('#input-age').value;
    let personDate = document.querySelector('#input-date').value;
    let personMonth = document.querySelector('#input-month').value;
    
    let personBday = `${personDate} ${getMonth(personMonth)}`;
    
    // Verifying that the information is valid


    // Calculating the time until the person's birtday
    // Getting the current month and date
    let date = new Date();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();

    let timeUntilBday = personMonth - currentMonth;

    if ( (timeUntilBday.toString()).includes('-') ){
        // If the person's birthday is next year
        timeUntilBday = (12 + timeUntilBday).toString() + ' month(s)';
    }
    else if (timeUntilBday === 0){
        // If the person's birthday is next year
        if (currentDay > personDate){
            timeUntilBday = '12 months';
        }
        // If the person's birthday is this month
        else if (currentDay < personDate){
            timeUntilBday = (personDate - currentDay).toString() + ' day(s)';
        }
        else{
            timeUntilBday = 'Today';
        }
    }
    else{
        timeUntilBday = timeUntilBday.toString() + ' month(s)';
    }



    // Adding it to the html document
    let mainTable = document.getElementById('main_table');
    let HTMLcontent = `<center>
                        <tr>
                        <td><button type="button" onclick="openPopUp('${personName}', '${personAge}', '${personBday}', '${timeUntilBday}')" class="hidden-button-css">${personName}</button></td>
                            <td>${personAge}</td>
                            <td>${personBday}</td>
                            <td>${timeUntilBday}</td>
                        </tr>
                    </center>\n`;
    mainTable.innerHTML += HTMLcontent;

    // Saving the information into the local storage
    let newData = `${personName}.${personAge}.${personBday}.${timeUntilBday}|`;
    try{
        // Updating the old data
        let oldData = localStorage.getItem('data');
        let fullData = oldData + '|' + newData;
        localStorage.setItem('data', fullData)
    }
    catch{
        localStorage.setItem('data', newData);
    }
}




// TO DO HERE
// - FINISH THE SORTING FUNCTION
// - FUNCTION TO SORT BIRTHDAYS FROM THE SOONEST TO THE LATEST, 
// - FUNCTINO TO SORT PEOPLE BY AGE
// - FUNCTION TO SORT PEOPLE BY NAME
// - MAKE IT RESPONSIVE