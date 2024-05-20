window.onload = function() {
    updateTable();
};



function updateTable(){
    let data = (localStorage.getItem('data')).toString();
    if (data !== null){
        data = data.split('|');
        for(personsData of data){
            if (personsData !== ''){
                // Adding it to the html document
                let mainTable = document.getElementById('main_table');
                let HTMLcontent = `<center>
                                    <tr>
                                        <td><a href='/'>${(personsData.split('.'))[0]}</a></td>
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
    
    let personBday = `${personDate}/${personMonth}`;
    
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
                            <td><a>${personName}</a></td>
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