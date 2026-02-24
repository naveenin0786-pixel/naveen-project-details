function showSection(id){
    document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function login(){
    const username=document.getElementById("username").value;
    fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username})});
}

function addTeam(){
    fetch("/team",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        name:teamName.value,
        role:teamRole.value,
        desc:teamDesc.value
    })}).then(loadTeam);
}

function addResource(){
    fetch("/resource",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        title:resTitle.value,
        desc:resDesc.value
    })}).then(loadResource);
}

function addProject(){
    fetch("/project",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        title:projTitle.value,
        desc:projDesc.value
    })}).then(loadProject);
}

function viewUsers(){
    fetch("/host",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({password:hostPass.value})})
    .then(res=>res.json())
    .then(data=>{
        userData.innerHTML=JSON.stringify(data);
    });
}

function clearUsers(){
    fetch("/clear",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({password:hostPass.value})});
}

function loadTeam(){
    fetch("/team").then(res=>res.json())
    .then(data=>teamList.innerHTML=JSON.stringify(data));
}
function loadResource(){
    fetch("/resource").then(res=>res.json())
    .then(data=>resourceList.innerHTML=JSON.stringify(data));
}
function loadProject(){
    fetch("/project").then(res=>res.json())
    .then(data=>projectList.innerHTML=JSON.stringify(data));
}

window.onload=()=>{
    loadTeam();
    loadResource();
    loadProject();
};