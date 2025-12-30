
const API = "http://<REPLACE_BACKEND_LB>";

function readPdf(){
    let fileInput = document.getElementById("readFile");
    let data = new FormData();
    data.append("file", fileInput.files[0]);

    fetch(API + "/pdf/read-text", { method: "POST", body: data })
    .then(r => r.json())
    .then(d => document.getElementById("readOutput").innerText = d.text);
}

function splitPdf(){
    let fileInput = document.getElementById("splitFile");
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    let data = new FormData();
    data.append("file", fileInput.files[0]);

    fetch(API + `/pdf/split?start=${start}&end=${end}`, { method: "POST", body: data })
    .then(r => r.json())
    .then(d => document.getElementById("splitMsg").innerText = d.message);
}
