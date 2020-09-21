import React, { useState, useEffect } from "react";
import "./App.css";
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(` <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
    </html>`);
    }, 300);
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  //   const srcDoc = ` <html>
  //    <body>${html}</body>
  //    <style>${css}</style>
  //    <script>${javascript}</script>
  //  </html>`;

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="html"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
