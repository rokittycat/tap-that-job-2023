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
  const [chatData, setChatData] = useState({ "history": [], "response": {"text": "", "image":""} });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    // tip! keep error handling at the beginning
    if (prompt === "")
      return false; // why do anything is nothing is in the input

    let newChatData = Object.assign({}, chatData)
    if (chatData.response && chatData.response.image !== "")
      newChatData.history.push({ "type": "openai", "data": Object.assign({}, chatData.response) }) 
    newChatData.history.push({ "type": "user", "data": { "text": prompt } })

    /** START - IMAGE + TEXT  */
    //se cere traducerea textului
    let openAIPrompt = "Translate word by word from Romanian to English the phrase:  " + prompt + ". Return nothing else but the translation. No quotation marks, no punctuation.";
    const translationResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: openAIPrompt,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log('translationResponse ', translationResponse);

    // Mock the data to save on openai tokens
    // let translationResponse = {}
    // translationResponse.data = { "id": "cmpl-721KE1kcr7nGTgaxsNpilZZLrnMOS", "object": "text_completion", "created": 1680716106, "model": "text-davinci-003", "choices": [{ "text": "\n\nhorses green on walls", "index": 0, "logprobs": null, "finish_reason": "stop" }], "usage": { "prompt_tokens": 37, "completion_tokens": 7, "total_tokens": 44 } }


    let processedTranslationResponse = translationResponse.data.choices[0].text; // I'm only using the text in my example
    newChatData.response.text = processedTranslationResponse.length === 0 ? "Sorry, no response" : processedTranslationResponse;

    // se cere generare de imagine, pe baza traducerii de mai sus 
    const imageResponse = await openai.createImage({
      prompt: processedTranslationResponse,
      n: 1,
      size: "512x512",
    });

    // Mock the data to save on openai tokens
    // let imageResponse = {}
    // imageResponse.data = {
    //   "created": 1680716115,
    //   "data": [
    //     {
    //       "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PU23gGM85C0RiNiUohLgFpRe/user-s4ISCBvQwoiHMstEsmAzml2o/img-l9pPdwsr8gHwBYfjXwQzhBFi.png?st=2023-04-05T16%3A35%3A15Z&se=2023-04-05T18%3A35%3A15Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-05T17%3A11%3A36Z&ske=2023-04-06T17%3A11%3A36Z&sks=b&skv=2021-08-06&sig=348kyeRF2TrIjes2NOzm1%2BCNwIAdeJR4VW9erVjTUww%3D"
    //     }
    //   ]
    // }

    console.log('imageResponse ', imageResponse);
    let processedImageResponse = imageResponse.data.data[0].url;
    newChatData.response.image = processedImageResponse;
    /** END - IMAGE + TEXT  */
    console.log(newChatData);
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
