import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { useState } from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';

function App() {
  // the prompt will be updated at each key stroke, from the input area and bubble it up to this component, to be used in the openAI request
  const [prompt, setPrompt] = useState("");
  // the chatData is to keep the history of our chat + the newest response. The reason why the newest reponse is separate? wanted to give it a special 'types' effect
  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "If you type your favorite Ubisoft Game, I'll convert it in emojis!" }], "response": "" });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    // tip! keep error handling at the beginning
    if (prompt === "")
      return false; // why do anything is nothing is in the input

    let newChatData = Object.assign({}, chatData) //start with a fresh object
    if (chatData.response !== "")
      newChatData.history.push({ "type": "openai", "data": chatData.response }) //push the previous openai response in the history stack
    newChatData.history.push({ "type": "user", "data": prompt }) //push the current user input in the history stack

    // You as a developer handle the code - that means you can manipulate it and add extra prompts before sending it to openAI
    // In this example, I chose to add an extra message to my request, on top of the user input, to convert whatever the user wrote -> into emojis
    let openAIPrompt = "Convert Ubisoft game titles into emoji.\n" + prompt + ':';
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: openAIPrompt,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"],
    });
    console.log('response', response);

    // Mocked response
    // let response = { "data": {} }
    // response.data = { "id": "cmpl-6he4kCxIA8rF1IL9WcM5WbiSp2k48", "object": "text_completion", "created": 1675860174, "model": "text-davinci-003", "choices": [{ "text": " 🤺⚔️🗡️🗿", "index": 0, "logprobs": null, "finish_reason": "stop" }], "usage": { "prompt_tokens": 16, "completion_tokens": 14, "total_tokens": 30 } };
    
    let processedResponse = response.data.choices[0].text; // I'm only using the text in my example
    newChatData.response = processedResponse.length === 0 ? "Sorry, no response" : processedResponse;
    setChatData(newChatData); //update the state
  };

  return (
    <div className="App">
      <Header></Header>
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response} />
        <ChatInput handleChange={setPrompt} handleClick={generateResponse}></ChatInput>
      </div>
    </div>
  );
}

export default App;
