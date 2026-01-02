const API = "http://af64197d971da412daea313e31157e29-55cca34b5931a1e7.elb.us-east-1.amazonaws.com/";   // your EKS backend

async function readPdf() {
    const fileInput = document.getElementById("pdfFile");
    const loader = document.getElementById("loader");
    const output = document.getElementById("output");

    if (!fileInput.files.length) {
        alert("Please upload a PDF first");
        return;
    }

    loader.classList.remove("hidden");
    output.innerText = "";

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const res = await fetch(`${API}/pdf/read-text`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        output.innerText = data.text || "No text extracted";
    } catch (e) {
        output.innerText = "Error connecting to backend";
    } finally {
        loader.classList.add("hidden");
    }
}
