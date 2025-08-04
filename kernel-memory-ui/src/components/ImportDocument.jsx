// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function ImportDocument() {
// //   const [file, setFile] = useState(null);
// //   const [documentId, setDocumentId] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [messageType, setMessageType] = useState(""); // 'success', 'error', 'warning'
// //   const [loading, setLoading] = useState(false);
// //   const [existingDocuments, setExistingDocuments] = useState([]);
// //   const [duplicateWarning, setDuplicateWarning] = useState("");

// //   // Load existing documents when component mounts
// //   useEffect(() => {
// //     loadExistingDocuments();
// //   }, []);

// //   const loadExistingDocuments = async () => {
// //     try {
// //       const { data } = await axios.get("http://localhost:5150/api/memory/documents/ids");
// //       setExistingDocuments(data.documentIds || []);
// //     } catch (err) {
// //       console.error("Failed to load existing documents:", err);
// //     }
// //   };

// //   // Check for potential duplicates when file or document ID changes
// //   useEffect(() => {
// //     // Simple string similarity calculator
// //     const calculateSimilarity = (str1, str2) => {
// //       const longer = str1.length > str2.length ? str1 : str2;
// //       const shorter = str1.length > str2.length ? str2 : str1;
// //       const editDistance = levenshtein(longer, shorter);
// //       return (longer.length - editDistance) / longer.length;
// //     };

// //     // Levenshtein distance algorithm (simple implementation)
// //     const levenshtein = (str1, str2) => {
// //       const matrix = [];
// //       for (let i = 0; i <= str2.length; i++) {
// //         matrix[i] = [i];
// //       }
// //       for (let j = 0; j <= str1.length; j++) {
// //         matrix[0][j] = j;
// //       }
// //       for (let i = 1; i <= str2.length; i++) {
// //         for (let j = 1; j <= str1.length; j++) {
// //           if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
// //             matrix[i][j] = matrix[i - 1][j - 1];
// //           } else {
// //             matrix[i][j] = Math.min(
// //               matrix[i - 1][j - 1] + 1,
// //               matrix[i][j - 1] + 1,
// //               matrix[i - 1][j] + 1
// //             );
// //           }
// //         }
// //       }
// //       return matrix[str2.length][str1.length];
// //     };

// //     const checkForDuplicates = () => {
// //       setDuplicateWarning("");

// //       if (!file || !documentId) return;

// //       // Check if document ID already exists
// //       if (existingDocuments.includes(documentId)) {
// //         setDuplicateWarning(`⚠️ Document ID "${documentId}" already exists. Choose a different ID.`);
// //         return;
// //       }

// //       // Check for similar file names (basic duplicate detection)
// //       const fileName = file.name.toLowerCase();
// //       const similarNames = existingDocuments.filter(docId => {
// //         const similarity = calculateSimilarity(fileName, docId.toLowerCase());
// //         return similarity > 0.6; // 60% similarity threshold
// //       });

// //       if (similarNames.length > 0) {
// //         setDuplicateWarning(`⚠️ Similar documents found: ${similarNames.join(", ")}. Make sure you're not uploading a duplicate.`);
// //       }
// //     };

// //     checkForDuplicates();
// //   }, [file, documentId, existingDocuments]);

// //   // Generate suggested document ID based on filename
// //   const generateSuggestedId = (filename) => {
// //     if (!filename) return "";
    
// //     const nameWithoutExt = filename.split('.')[0];
// //     const cleanName = nameWithoutExt
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]/g, '_')
// //       .replace(/_+/g, '_')
// //       .replace(/^_|_$/g, '');
    
// //     const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
// //     return `${cleanName}_${timestamp}`;
// //   };

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     setFile(selectedFile);
    
// //     // Auto-suggest document ID based on filename
// //     if (selectedFile && !documentId) {
// //       const suggested = generateSuggestedId(selectedFile.name);
// //       setDocumentId(suggested);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");
// //     setMessageType("");
    
// //     if (!file || !documentId) {
// //       setMessage("Please choose a PDF and enter a document ID.");
// //       setMessageType("error");
// //       return;
// //     }

// //     // Check if document ID already exists
// //     if (existingDocuments.includes(documentId)) {
// //       setMessage("Document ID already exists. Please choose a different ID.");
// //       setMessageType("error");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const form = new FormData();
// //       form.append("DocumentId", documentId);
// //       form.append("File", file);

// //       const { data } = await axios.post("http://localhost:5150/api/memory/import", form, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
      
// //       setMessage(data.message);
// //       setMessageType("success");
      
// //       // Clear form on success
// //       setFile(null);
// //       setDocumentId("");
// //       setDuplicateWarning("");
      
// //       // Reset file input
// //       const fileInput = document.querySelector('input[type="file"]');
// //       if (fileInput) fileInput.value = '';
      
// //       // Refresh existing documents list
// //       loadExistingDocuments();
      
// //     } catch (err) {
// //       setMessage(err.response?.data?.message || "Upload failed.");
// //       setMessageType("error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDocumentIdChange = (e) => {
// //     const value = e.target.value;
// //     setDocumentId(value);
// //   };

