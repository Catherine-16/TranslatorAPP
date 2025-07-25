import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("ig");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!inputText.trim()) return alert("Please enter some text to translate.");
  
    setLoading(true);
    try {
      const res = await fetch("https://api-b2b.backenster.com/b1/api/v3/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer a_dm2vsGu1oofu4SL21mzu30XLSSjQPfCXsTEg8XuyZokk8us0qBpor6JfFuu7XzzLZOin9OZOsplpOD7X"
        },
        body: JSON.stringify({
          from: sourceLang,
          to: targetLang,
          data: inputText,
          platform: "api"  // required field
        })
      });
  
      const result = await res.json();
      setTranslatedText(result.result); // 'result' contains translated text
    } catch (err) {
      console.error(err);
      alert("Translation failed.");
    }
    setLoading(false);
  };
  

  return (
    <div className="container">
      <h1>Bilingual Translator</h1>

      <textarea
        placeholder="Enter text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <div className="controls">
        <label>
          From:
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="en">English</option>
          </select>
        </label>

        <label>
          To:
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="ig">Igbo</option>

          </select>
        </label>

        <button onClick={translateText} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>

      <div className="output">
        <h3>Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default App;
