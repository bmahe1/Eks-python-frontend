const API = "http://af64197d971da412daea313e31157e29-55cca34b5931a1e7.elb.us-east-1.amazonaws.com/";

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
    output.style.color = "black"; // Reset color

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        console.log("Uploading to:", `${API}pdf/read-text`);
        
        const res = await fetch(`${API}pdf/read-text`, {
            method: "POST",
            body: formData
        });

        console.log("Response status:", res.status);
        
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Success:", data);
        
        if (data.text) {
            output.innerText = data.text;
        } else {
            output.innerText = "No text extracted from PDF";
            output.style.color = "orange";
        }
    } catch (e) {
        console.error("Upload error:", e);
        output.innerText = `Error: ${e.message}`;
        output.style.color = "red";
    } finally {
        loader.classList.add("hidden");
    }
}