// //   const getFileInfo = () => {
// //     if (!file) return null;
    
// //     const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
// //     return (
// //       <div className="file-info">
// //         <p><strong>Selected File:</strong> {file.name}</p>
// //         <p><strong>Size:</strong> {sizeInMB} MB</p>
// //         <p><strong>Type:</strong> {file.type}</p>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="import-section">
// //       <h2>Import Document</h2>
      
// //       <form onSubmit={handleSubmit} className="import-form">
// //         <div className="file-upload-section">
// //           <input
// //             type="file"
// //             accept=".pdf"
// //             onChange={handleFileChange}
// //             disabled={loading}
// //           />
// //           {getFileInfo()}
// //         </div>

// //         <div className="document-id-section">
// //           <div className="input-with-helper">
// //             <input
// //               type="text"
// //               placeholder="Document ID (e.g., report_2024_01_01)"
// //               value={documentId}
// //               onChange={handleDocumentIdChange}
// //               disabled={loading}
// //             />
// //             {file && !documentId && (
// //               <button 
// //                 type="button" 
// //                 onClick={() => setDocumentId(generateSuggestedId(file.name))}
// //                 className="suggest-btn"
// //               >
// //                 Suggest ID
// //               </button>
// //             )}
// //           </div>
          
// //           {/* Duplicate Warning */}
// //           {duplicateWarning && (
// //             <div className="duplicate-warning">
// //               {duplicateWarning}
// //             </div>
// //           )}
          
// //           {/* Document ID Guidelines */}
// //           <div className="id-guidelines">
// //             <small>
// //               <strong>Guidelines:</strong> Use unique, descriptive IDs like "financial_report_2024", "user_manual_v2", etc.
// //             </small>
// //           </div>
// //         </div>

// //         <button type="submit" disabled={loading || existingDocuments.includes(documentId)}>
// //           {loading ? (
// //             <>
// //               <span className="loader"></span>
// //               Importing...
// //             </>
// //           ) : (
// //             "Import"
// //           )}
// //         </button>
// //       </form>
      
// //       {/* Fixed message area */}
// //       <div className="import-message-container">
// //         <div className={`import-message ${messageType} ${message ? "active" : ""}`}>
// //           {message && <span>{message}</span>}
// //         </div>
// //       </div>

// //       {/* Existing Documents Info */}
// //       {existingDocuments.length > 0 && (
// //         <div className="existing-docs-info">
// //           <details>
// //             <summary>Existing Documents ({existingDocuments.length})</summary>
// //             <ul className="existing-docs-list">
// //               {existingDocuments.map((docId) => (
// //                 <li key={docId}>{docId}</li>
// //               ))}
// //             </ul>
// //           </details>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from '../config';

// export default function ImportDocument({ refreshTrigger, onDocumentChange }) {
//   const [file, setFile] = useState(null);
//   const [documentId, setDocumentId] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [existingDocuments, setExistingDocuments] = useState([]);
//   const [duplicateWarning, setDuplicateWarning] = useState("");

//   // Load existing documents when component mounts or when refreshTrigger changes
//   useEffect(() => {
//     loadExistingDocuments();
//   }, [refreshTrigger]);

//   const loadExistingDocuments = async () => {
//     try {
//       const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
//       setExistingDocuments(data.documentIds || []);
//     } catch (err) {
//       console.error("Failed to load existing documents:", err);
//     }
//   };

//   useEffect(() => {
//     const checkForDuplicates = () => {
//       setDuplicateWarning("");
//       if (!file || !documentId) return;

//       if (existingDocuments.includes(documentId)) {
//         setDuplicateWarning(`⚠️ Document ID "${documentId}" already exists. Choose a different ID.`);
//         return;
//       }
//     };

//     checkForDuplicates();
//   }, [file, documentId, existingDocuments]);

//   const generateSuggestedId = (filename) => {
//     if (!filename) return "";
//     const nameWithoutExt = filename.split('.')[0];
//     const cleanName = nameWithoutExt
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, '_')
//       .replace(/_+/g, '_')
//       .replace(/^_|_$/g, '');
//     const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     return `${cleanName}_${timestamp}`;
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     if (selectedFile && !documentId) {
//       const suggested = generateSuggestedId(selectedFile.name);
//       setDocumentId(suggested);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");
    
//     if (!file || !documentId) {
//       setMessage("Please choose a PDF and enter a document ID.");
//       setMessageType("error");
//       return;
//     }

//     if (existingDocuments.includes(documentId)) {
//       setMessage("Document ID already exists. Please choose a different ID.");
//       setMessageType("error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const form = new FormData();
//       form.append("DocumentId", documentId);
//       form.append("File", file);

//       const { data } = await axios.post(`${API_BASE_URL}/api/memory/import`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       setMessage(data.message);
//       setMessageType("success");
//       setFile(null);
//       setDocumentId("");
//       setDuplicateWarning("");
      
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = '';
      
//       // Trigger refresh across all components
//       if (onDocumentChange) {
//         onDocumentChange();
//       }
      
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Upload failed.");
//       setMessageType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="import-section">
//       <h2>Import Document</h2>
      
//       <form onSubmit={handleSubmit} className="import-form">
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handleFileChange}
//           disabled={loading}
//         />
        
