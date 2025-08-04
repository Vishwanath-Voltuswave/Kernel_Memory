// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { API_BASE_URL } from '../config';

// // // export default function AskDocument() {
// // //   const [documentId, setDocumentId] = useState("");
// // //   const [question, setQuestion] = useState("");
// // //   const [answer, setAnswer] = useState(null);
// // //   const [error, setError] = useState("");
// // //   const [searchMode, setSearchMode] = useState("specific");
// // //   const [loading, setLoading] = useState(false);
// // //   const [availableDocuments, setAvailableDocuments] = useState([]);

// // //   useEffect(() => {
// // //     if (searchMode === "specific") {
// // //       loadAvailableDocuments();
// // //     }
// // //   }, [searchMode]);

// // //   const loadAvailableDocuments = async () => {
// // //     try {
// // //       const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
// // //       setAvailableDocuments(data.documentIds || []);
// // //     } catch (err) {
// // //       console.error("Failed to load document IDs:", err);
// // //     }
// // //   };

// // //   const handleAsk = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setAnswer(null);
// // //     setLoading(true);

// // //     if (!question.trim()) {
// // //       setError("Please enter a question.");
// // //       setLoading(false);
// // //       return;
// // //     }
// // //     if (searchMode === "specific" && !documentId.trim()) {
// // //       setError("Please select a document for specific search.");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       const params = { question: question.trim() };
// // //       if (searchMode === "specific") {
// // //         params.documentId = documentId.trim();
// // //       }
// // //       const { data } = await axios.get(`${API_BASE_URL}/api/memory/ask`, { params });
// // //       setAnswer(data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || err.message || "Query failed.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <section className="ask-section">
// // //       <h2>Ask Document</h2>

// // //       <div className="mode-toggle">
// // //         <label>
// // //           <input
// // //             type="radio"
// // //             value="specific"
// // //             checked={searchMode === "specific"}
// // //             onChange={() => setSearchMode("specific")}
// // //           />
// // //           Search Specific Document
// // //         </label>
// // //         <label>
// // //           <input
// // //             type="radio"
// // //             value="global"
// // //             checked={searchMode === "global"}
// // //             onChange={() => setSearchMode("global")}
// // //           />
// // //           Search All Documents
// // //         </label>
// // //       </div>

// // //       <form onSubmit={handleAsk} className="ask-form">
// // //         {searchMode === "specific" && (
// // //           <select
// // //             value={documentId}
// // //             onChange={(e) => setDocumentId(e.target.value)}
// // //             disabled={loading}
// // //           >
// // //             <option value="">-- Select a document --</option>
// // //             {availableDocuments.map((docId) => (
// // //               <option key={docId} value={docId}>{docId}</option>
// // //             ))}
// // //           </select>
// // //         )}
        
// // //         <input
// // //           type="text"
// // //           placeholder="Your question"
// // //           value={question}
// // //           onChange={(e) => setQuestion(e.target.value)}
// // //           disabled={loading}
// // //         />
        
// // //         <button type="submit" disabled={loading}>
// // //           {loading ? (
// // //             <>
// // //               <span className="loader"></span>
// // //               {searchMode === "specific" ? "Searching Document..." : "Searching All Documents..."}
// // //             </>
// // //           ) : searchMode === "specific" ? (
// // //             "Ask Document"
// // //           ) : (
// // //             "Ask All Documents"
// // //           )}
// // //         </button>
// // //       </form>

// // //       <div className="response-container">
// // //         <div className={`error-section ${error ? "active" : ""}`}>
// // //           <div className="error-content">
// // //             {error && <span>{error}</span>}
// // //           </div>
// // //         </div>

// // //         <div className={`loading-section ${loading ? "active" : ""}`}>
// // //           <div className="loading-content">
// // //             <div className="loading-spinner"></div>
// // //             <p>Processing your question...</p>
// // //           </div>
// // //         </div>

