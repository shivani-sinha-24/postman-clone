// link to get fetch api---https://randomuser.me/api/ ,,,, https://jsonplaceholder.typicode.com/posts
// link to get fetch api---https://jsonplaceholder.typicode.com/posts

// Utility Function
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let jsonBox = document.getElementById('jsonBox');
let parameterBox = document.getElementById('parameterBox');

// Initilize no of parameters
let addParamCount = 0;

// Hide the parameter box initially
parameterBox.classList.add('d-none');

// If the user clicks on parametrs box, hide the json request box 
let parameterRadio = document.getElementById('parameterRadio');
parameterRadio.addEventListener('click', ()=>{
    jsonBox.classList.add('d-none');
    parameterBox.classList.remove('d-none');
})

// If the user clicks on json box, hide the parameter request box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
    parameterBox.classList.add('d-none');
    jsonBox.classList.remove('d-none');
})

// If the user click +button in parameters box, displaying moreparameter boxes
let addParametersBtn = document.getElementById('addParametersBtn');
addParametersBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let params = document.getElementById('params');
    let string = `<div class="my-3 mx-2 row">
                <div class="col-3">
                    <label for="" class="form-label"><b>Parameter ${addParamCount + 2} </b></label>
                </div>
                <div class="col-3">
                    <input type="text" class="form-control" id="parameterKey${addParamCount+ 2 }" placeholder="Parameter Key ${addParamCount+ 2 }">
                </div>
                <div class="col-3">
                    <input type="text" class="form-control" id="parameterValue${addParamCount+  2}" placeholder="Parameter Value ${addParamCount+ 2 }">
                </div>
                <div class="col-1">
                    <button class="btn btn-primary deleteParam">-</button>
                </div>
                </div>`;
    // Convert the Element string into DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    //add eventlistener to rremove that particular parameter
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.preventDefault();
            e.target.parentElement.parentElement.remove();
        })
    }
    addParamCount ++;
})

//If the user clicks on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
    e.preventDefault();

    // Show please wait in the response box to request patience from the user
    document.getElementById('responseFormText').value = "Please wait... Fetching response...";

    //Fetch all the values user has enetered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
       // if the user selects custom paramenters intead of json, collect all the paramater keys and their values in object
    if(contentType=='parameterRadio'){
        let data = {};
        for (let i = 0; i < addParamCount+1; i++) {
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
                let key = document.getElementById('parameterKey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
                data[key] = value;
                
            }
        }
        data = JSON.stringify(data);     
        console.log(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
        console.log(data);

    }
    
    //if the request type is get, invoke fetch api to create post request
    if(requestType=="get"){
        fetch(url,{
            method:'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responseFormText').value = text;
        });
    }
    else{
        let data = "";
        fetch(url,{
            method:'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then((response) => response.text())
        .then((text)=>{
            document.getElementById('responseFormText').value = text;
        });
    }
})
  