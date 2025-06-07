function checkImpulse() {
  const item = document.getElementById("itemInput").value.trim();
  const story = document.getElementById("journalEntry").value.trim();
  const responseBox = document.getElementById("responseBox");
  const logBox = document.getElementById("logBox");

  if (!item) {
    alert("Please enter something you're thinking about buying.");
    return;
  }

  const reasons = [
    `This might be your 4th interest this month. Could you revisit one of the others instead?`,
    `You might just want the feeling of buying something new — not the actual item.`,
    `Would you still want this if no one ever saw you use it?`,
    `You may enjoy researching more than doing. Do you already have tools you could use instead?`,
    `Wait 7 days. If you're still excited after that, you’ll know it's not just a spike.`,
    `Consider what this thing promises to fix in you — is that a real need or a story?`
  ];

  const chosen = reasons[Math.floor(Math.random() * reasons.length)];

  responseBox.innerText = chosen;
  responseBox.style.display = "block";

  const now = new Date();
  const date = now.toLocaleDateString();
  const logEntry = `
<b>${date}</b> — <i>${item}</i><br>
${story}<br><br>
  `;
  logBox.innerHTML = logEntry + logBox.innerHTML;
}
