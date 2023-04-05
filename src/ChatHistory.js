// import TypedReply from "./TypedReply";

function ChatHistory({ chatHistory , response}) {
    console.log('chatHistory', chatHistory);
    console.log('response', response);
    return (
        <div className="chat">
            <div className={`chat-bubble-container openai-bubble-container`}>
                <div className="profile-picture"><img src={`/openai-avatar.png`} alt="openai" height="100%" /></div>
                <div className={`chat-bubble openai-bubble`}>
                    <p>Zi-mi zicala ta preferata!</p>
                </div>
            </div>
            {chatHistory.map((item, index) =>
                <div className={`chat-bubble-container ${item.type}-bubble-container`} key={index}>
                    <div className="profile-picture"><img src={`/${item.type}-avatar.png`} alt={item.type} height="100%" /></div>
                    <div className={`chat-bubble ${item.type}-bubble`}>
                        {item.data && 
                            (item.data.image && item.data.image.length > 0) ?
                                <div className={`image-container`}>
                                    <img src={item.data.image} alt={item.data.text} width="512" height="512" style={{ width: "100%" }} />
                                    <div className={`text-container`}>{item.data.text}</div>
                                </div>
                            : 
                            item.data.text
                        }
                    </div>
                </div>
            )}
            {(response.image.length > 0 && response.text.length > 0) &&
                <div className={`chat-bubble-container openai-bubble-container`} key="response">
                    <div className="profile-picture"><img src={`/openai-avatar.png`} alt="openai" height="100%" /></div>
                    <div className={`chat-bubble openai-bubble`}>
                        <div className={`image-container`}>
                            <img src={response.image} alt={response.text} width="512" height="512" style={{width: "100%"}} />
                            <div className={`text-container`}>{response.text}</div>
                        </div>
                    </div>
                </div>  
            }
        </div>
    )
}

export default ChatHistory;