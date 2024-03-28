var items = [];

var count = 0;

var lister = document.querySelector('ul');

var fltr = "all";

// Function to load data from localStorage
function loadData() {
    const data = localStorage.getItem("todoList");
    if (data) {
        items = JSON.parse(data);
        displayList(items);
        count = items.length;
    }
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("todoList", JSON.stringify(items));
}

// Call loadData function when the page loads
window.onload = function() {
    loadData();
};

//function to add an item to the to do list

addItem = () => {
    let todo = document.getElementById("inp").value;
    let priorityGet = document.getElementById("priority").value;
    // Get the value of the date input field
    let date = document.getElementById("date").value;

    if(todo && priorityGet && date) {
        var item = {
            id: count,
            description: todo,
            priority: priorityGet,
            completed: false,
            date: date // Include date in the task object
        }

        items.push(item);
        document.getElementById("inp").value = "";
        document.getElementById("date").value = ""; // Clear date input field

        displayList(items);
        count++;
    } else {
        alert("Type something");
    }
    saveData();
}




//function to display the tasks on the to do list

displayList = list => {



    let remove = document.getElementById("todos");

    while (remove.hasChildNodes()) {

        remove.removeChild(remove.firstChild);

    }



    changeInfo(list);



    list.map( elem => {

        let tag = document.createElement("li");

        if (elem.completed) tag.setAttribute("class", "checked");

        else tag.setAttribute("class","");

        tag.setAttribute("id",elem.id);

        // Include date in task display

        let text = document.createTextNode(elem.description + " - " + elem.date);

        tag.appendChild(text);



        let span = document.createElement("SPAN");

        span.setAttribute("class","close");

        span.setAttribute("onclick", `deleteCurrent(${elem.id})`)

        text = document.createTextNode("X");

        span.appendChild(text);

        tag.appendChild(span);



        let br = document.createElement("hr");

        tag.appendChild(br);



        text = document.createTextNode(`Priority: ${elem.priority}`);

        tag.appendChild(text);



        span = document.createElement("SPAN");

        span.setAttribute("class", "edit");

        span.setAttribute("onclick", `editCurrent(${elem.id})`)

        text = document.createTextNode("edit");

        span.appendChild(text);

        tag.appendChild(span);



        document.getElementById("todos").appendChild(tag);

    })

}





currentIndex = id => {

    let checkIndex = el => el.id === id;

    let currentId = items.findIndex(checkIndex);

    return currentId;

}





//needed to delete a task from the to-do list

deleteCurrent = id => {



    items.splice(currentIndex(id), 1);

    if (fltr === "all") displayList(items);

    else sortList(fltr);

    saveData();

}



//edit a task on the to-do list

editCurrent = id => {

    let newVal = prompt("Add the new value of this to-do:",items[currentIndex(id)].description);



    if (newVal === null || newVal === ""){

        alert("No new value added. Keeping the old value.");

    }

    else{

        items[currentIndex(id)].description = newVal;

        if(fltr === "all") displayList(items);

        else sortList(fltr);

    }

    saveData();

}





sortList = pr => {

    if(pr != "all"){

        const sorter = items.filter( item => item.priority === pr);

        displayList(sorter);

        fltr = pr;

    }

    else {displayList(items); fltr = "all"}

}





lister.addEventListener('click', check => {

    if (check.target.tagName === 'LI') {

        check.target.classList.toggle('checked');

        items[check.target.id].completed = !items[check.target.id].completed;

        console.log(items[check.target.id]);

    }

}, false);





changeInfo = nr => {

    document.getElementById("inf").innerHTML = nr.length;

}