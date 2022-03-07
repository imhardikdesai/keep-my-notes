let addNote = document.getElementById('addNote');
showNotes();
//set event listner in add button
addNote.addEventListener('click', (e) => {
    let inpTxt = document.getElementById('inpTxt');
    //here if-else is check for null alue in inpTxt  Box
    if (inpTxt.value == null || inpTxt.value == "") {
        alert("Enter Some Text to Add Note");
    } else {

        //This code is actual code to add note in LocalStorage 
        let myNotes = localStorage.getItem("myNotes");
        if (myNotes == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(myNotes);
        }
        noteObj.push(inpTxt.value)
        localStorage.setItem('myNotes', JSON.stringify(noteObj))
        inpTxt.value = "";
    }
    showNotes();
});

function showNotes() {
    let notes = document.getElementById('notes');
    let myNotes = localStorage.getItem("myNotes");

    if (myNotes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(myNotes);
    }
    let html = "";
    noteObj.forEach((element, index) => {
        //concat html with all index
        html += `
                    <div class="card mx-2 my-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Note ${index + 1}</h5>
                            <p class="card-text">${element}</p>
                            <button id="${index}" onclick="delNote(this.id);" class="btn btn-primary">Delete Note</button>
                        </div>
                   </div>
                `;
    });
    // Retrive Div In HTML and add new html from localstorage
    if (noteObj.length != 0) {
        notes.innerHTML = html;
    } else {
        notes.innerHTML = `Nothing to Show, Enter "Some Notes" To Show Content 📒`;
    }

}

function delNote(index) {
    let myNotes = localStorage.getItem("myNotes");
    if (myNotes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(myNotes);
    }

    noteObj.splice(index, 1);
    localStorage.setItem("myNotes", JSON.stringify(noteObj));
    showNotes();
}

//Code to Filter Notes and Search Content
let inpSearch = document.getElementById('inpSearch');
inpSearch.addEventListener('input', () => {

    let inpValue = inpSearch.value.toLowerCase();
    let card = document.getElementsByClassName('card');

    Array.from(card).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inpValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
