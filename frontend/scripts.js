const API = "http://<REPLACE_BACKEND_LB>";   // your EKS backend

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
