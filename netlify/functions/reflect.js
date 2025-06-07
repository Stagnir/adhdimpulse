const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { item, story } = JSON.parse(event.body);

    const prompt = `
Someone is considering buying "${item}" because "${story}".
Offer a calm, wise reflection on why they may not need to act on this impulse.
No shame. Just mindfulness and perspective.
`;

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

    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response format:", data);
      return {
        statusCode: 502,
        body: JSON.stringify({ reflection: "The reflection service returned no usable response." }),
      };
    }

    const message = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reflection: message }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
