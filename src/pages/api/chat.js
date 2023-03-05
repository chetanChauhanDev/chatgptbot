
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req,res
) {
  const { prompt } = req.body;
  console.log(typeof prompt)

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json(completion?.data?.choices[0]?.text)
}
