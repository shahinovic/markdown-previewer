import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { marked } from "marked";
import { useLocalStorage } from "./useLocalStorage";
import { Docs } from "./Docs";
import { RenderDocs } from "./RenderDocs";

const App = () => {
  const [code, setCode] = useLocalStorage("code", "## Hello");
  const [compiled, setCompiled] = useLocalStorage(
    "compiled",
    '<h2 id="hello">Hello</h2>'
  );
  const [hide, hidePreview] = useLocalStorage("hide", true);
  const [docs, setDocs] = useLocalStorage("docs", Docs);
  useEffect(() => {
    const API_URL = "https://www.markdownguide.org/api/v1/basic-syntax.json";

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setDocs(response.data); // log the response data to the console
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openMD = () => {
    console.log(0);
    hidePreview("code");
  };

  const openPreview = () => {
    console.log(0);
    hidePreview("preview");
  };
  const openDocs = () => {
    hidePreview("docs");
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  const renderCode = () => {
    return (
      <div>
        <textarea onChange={handleChange} value={code} />
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div>
        <textarea value={compiled} />
      </div>
    );
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={hide === "code" ? "btn" : ""}>
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={hide === "preview" ? "btn" : ""}
          >
            Preview
          </button>
          <button onClick={openDocs} className={hide === "docs" ? "btn" : ""}>
            Docs
          </button>
        </div>
        {hide === "code" && renderCode()}
        {hide === "preview" && renderPreview()}
        {hide === "docs" && <RenderDocs docs={docs} />}
      </div>
    </>
  );
};

export default App;
