const table= document.querySelector(".main_tbl");
let lastID= table.rows.length;
let inputTask= document.getElementById('input_task');
let Status= document.getElementById('Status');
let btnAddTask= document.getElementById('addTask');
let btnEditAddBtn= document.getElementById('editTask');
let tableHeader = document.getElementById('tableHeader');

//Buttons Initialisation:
let btn_add= document.getElementById('btnadd');
let btn_Reset= document.getElementById('Reset');
// let btn_done = document.getElementById('donebtn');
let btn_edit = document.querySelectorAll('#editbtn');
let btn_remove = document.querySelectorAll('#removebtn');

//Adding Event Listeners on buttons:

//Add Button:
btn_add.addEventListener('click', ()=>{
    btn_add.style.display='none';
    add_data()});
//Delete All Button:
 btn_Reset.addEventListener('click', ()=> deleteAllTableData());

//Edit Button:
btn_edit.forEach(btn =>btn.addEventListener('click',()=>edit_data(btn)));
//Reset Button:
btn_remove.forEach(btn =>btn.addEventListener('click',()=>remove_data(btn)));


//<td>${lastID}</td>
//Functions Definition:

function addNewRow(task){
let newRow = document.createElement('tr');
    if(table.rows.length == 1 )
    tableHeader.style.display='';
    newRow.innerHTML=
    `
     
     <td>${task}</td>
     <td style='color:red'>ToDo</td>
     <td><button class="fa-solid fa-pen-to-square" value="editbtn" name="editbtn" id="editbtn" onclick="edit_data(this)"></button></td>
     <td><button class="fa-solid fa-check" value="donebtn" name="donebtn" id="donebtn" onclick="strikeOutData(this)"></button></td>
     <td><button class="fa-solid fa-trash" value="removebtn" name="removebtn" id="removebtn" onclick="remove_data(this)"></button></td>
    `;
    table.append(newRow);
    lastID++; 
      
}

function add_data(){
    inputTask.style.display= addTask.style.display ='block';
    addTask.addEventListener('click',function clickFunction(){
       addNewRow(inputTask.value);
       inputTask.value = '';
       inputTask.style.display= addTask.style.display ='none';
       btn_add.style.display='block';
       table.style.display='';
       addTask.removeEventListener('click', clickFunction); 
    resetBtnHide();

       //I Added remove bcz it was adding multiple rows
    })}



//This will add a line on text.
function strikeOutData(btn) {
    let row = btn.closest('tr');
    row.style.textDecoration = 'line-through red 3px';
    btn.style = "";
    btn.disabled = 'true';
    row.children[1].innerText = "Completed";
    colorStatus(row.children[1]);
}


function deleteAllTableData(){
    if(table.rows.length == 1 ){
        alert("Ooops, Nothing to delete");

    }
    else{
    confirm("Are You sure you want to Delete whole list?")
    if(confirm){
    while(lastID>1){
        lastID--;
    table.deleteRow(1);}
    if(table.rows.length >0 )
    tableHeader.style.display='none';
    else
    tableHeader.style.display='';
    resetBtnHide();
}
}
}


function edit_data(btn){
    btnadd.style.display='none';
     let row = btn.closest('tr');
     let task = row.children[0].innerText;
     var status = row.children[1].innerText;
     inputTask.style.display= btnEditAddBtn.style.display = Status.style.display ='block';
     inputTask.innerText = inputTask.value = task;
     for (let i = 0; i < Status.options.length; i++) {
        if (Status.options[i].value === status) {
            Status.selectedIndex = i;
            break;
        }}
    
    btnEditAddBtn.addEventListener('click',function handleOnClick() {
        let updatedTask = inputTask.value;
        let updatedStatus = Status.options[Status.selectedIndex].innerText;
        editAddTaskButton(updatedTask, updatedStatus,row);
        inputTask.value = '';
        inputTask.style.display= editTask.style.display = Status.style.display ='none';
        btnEditAddBtn.removeEventListener('click', handleOnClick);
          });
     
        }

 
     
function editAddTaskButton(task,status,row){
    row.children[0].innerText = task;
    row.children[1].innerText = status;
    colorStatus(row.children[1]);
    let btndone = row.children[3].querySelector('button');
    if(row.children[1].innerText != 'Completed'){
       row.style.textDecoration = '';
    btndone.disabled = false;}
    else if (row.children[1].innerText == 'Completed'){
    row.style.textDecoration = 'line-through red 3px';
    btndone.disabled = true;}

    btnadd.style.display='';
}
  

function remove_data(btn)
 {
    btn.closest('tr').remove();
    if(table.rows.length == 1 )
        tableHeader.style.display='none';
        else
        tableHeader.style.display='';
       resetBtnHide();
 }


function colorStatus(status){
    switch (status.innerText) {
        case "Completed":
            status.style.color = 'green';
            break;
        case "To Do":
            status.style.color = 'red';
            break;
        case "In progress":
            status.style.color = 'yellow';
            break;
        default:
            status.style.color = ''; 
            break;
    }
 }

 function resetBtnHide(){
    if(table.rows.length == 1 ){
        btn_Reset.style.display='none';
    }
    else{
        btn_Reset.style.display='';
    }}
