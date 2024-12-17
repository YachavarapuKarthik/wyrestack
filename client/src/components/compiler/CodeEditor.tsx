import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // For Python syntax highlighting
import 'ace-builds/src-noconflict/mode-java'; // For Java syntax highlighting
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    const response = await fetch('http://localhost:5000/online-compiler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code })
    });
    const data = await response.json();
    setOutput(data.output);
  };

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <AceEditor
        mode={language === 'python' ? 'python' : 'java'}
        theme="monokai"
        name="code-editor"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="300px"
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
