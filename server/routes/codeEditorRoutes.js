const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');

const router = express.Router();

// POST /api/execute-code route
router.post('/', (req, res) => {
  const { language, code } = req.body;

  if (language === 'python') {
    // Handle Python code execution
    executePythonCode(code, res);
  } else if (language === 'java') {
    // Handle Java code execution
    executeJavaCode(code, res);
  } else {
    res.status(400).send({ output: 'Unsupported language' });
  }
});

// Function to execute Python code
const executePythonCode = (code, res) => {
  const fileName = 'temp_code.py';
  fs.writeFileSync(fileName, code); // Write the received Python code to a file

  exec(`python ${fileName}`, (err, stdout, stderr) => {
    if (err) {
      // In case of error, send the stderr as output
      res.status(500).send({ output: stderr });
    } else {
      // Send the standard output (stdout) of the code execution
      res.send({ output: stdout });
    }
  });
};

// Function to execute Java code
const executeJavaCode = (code, res) => {
  const fileName = 'TempCode.java';
  fs.writeFileSync(fileName, code); // Write the received Java code to a file

  exec(`javac ${fileName} && java TempCode`, (err, stdout, stderr) => {
    if (err) {
      // In case of error, send the stderr as output
      res.status(500).send({ output: stderr });
    } else {
      // Send the standard output (stdout) of the code execution
      res.send({ output: stdout });
    }
  });
};

module.exports = router;
