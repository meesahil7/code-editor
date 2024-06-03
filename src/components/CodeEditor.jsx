import { useState, useEffect, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // You can choose any Prism theme you like

const CodeEditor = () => {
  const [code, setCode] = useState(`
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  }
  `);
  const [language, setLanguage] = useState("jsx"); // Default language
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleTextareaChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div>
      <label htmlFor="">Select Language : </label>
      <select name="" id="" onChange={(e) => setLanguage(e.target.value)}>
        <option value="tsx">TSX</option>
        <option value="jsx">JSX</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
      </select>
      <div style={styles.container}>
        <div style={styles.editorWrapper}>
          <textarea
            ref={textareaRef}
            style={styles.textarea}
            value={code}
            onChange={handleTextareaChange}
            placeholder="Write your code here..."
            spellCheck="false"
          />
          <div ref={preRef} style={styles.preWrapper}>
            <Highlight code={code} language={language} theme={themes.oneLight}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...styles.pre, ...style }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  editorWrapper: {
    position: "relative",
    width: "80%",
    maxWidth: "800px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    overflow: "hidden",
    fontSize: "16px",
    fontFamily: "monospace",
    lineHeight: "1.5",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    border: "none",
    outline: "none",
    zIndex: 1,
    backgroundColor: "transparent",
    color: "transparent",
    caretColor: "black",
    whiteSpace: "pre",
    overflow: "hidden",
    resize: "none",
    fontSize: "inherit",
    fontFamily: "inherit",
    lineHeight: "inherit",
  },
  preWrapper: {
    position: "relative",
    zIndex: 0,
    pointerEvents: "none", // Makes the pre element not interactable
  },
  pre: {
    margin: 0,
    padding: "10px",
    fontSize: "inherit",
    fontFamily: "inherit",
    lineHeight: "inherit",
    backgroundColor: "transparent",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};

export default CodeEditor;