// // //         <div className={`result-section ${answer && !loading ? "active" : ""}`}>
// // //           <div className="result-content">
// // //             {answer && !loading && (
// // //               <>
// // //                 <h3>Result {searchMode === "global" && "(from all documents)"}</h3>
// // //                 <p>{answer.text}</p>
// // //                 <h4>Sources</h4>
// // //                 <ul className="sources-list">
// // //                   {answer.relevantSources?.map((src, i) =>
// // //                     src.partitions.map((p, j) => (
// // //                       <li key={`${i}-${j}`}>
// // //                         {src.sourceName} – Document: {src.documentId} ({Math.round(p.relevance * 100)}%)
// // //                       </li>
// // //                     ))
// // //                   )}
// // //                 </ul>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function AskDocument() {
// //   const [documentId, setDocumentId] = useState("");
// //   const [question, setQuestion] = useState("");
// //   const [answer, setAnswer] = useState(null);
// //   const [error, setError] = useState("");
// //   const [searchMode, setSearchMode] = useState("specific");
// //   const [loading, setLoading] = useState(false);
// //   const [availableDocuments, setAvailableDocuments] = useState([]);
// //   const [loadingDocuments, setLoadingDocuments] = useState(false);

// //   // Load available documents when component mounts or when switching to specific mode
// //   useEffect(() => {
// //     if (searchMode === "specific") {
// //       loadAvailableDocuments();
// //     }
// //   }, [searchMode]);

// //   const loadAvailableDocuments = async () => {
// //     setLoadingDocuments(true);
// //     try {
// //       const { data } = await axios.get("http://localhost:5150/api/memory/documents/ids");
// //       setAvailableDocuments(data.documentIds || []);
// //     } catch (err) {
// //       console.error("Failed to load document IDs:", err);
// //       setAvailableDocuments([]);
// //     } finally {
// //       setLoadingDocuments(false);
// //     }
// //   };

// //   const handleAsk = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setAnswer(null);
// //     setLoading(true);

// //     if (!question.trim()) {
// //       setError("Please enter a question.");
// //       setLoading(false);
// //       return;
// //     }
// //     if (searchMode === "specific" && !documentId.trim()) {
// //       setError("Please select a document for specific search.");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const params = { question: question.trim() };
// //       if (searchMode === "specific") {
// //         params.documentId = documentId.trim();
// //       }
// //       const { data } = await axios.get("http://localhost:5150/api/memory/ask", { params });
// //       setAnswer(data);
// //     } catch (err) {
// //       setError(err.response?.data?.message || err.message || "Query failed.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="ask-section">
// //       <h2>Ask Document</h2>

// //       <div className="mode-toggle">
// //         <label>
// //           <input
// //             type="radio"
// //             value="specific"
// //             checked={searchMode === "specific"}
// //             onChange={() => setSearchMode("specific")}
// //           />
// //           Search Specific Document
// //         </label>
// //         <label>
// //           <input
// //             type="radio"
// //             value="global"
// //             checked={searchMode === "global"}
// //             onChange={() => setSearchMode("global")}
// //           />
// //           Search All Documents
// //         </label>
// //       </div>

// //       <form onSubmit={handleAsk} className="ask-form">
// //         {searchMode === "specific" && (
// //           <div className="document-selector">
// //             <div className="selector-header">
// //               <label htmlFor="documentSelect">Select Document:</label>
// //               <button 
// //                 type="button" 
// //                 onClick={loadAvailableDocuments}
// //                 disabled={loadingDocuments}
// //                 className="refresh-docs-btn"
// //               >
// //                 {loadingDocuments ? "Loading..." : "🔄"}
// //               </button>
// //             </div>
            
// //             {availableDocuments.length > 0 ? (
// //               <select
// //                 id="documentSelect"
// //                 value={documentId}
// //                 onChange={(e) => setDocumentId(e.target.value)}
// //                 disabled={loading}
// //                 className="document-select"
// //               >
// //                 <option value="">-- Select a document --</option>
// //                 {availableDocuments.map((docId) => (
// //                   <option key={docId} value={docId}>
// //                     {docId}
// //                   </option>
// //                 ))}
// //               </select>
// //             ) : loadingDocuments ? (
// //               <div className="loading-documents">
// //                 <span>Loading available documents...</span>
// //               </div>
// //             ) : (
// //               <div className="no-documents">
// //                 <p>No documents found. Please import a document first.</p>
// //                 <input
// //                   type="text"
// //                   placeholder="Or enter Document ID manually"
// //                   value={documentId}
// //                   onChange={(e) => setDocumentId(e.target.value)}
// //                   disabled={loading}
// //                 />
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         <input
// //           type="text"
// //           placeholder="Your question"
// //           value={question}
// //           onChange={(e) => setQuestion(e.target.value)}
// //           disabled={loading}
// //         />
        
