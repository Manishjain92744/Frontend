async function uploadFile() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const fileName = await response.text();
    const normalizedFileName = fileName.trim();

    // Show the uploaded image preview from GET endpoint
    document.getElementById("uploadedImage").src =
      "http://localhost:8080/upload/" + encodeURIComponent(normalizedFileName);

    alert("Image uploaded and previewed successfully!");
    input.value = "";

  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed");
  }
}
