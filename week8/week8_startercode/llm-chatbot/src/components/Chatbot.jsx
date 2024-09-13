import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Chatbot Component
 *
 * This component implements a chatbot interface with markdown support.
 * It maintains a conversation history, sends messages to an API for processing,
 * and renders the chat messages with markdown formatting.
 */
const Chatbot = () => {
  // State for storing chat messages
  const [messages, setMessages] = useState([]);
  // State for storing the current input message
  const [inputMessage, setInputMessage] = useState("");

  // System prompt to guide the AI's behavior
  const SYSTEM_PROMPT = "You are a helpful and friendly socratic React Tutor.";

  // Initialize the chat with the system prompt
  useEffect(() => {
    setMessages([{ role: "system", content: SYSTEM_PROMPT }]);
  }, []);

  /**
   * Sends the current message to the API and updates the chat history
   */
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Create a new user message
    const userMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");

    try {
      // Send the updated message history to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      // Add the AI's response to the chat history
      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add an error message if the API call fails
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error.",
      };
      setMessages([...updatedMessages, errorMessage]);
    }
  };

  /**
   * MarkdownRenderer Component
   *
   * This component renders markdown content with syntax highlighting for code blocks.
   *
   * @param {Object} props - Component props
   * @param {string} props.content - The markdown content to render
   */
  const MarkdownRenderer = ({ content }) => (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={solarizedlight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="mb-4">Chatbot</h2>
          {/* Chat message display area */}
          <div
            className="border p-3 mb-3"
            style={{ height: "600px", overflowY: "auto" }}
          >
            {messages.slice(1).map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-2 ${
                  msg.role === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`${
                    msg.role === "user" ? "bg-primary text-white" : "bg-light"
                  } p-2 pb-1 rounded-3 max-width-75`}
                >
                  <MarkdownRenderer content={msg.content} />
                </div>
              </div>
            ))}
          </div>
          {/* Message input area */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