// //         <button type="submit" disabled={loading}>
// //           {loading ? (
// //             <>
// //               <span className="loader"></span>
// //               {searchMode === "specific"
// //                 ? "Searching Document..."
// //                 : "Searching All Documents..."}
// //             </>
// //           ) : searchMode === "specific" ? (
// //             "Ask Document"
// //           ) : (
// //             "Ask All Documents"
// //           )}
// //         </button>
// //       </form>

// //       {/* FIXED RESPONSE CONTAINER */}
// //       <div className="response-container">
// //         {/* Error slot - always 60px */}
// //         <div className={`error-section ${error ? "active" : ""}`}>
// //           <div className="error-content">
// //             {error && <span>{error}</span>}
// //           </div>
// //         </div>

// //         {/* Loading slot - always 80px */}
// //         <div className={`loading-section ${loading ? "active" : ""}`}>
// //           <div className="loading-content">
// //             <div className="loading-spinner"></div>
// //             <p>Processing your question...</p>
// //           </div>
// //         </div>

// //         {/* Result slot - fills remaining space with scroll */}
// //         <div className={`result-section ${answer && !loading ? "active" : ""}`}>
// //           <div className="result-content">
// //             {answer && !loading && (
// //               <>
// //                 <h3>
// //                   Result {searchMode === "global" && "(from all documents)"}
// //                   {searchMode === "specific" && documentId && ` (from ${documentId})`}
// //                 </h3>
// //                 <p>{answer.text}</p>
// //                 <h4>Sources ({answer.relevantSources?.length || 0})</h4>
// //                 <ul className="sources-list">
// //                   {answer.relevantSources?.map((src, i) =>
// //                     src.partitions.map((p, j) => (
// //                       <li key={`${i}-${j}`}>
// //                         <div className="source-item">
// //                           <div className="source-header">
// //                             <strong>{src.sourceName}</strong>
// //                             <span className="relevance-score">{Math.round(p.relevance * 100)}%</span>
// //                           </div>
// //                           <div className="source-details">
// //                             Document: {src.documentId}
// //                           </div>
// //                         </div>
// //                       </li>
// //                     ))
// //                   )}
// //                 </ul>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from '../config';

// export default function AskDocument() {
//   const [documentId, setDocumentId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState(null);
//   const [error, setError] = useState("");
//   const [searchMode, setSearchMode] = useState("specific");
//   const [loading, setLoading] = useState(false);
//   const [availableDocuments, setAvailableDocuments] = useState([]);
//   const [loadingDocuments, setLoadingDocuments] = useState(false);

//   // Load available documents when component mounts or when switching to specific mode
//   useEffect(() => {
//     if (searchMode === "specific") {
//       loadAvailableDocuments();
//     }
//   }, [searchMode]);

//   const loadAvailableDocuments = async () => {
//     setLoadingDocuments(true);
//     try {
//       const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
//       setAvailableDocuments(data.documentIds || []);
//     } catch (err) {
//       console.error("Failed to load document IDs:", err);
//       setAvailableDocuments([]);
//     } finally {
//       setLoadingDocuments(false);
//     }
//   };

//   const handleAsk = async (e) => {
//     e.preventDefault();
//     setError("");
//     setAnswer(null);
//     setLoading(true);

//     if (!question.trim()) {
//       setError("Please enter a question.");
//       setLoading(false);
//       return;
//     }
//     if (searchMode === "specific" && !documentId.trim()) {
//       setError("Please select a document for specific search.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const params = { question: question.trim() };
//       if (searchMode === "specific") {
//         params.documentId = documentId.trim();
//       }
//       const { data } = await axios.get(`${API_BASE_URL}/api/memory/ask`, { params });
//       setAnswer(data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Query failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="ask-section">
//       <h2>Ask Document</h2>