//         <input
//           type="text"
//           placeholder="Document ID (e.g., report_2024_01_01)"
//           value={documentId}
//           onChange={(e) => setDocumentId(e.target.value)}
//           disabled={loading}
//         />
        
//         {duplicateWarning && (
//           <div className="duplicate-warning">
//             {duplicateWarning}
//           </div>
//         )}

//         <button type="submit" disabled={loading || existingDocuments.includes(documentId)}>
//           {loading ? (
//             <>
//               <span className="loader"></span>
//               Importing...
//             </>
//           ) : (
//             "Import"
//           )}
//         </button>
//       </form>
      
//       <div className="import-message-container">
//         <div className={`import-message ${messageType} ${message ? "active" : ""}`}>
//           {message && <span>{message}</span>}
//         </div>
//       </div>

//       {/* Existing Documents Info - Now Synchronized */}
//       {existingDocuments.length > 0 && (
//         <div className="existing-docs-info">
//           <details>
//             <summary>Existing Documents ({existingDocuments.length})</summary>
//             <ul className="existing-docs-list">
//               {existingDocuments.map((docId) => (
//                 <li key={docId}>{docId}</li>
//               ))}
//             </ul>
//           </details>
//         </div>
//       )}
//     </section>
//   );
// }






import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function ImportDocument({ refreshTrigger, onDocumentChange }) {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [loadingExistingDocs, setLoadingExistingDocs] = useState(false);

  // Load existing documents when component mounts or when refreshTrigger changes
  useEffect(() => {
    loadExistingDocuments();
  }, [refreshTrigger]);

  const loadExistingDocuments = async () => {
    setLoadingExistingDocs(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
      setExistingDocuments(data.documentIds || []);
    } catch (err) {
      console.error("Failed to load existing documents:", err);
    } finally {
      setLoadingExistingDocs(false);
    }
  };

  useEffect(() => {
    const checkForDuplicates = () => {
      setDuplicateWarning("");
      if (!file || !documentId) return;

      if (existingDocuments.includes(documentId)) {
        setDuplicateWarning(`⚠️ Document ID "${documentId}" already exists. Choose a different ID.`);
        return;
      }
    };

    checkForDuplicates();
  }, [file, documentId, existingDocuments]);

  const generateSuggestedId = (filename) => {
    if (!filename) return "";
    const nameWithoutExt = filename.split('.')[0];
    const cleanName = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${cleanName}_${timestamp}`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && !documentId) {
      const suggested = generateSuggestedId(selectedFile.name);
      setDocumentId(suggested);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    
    if (!file || !documentId) {
      setMessage("Please choose a PDF and enter a document ID.");
      setMessageType("error");
      return;
    }

    if (existingDocuments.includes(documentId)) {
      setMessage("Document ID already exists. Please choose a different ID.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("DocumentId", documentId);
      form.append("File", file);

      const { data } = await axios.post(`${API_BASE_URL}/api/memory/import`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage(data.message);
      setMessageType("success");
      setFile(null);
      setDocumentId("");
      setDuplicateWarning("");
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      // Trigger refresh across all components
      if (onDocumentChange) {
        onDocumentChange();
      }
      
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="import-section">
      <h2>Import Document</h2>
      
      <form onSubmit={handleSubmit} className="import-form">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
        
        <input
          type="text"
          placeholder="Document ID (e.g., report_2024_01_01)"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          disabled={loading}
        />
        
        {duplicateWarning && (
          <div className="duplicate-warning">
            {duplicateWarning}
          </div>
        )}

        <button type="submit" disabled={loading || existingDocuments.includes(documentId)}>
          {loading ? (
            <>
              <span className="loader"></span>
              Importing...
            </>
          ) : (
            "Import"
          )}
        </button>
      </form>
      
      <div className="import-message-container">
        <div className={`import-message ${messageType} ${message ? "active" : ""}`}>
          {message && <span>{message}</span>}
        </div>
      </div>

      {/* Existing Documents Info - Enhanced with Refresh Button */}
      {(existingDocuments.length > 0 || loadingExistingDocs) && (
        <div className="existing-docs-info">
          <details>
            <summary>
              <div className="existing-docs-header">
                <span>
                  Existing Documents ({loadingExistingDocs ? "..." : existingDocuments.length})
                </span>
                <button 
                  type="button"
                  onClick={loadExistingDocuments}
                  disabled={loadingExistingDocs}
                  className="refresh-existing-btn"
                  title="Refresh document list"
                >
                  {loadingExistingDocs ? "⟳" : "🔄"}
                </button>
              </div>
            </summary>
            {loadingExistingDocs ? (
              <div className="loading-existing-docs">
                <div className="loading-spinner-small"></div>
                <span>Loading documents...</span>
              </div>
            ) : (
              <ul className="existing-docs-list">
                {existingDocuments.map((docId) => (
                  <li key={docId}>{docId}</li>
                ))}
              </ul>
            )}
          </details>
        </div>
      )}
    </section>
  );
}