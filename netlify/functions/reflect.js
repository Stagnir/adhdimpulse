const fetch = require("node-fetch");

exports.handler = async (event) => {
  let item, story;

  // 🧠 Parse and validate the body
  try {
    const body = JSON.parse(event.body || "{}");
    item = body.item;
    story = body.story;

    if (!item || !story) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'item' or 'story' in request body." }),
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON in request body." }),
    };
  }

  const prompt = `
Someone is considering buying "${item}" because "${story}".
Offer a calm, wise reflection on why they may not need to act on this impulse.
No shame. Just mindfulness and perspective.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const message = data.choices?.[0]?.message?.content;
    if (!message) {
      console.error("OpenAI returned unexpected response:", data);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "No reflection generated from OpenAI." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reflection: message }),
    };
  } catch (err) {
    console.error("Server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to reflection service." }),
    };
  }
};