//       <div className="mode-toggle">
//         <label>
//           <input
//             type="radio"
//             value="specific"
//             checked={searchMode === "specific"}
//             onChange={() => setSearchMode("specific")}
//           />
//           Search Specific Document
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="global"
//             checked={searchMode === "global"}
//             onChange={() => setSearchMode("global")}
//           />
//           Search All Documents
//         </label>
//       </div>

//       <form onSubmit={handleAsk} className="ask-form">
//         {searchMode === "specific" && (
//           <div className="document-selector">
//             <label htmlFor="documentSelect" className="select-label">Select Document:</label>
//             {availableDocuments.length > 0 ? (
//               <div className="select-container">
//                 <select
//                   id="documentSelect"
//                   value={documentId}
//                   onChange={(e) => setDocumentId(e.target.value)}
//                   disabled={loading}
//                   className="document-select"
//                 >
//                   <option value="">-- Select a document --</option>
//                   {availableDocuments.map((docId) => (
//                     <option key={docId} value={docId}>
//                       {docId}
//                     </option>
//                   ))}
//                 </select>
//                 <button 
//                   type="button" 
//                   onClick={loadAvailableDocuments}
//                   disabled={loadingDocuments}
//                   className="refresh-docs-btn"
//                   title="Refresh document list"
//                 >
//                   {loadingDocuments ? "Loading..." : "Refresh"}
//                 </button>
//               </div>
//             ) : loadingDocuments ? (
//               <div className="loading-documents">
//                 <span>Loading available documents...</span>
//               </div>
//             ) : (
//               <div className="no-documents">
//                 <p>No documents found. Please import a document first.</p>
//                 <input
//                   type="text"
//                   placeholder="Or enter Document ID manually"
//                   value={documentId}
//                   onChange={(e) => setDocumentId(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//             )}
//           </div>
//         )}
        
//         <input
//           type="text"
//           placeholder="Your question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           disabled={loading}
//         />
        
//         <button type="submit" disabled={loading}>
//           {loading ? (
//             <>
//               <span className="loader"></span>
//               {searchMode === "specific"
//                 ? "Searching Document..."
//                 : "Searching All Documents..."}
//             </>
//           ) : searchMode === "specific" ? (
//             "Ask Document"
//           ) : (
//             "Ask All Documents"
//           )}
//         </button>
//       </form>

//       {/* FIXED RESPONSE CONTAINER */}
//       <div className="response-container">
//         {/* Error slot */}
//         <div className={`error-section ${error ? "active" : ""}`}>
//           <div className="error-content">
//             {error && <span>{error}</span>}
//           </div>
//         </div>

//         {/* Loading slot */}
//         <div className={`loading-section ${loading ? "active" : ""}`}>
//           <div className="loading-content">
//             <div className="loading-spinner"></div>
//             <p>Processing your question...</p>
//           </div>
//         </div>

//         {/* Result slot */}
//         <div className={`result-section ${answer && !loading ? "active" : ""}`}>
//           <div className="result-content">
//             {answer && !loading && (
//               <>
//                 <h3>
//                   Result {searchMode === "global" && "(from all documents)"}
//                   {searchMode === "specific" && documentId && ` (from ${documentId})`}
//                 </h3>
//                 <p>{answer.text}</p>
//                 <h4>Sources ({answer.relevantSources?.length || 0})</h4>
//                 <ul className="sources-list">
//                   {answer.relevantSources?.map((src, i) =>
//                     src.partitions.map((p, j) => (
//                       <li key={`${i}-${j}`}>
//                         <div className="source-item">
//                           <div className="source-header">
//                             <strong>{src.sourceName}</strong>
//                             <span className="relevance-score">{Math.round(p.relevance * 100)}%</span>
//                           </div>
//                           <div className="source-details">
//                             Document: {src.documentId}
//                           </div>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                 </ul>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }











