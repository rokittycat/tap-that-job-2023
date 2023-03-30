import { useState, useEffect } from "react";

const TypedReply = ({ content = "", speed = 1000 }) => {
    // const [displayedContent, setDisplayedContent] = useState("");
    const [index, setIndex] = useState(0);

    //reset index on content change
    // useEffect(() => {
    //     setIndex(0);
    // }, [content])

    useEffect(() => {
        console.log('useEffect animKey', content, speed);
        setIndex(0);
        /*Create a new setInterval and store its id*/
        const animKey = setInterval(() => {
            setIndex((index) => {
                console.log('index', index);
                /*This setState function will set the index
                to index+1 if there is more content otherwise
                it will destory this animation*/

                if (index >= content.length - 1) {
                    clearInterval(animKey);
                    return index;
                }
                return index + 1;
            });
        }, speed);
    }, [content, speed]);

    // useEffect(() => {
    //     console.log('setDisplayedContent', index, content.slice(0, index));
    //     setDisplayedContent((displayedContent) => {
    //         if (index >= content.length - 1) {
    //             return content;
    //         }
    //         // return content.slice(0, index) + "█";
    //         return content.slice(0, index).join("") + "█";
    //     })
    // }, [content, index])

    let displayedContent = (content, index) => {
        if (index >= content.length - 1) {
            return content;
        }
        // return content.slice(0, index) + "█";
        return content.slice(0, index).join("") + "█";
    }

    return <pre className="type-writer">{displayedContent(content, index)}</pre>;
};


export default TypedReply;