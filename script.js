async function checkImpulse() {
  const item = document.getElementById("itemInput").value.trim();
  const story = document.getElementById("journalEntry").value.trim();
  const responseBox = document.getElementById("responseBox");
  const logBox = document.getElementById("logBox");

  if (!item || !story) {
    alert("Please fill in both fields before reflecting.");
    return;
  }

  responseBox.innerText = "Reflecting...";
  responseBox.style.display = "block";

  try {
    const res = await fetch("/.netlify/functions/reflect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, story })
    });

    const data = await res.json();
    const reflection = data.reflection || "No response generated.";

    responseBox.innerText = reflection;

    const now = new Date();
    const date = now.toLocaleDateString();
    const logEntry = `
<b>${date}</b> — <i>${item}</i><br>
${story}<br><br>
`;
    logBox.innerHTML = logEntry + logBox.innerHTML;
  } catch (err) {
    console.error(err);
    responseBox.innerText = "Could not connect to the reflection service.";
  }
}