import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function AskDocument({ refreshTrigger }) {
  const [documentId, setDocumentId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState("specific");
  const [loading, setLoading] = useState(false);
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  // Load available documents when component mounts, mode changes, or refreshTrigger changes
  useEffect(() => {
    if (searchMode === "specific") {
      loadAvailableDocuments();
    }
  }, [searchMode, refreshTrigger]);

  const loadAvailableDocuments = async () => {
    setLoadingDocuments(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
      setAvailableDocuments(data.documentIds || []);
    } catch (err) {
      console.error("Failed to load document IDs:", err);
      setAvailableDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    setError("");
    setAnswer(null);
    setLoading(true);

    if (!question.trim()) {
      setError("Please enter a question.");
      setLoading(false);
      return;
    }
    if (searchMode === "specific" && !documentId.trim()) {
      setError("Please select a document for specific search.");
      setLoading(false);
      return;
    }

    try {
      const params = { question: question.trim() };
      if (searchMode === "specific") {
        params.documentId = documentId.trim();
      }
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/ask`, { params });
      setAnswer(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Query failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ask-section">
      <h2>Ask Document</h2>

      <div className="mode-toggle">
        <label>
          <input
            type="radio"
            value="specific"
            checked={searchMode === "specific"}
            onChange={() => setSearchMode("specific")}
          />
          Search Specific Document
        </label>
        <label>
          <input
            type="radio"
            value="global"
            checked={searchMode === "global"}
            onChange={() => setSearchMode("global")}
          />
          Search All Documents
        </label>
      </div>

      <form onSubmit={handleAsk} className="ask-form">
        {searchMode === "specific" && (
          <div className="document-selector">
            <label htmlFor="documentSelect" className="select-label">Select Document:</label>
            {availableDocuments.length > 0 ? (
              <div className="select-container">
                <select
                  id="documentSelect"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  disabled={loading}
                  className="document-select"
                >
                  <option value="">-- Select a document --</option>
                  {availableDocuments.map((docId) => (
                    <option key={docId} value={docId}>
                      {docId}
                    </option>
                  ))}
                </select>
                <button 
                  type="button" 
                  onClick={loadAvailableDocuments}
                  disabled={loadingDocuments}
                  className="refresh-docs-btn"
                  title="Refresh document list"
                >
                  {loadingDocuments ? "Loading..." : "Refresh"}
                </button>
              </div>
            ) : loadingDocuments ? (
              <div className="loading-documents">
                <span>Loading available documents...</span>
              </div>
            ) : (
              <div className="no-documents">
                <p>No documents found. Please import a document first.</p>
                <input
                  type="text"
                  placeholder="Or enter Document ID manually"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </div>
        )}
        
        <input
          type="text"
          placeholder="Your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="loader"></span>
              {searchMode === "specific"
                ? "Searching Document..."
                : "Searching All Documents..."}
            </>
          ) : searchMode === "specific" ? (
            "Ask Document"
          ) : (
            "Ask All Documents"
          )}
        </button>
      </form>

      <div className="response-container">
        <div className={`error-section ${error ? "active" : ""}`}>
          <div className="error-content">
            {error && <span>{error}</span>}
          </div>
        </div>

        <div className={`loading-section ${loading ? "active" : ""}`}>
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>Processing your question...</p>
          </div>
        </div>

        <div className={`result-section ${answer && !loading ? "active" : ""}`}>
          <div className="result-content">
            {answer && !loading && (
              <>
                <h3>
                  Result {searchMode === "global" && "(from all documents)"}
                  {searchMode === "specific" && documentId && ` (from ${documentId})`}
                </h3>
                <p>{answer.text}</p>
                <h4>Sources ({answer.relevantSources?.length || 0})</h4>
                <ul className="sources-list">
                  {answer.relevantSources?.map((src, i) =>
                    src.partitions.map((p, j) => (
                      <li key={`${i}-${j}`}>
                        <div className="source-item">
                          <div className="source-header">
                            <strong>{src.sourceName}</strong>
                            <span className="relevance-score">{Math.round(p.relevance * 100)}%</span>
                          </div>
                          <div className="source-details">
                            Document: {src.documentId}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}