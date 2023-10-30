let count = 0;
let myExercises = [];

function handleOnLoad(){

    myExercises = JSON.parse(localStorage.getItem('myExercises'));
    if(!myExercises){myExercises=[]};

 
    let html =`
    <h1>Exercise Tracker</h1>
    
    <form onsubmit="return false">

    <label for="title">Title:</label><br>
    <input type="text" id="title" name="title"><br>
  

    <label for="distance">Distance:</label><br>
    <input type="text" id="distance" name="distance"> <br>


    <label for="day">Day:</label><br>
    <input type="text" id="day" placeholder="YYYY-MM-DD" name="day"> <br>
    <button class="buttonadd" onclick="handleExerciseAdd()">Add Exercise</button>
</form>

    
    <div id ="tableBody"> </div>  `


 

  document.getElementById('app').innerHTML = html;
  populateTable();
  //localStorage.setItem('myExercises',JSON.stringify(myExercises));
    
}

const sortExercises = function(myExercises)
{
    return myExercises.sort(function(a,b){
         if(a.Day > b.Day){
            return -1
         }
         else if(a.Day < b.Day)
            return 1
        else
            return 0
    })
}


function populateTable(){
    myExercises = sortExercises(myExercises);
    let html = `
    <table>
    <colgroup>
                <col>
                <col style="width: 100px">
                <!-- repeat as many cols as the number of headers -->
             </colgroup>
            <tr>
              <th style="width:20%">ACTIVITY TYPE</th>
              <th style="width:15%">DISTANCE (IN MILES)</th>
              <th style="width:15%">DATE COMPLETED</th>
              <th style="width:15%">---</th>
            </tr>`;
    myExercises.forEach(function(exercise){
      if(exercise.Deleted){
        return
      }
        let pinText = "";
        
        if(exercise.Pinned == false){
          pinText = "Pin";
        }
        else{
          pinText ="UnPin";
        }

        html +=     `<tr>
        <td>${exercise.Title}</td>
        <td>${exercise.Distance}</td>
        <td>${exercise.Day}</td>
        <td><button id = "myButton-${exercise.ExerciseID}" onclick="handlePin('${exercise.ExerciseID}')">${pinText}</button> <button id = "myButton-${exercise.ExerciseID}" onclick="handleExerciseDelete('${exercise.ExerciseID}')">Delete</button></td>
      </tr> `
    })


    html +=`</table> `
    document.getElementById('tableBody').innerHTML = html;
}

function handlePin(exerciseID) {
    // let y = "myButton-" + exerciseID;
    // console.log(exerciseID)
    // var x = document.getElementById(y);

    

    myExercises.forEach(function(exercise){
        //console.log(exercise.Pinned)
        if(exercise.ExerciseID === exerciseID)
        {
            exercise.Pinned = !exercise.Pinned;
            console.log(exercise.Pinned)
        }

    // if (x.innerHTML === "Pin") {
    //   x.innerHTML = "UnPin";
    // } else {
    //   x.innerHTML = "Pin";
    // }

    localStorage.setItem('myExercises', JSON.stringify(myExercises));
    
    populateTable()
})

  }


function handleExerciseAdd(){
    console.log(myExercises)
    let id = generateExerciseID();
    let exercise ={
      Pinned: false, 
      Deleted: false, 
      ExerciseID: id, 
      Title: document.getElementById('title').value, 
      Distance: document.getElementById('distance').value, 
      Day: document.getElementById('day').value
    };
    myExercises.push(exercise);
    console.log(myExercises)
    localStorage.setItem('myExercises',JSON.stringify(myExercises));
    
    populateTable();
}

//Watch video on jeff
function handleExerciseDelete(id){
    //console.log(exercise.ExerciseID)
    myExercises.forEach(function(exercise){
        //console.log(exercise.ExerciseID)
        if(exercise.ExerciseID === id)
        {
            exercise.Deleted = !exercise.Deleted;
        }
    })

    // myExercises = myExercises.filter(exercise => exercise.ExerciseID != id);
    localStorage.setItem('myExercises', JSON.stringify(myExercises));
    populateTable();
}
function generateExerciseID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }