console.log("Script is connected and running.");

function checkImpulse() {
  console.log("checkImpulse() was called");

  const item = document.getElementById('itemInput').value.trim();
  const journal = document.getElementById('journalEntry').value.trim();
  const responseBox = document.getElementById('responseBox');

  if (!item) {
    responseBox.innerHTML = "Type in something you're tempted to buy.";
    return;
  }

  const reflections = [
    item => `You’ve probably wanted a ${item} before. What happened last time you bought one?`,
    item => `Buying a ${item} won’t give you identity or self-worth. That comes from showing up daily — not purchasing tools.`,
    item => `Will you still care about the ${item} when it’s not shiny and new? Or is it the fantasy that excites you more than the reality?`,
    item => `Have you spent more time researching this ${item} than doing what it's meant for? That’s a signal.`,
    item => `If you already owned this ${item}, what would actually be different in your life? Be specific.`,
    item => `Are you chasing novelty because you're bored, uncomfortable, or lonely? Be honest with yourself.`,
    item => `There's a difference between genuine interest and a dopamine hit. Which is this?`,
    item => `Most things are exciting until they arrive. Then they become clutter. Will this be different?`,
    item => `Ask yourself: Would I still want this ${item} if no one ever saw me use it?`,
    item => `How many hours of actual use will this ${item} get before the spark fades? Journal that number.`
  ];

  const picks = shuffleArray(reflections).slice(0, 3);
  const feedback = picks.map(fn => fn(item)).join('<br><br>');
  responseBox.innerHTML = feedback;

  const saved = JSON.parse(localStorage.getItem('impulses') || '[]');
  saved.push({ item, journal, date: new Date().toLocaleDateString() });
  localStorage.setItem('impulses', JSON.stringify(saved));

  showLog();
}

function showLog() {
  const logBox = document.getElementById('logBox');
  const saved = JSON.parse(localStorage.getItem('impulses') || '[]');
  if (saved.length === 0) return;

  logBox.innerHTML = '<h3>Past Impulses 🧠</h3>' + saved.map(entry => `
    <div>
      <strong>${entry.date}</strong> — <em>${entry.item}</em><br/>
      <small>${entry.journal}</small>
    </div>
    <br/>
  `).join('');
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

showLog();

