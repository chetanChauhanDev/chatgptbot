
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


export default async function handler(
  req, res
) {
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "who is akshay kumar",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // res.send(completion.data.choices[0].text);

  console.log(completion)
  res.status(200).json(completion?.data?.choices[0]?.text)
}
