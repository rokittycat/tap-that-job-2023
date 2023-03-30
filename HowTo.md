## Steps

### Installation

1. run `npx create-react-app ./` to bootstrap your React application
2. install openai by running this command: `npm install openai --save` (get it out of the way early)
3. add your API key in .env file. How to [here](https://create-react-app.dev/docs/adding-custom-environment-variables/) to learn more about how to do it
4. start the server by running `npm start`

For extra directions, [go to the official cra dev resources](https://create-react-app.dev/docs/getting-started).
The only extra library absolutely needed is the openai one.
Feel free to install any additional libraries you might feel will be useful: [material-ui](https://mui.com/material-ui/getting-started/installation/), [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction), etc.

### Think in React

1. use draw.io or paper & pen or any other drawing tool
2. think how you can separate your app & UI into a component hierarchy

For extra directions, [go to the official react dev resources](https://react.dev/learn/thinking-in-react).

### Play

1. remove unnecessary code
2. change title, add font-awesome css in public/index.html
3. do React stuff to build the interface
    - Create the chatbox input and button to send data
    - Add the welcome message
    - Mock replies
4. structure the data
5. add the API call to the React input & button
6. call the openAPI. Here to you can think about wrapping the user input with a request of your own
    eg: Translate the input into emojis
7. manage the response. Feel free to manipulate that response too
8. manage the chat history
9. add the shiny stuff - typed responses, reactions, style, token count down. explore more of the openai options

For extra directions, [Follow this article](https://www.freecodecamp.org/news/generate-images-using-react-and-dall-e-api-react-and-openai-api-tutorial/).

#### Other resources

- [API reference](https://platform.openai.com/docs/api-reference)
- [Examples](https://platform.openai.com/examples)

### Mock data - examples of openAI responses for this implementation

```json
{
    "error": {
        "message": "Incorrect API key provided: undefined. You can find your API key at https://platform.openai.com/account/api-keys.",
        "type": "invalid_request_error",
        "param": null,
        "code": "invalid_api_key"
    }
}
```

```json
{
    "id":"cmpl-6haeoYJhY5IFYgJ985oSwXwNSLygx",
    "object":"text_completion",
    "created":1675847034,
    "model":"text-davinci-003",
    "choices":
        [
            {
                "text":" 🤠🔫👑",
                "index":0,
                "logprobs":null,
                "finish_reason":"stop"
            }
        ],
    "usage":
        {
            "prompt_tokens":13,
            "completion_tokens":8,
            "total_tokens":21
        }
}
```

Far Cry 6

```json
{"id":"cmpl-6hdziFJ2nbmsURYOYciiMEziGbS2t","object":"text_completion","created":1675859862,"model":"text-davinci-003","choices":[{"text":" 🔫 🔥 🗺️","index":0,"logprobs":null,"finish_reason":"stop"}],"usage":{"prompt_tokens":13,"completion_tokens":10,"total_tokens":23}}
```

Assasin's creed Valhalla

```json
{"id":"cmpl-6he4kCxIA8rF1IL9WcM5WbiSp2k48","object":"text_completion","created":1675860174,"model":"text-davinci-003","choices":[{"text":" 🤺⚔️🗡️🗿","index":0,"logprobs":null,"finish_reason":"stop"}],"usage":{"prompt_tokens":16,"completion_tokens":14,"total_tokens":30}}
```

FIFA

```json
{"id":"cmpl-6he4vZHSQUyAHvJmHF0xgYoKmxejC","object":"text_completion","created":1675860185,"model":"text-davinci-003","choices":[{"text":" 🎮⚽️","index":0,"logprobs":null,"finish_reason":"stop"}],"usage":{"prompt_tokens":12,"completion_tokens":7,"total_tokens":19}}
```