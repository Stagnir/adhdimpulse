import fetch from "node-fetch";

exports.handler = async (event) => {
  const { item, story } = JSON.parse(event.body);

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
    console.log("OpenAI Response:", JSON.stringify(data)); // Debug log

    const message = data.choices?.[0]?.message?.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reflection: message }),
    };
  } catch (err) {
    console.error("Error in reflection function:", err); // Optional error log
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
