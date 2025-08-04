// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { API_BASE_URL } from '../config';

// // // export default function DocumentBrowser() {
// // //   const [documents, setDocuments] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     loadDocuments();
// // //   }, []);

// // //   const loadDocuments = async () => {
// // //     setLoading(true);
// // //     setError("");
// // //     try {
// // //       const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents`);
// // //       setDocuments(data.documents || []);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || err.message || "Failed to load documents.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <section className="document-browser-section">
// // //       <div className="browser-header">
// // //         <h2>Document Browser</h2>
// // //         <button onClick={loadDocuments} disabled={loading} className="refresh-btn">
// // //           {loading ? "Loading..." : "Refresh"}
// // //         </button>
// // //       </div>

// // //       {error && <div className="error-banner">{error}</div>}

// // //       <div className="documents-list">
// // //         {loading && documents.length === 0 ? (
// // //           <div className="loading-state">
// // //             <div className="loading-spinner"></div>
// // //             <p>Loading documents...</p>
// // //           </div>
// // //         ) : documents.length === 0 ? (
// // //           <div className="empty-state">
// // //             <h3>No Documents Found</h3>
// // //             <p>Upload your first document using the Import section above.</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="documents-summary">
// // //               <p>Found <strong>{documents.length}</strong> document(s)</p>
// // //             </div>
// // //             <div className="documents-grid">
// // //               {documents.map((doc) => (
// // //                 <div key={doc.documentId} className="document-card">
// // //                   <div className="card-header">
// // //                     <h3>{doc.documentId}</h3>
// // //                   </div>
// // //                   <div className="card-content">
// // //                     <div className="document-stats">
// // //                       <div className="stat">
// // //                         <span className="stat-label">Chunks:</span>
// // //                         <span className="stat-value">{doc.chunkCount}</span>
// // //                       </div>
// // //                       <div className="stat">
// // //                         <span className="stat-label">Size:</span>
// // //                         <span className="stat-value">{Math.round(doc.totalCharacters/1000)}K chars</span>
// // //                       </div>
// // //                     </div>
// // //                     <div className="document-preview">
// // //                       <p>{doc.firstChunkPreview}</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </section>
// // //   );
// // // }


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function DocumentBrowser() {
// //   const [documents, setDocuments] = useState([]);
// //   const [selectedDocument, setSelectedDocument] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [view, setView] = useState("list"); // "list" or "details"

// //   // Load all documents on component mount
// //   useEffect(() => {
// //     loadDocuments();
// //   }, []);

// //   const loadDocuments = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       // Updated to use your actual backend port
// //       const { data } = await axios.get("http://localhost:5150/api/memory/documents");
// //       setDocuments(data.documents || []);
// //     } catch (err) {
// //       console.error("API Error:", err); // Add logging
// //       setError(err.response?.data?.message || err.message || "Failed to load documents.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadDocumentDetails = async (documentId) => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const { data } = await axios.get(`http://localhost:5150/api/memory/documents/${documentId}`);
// //       setSelectedDocument(data);
// //       setView("details");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to load document details.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteDocument = async (documentId) => {
// //     if (!window.confirm(`Are you sure you want to delete document "${documentId}"?`)) {
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     try {
// //       await axios.delete(`http://localhost:5150/api/memory/documents/${documentId}`);
// //       setDocuments(documents.filter(doc => doc.documentId !== documentId));
// //       if (selectedDocument?.documentId === documentId) {
// //         setSelectedDocument(null);
// //         setView("list");
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to delete document.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formatFileSize = (characters) => {
// //     if (characters < 1000) return `${characters} chars`;
// //     if (characters < 1000000) return `${(characters / 1000).toFixed(1)}K chars`;
// //     return `${(characters / 1000000).toFixed(1)}M chars`;
// //   };

// //   return (
// //     <section className="document-browser-section">
// //       <div className="browser-header">
// //         <h2>Document Browser</h2>
// //         <div className="browser-controls">
// //           <button onClick={loadDocuments} disabled={loading} className="refresh-btn">
// //             {loading ? "Loading..." : "Refresh"}
// //           </button>
// //           {view === "details" && (
// //             <button onClick={() => { setView("list"); setSelectedDocument(null); }} className="back-btn">
// //               ← Back to List
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {error && (
// //         <div className="error-banner">
// //           {error}
// //         </div>
// //       )}

// //       {view === "list" && (
// //         <div className="documents-list">
// //           {loading && documents.length === 0 ? (
// //             <div className="loading-state">
// //               <div className="loading-spinner"></div>
// //               <p>Loading documents...</p>
// //             </div>
// //           ) : documents.length === 0 ? (
// //             <div className="empty-state">
// //               <h3>No Documents Found</h3>
// //               <p>Upload your first document using the Import section above.</p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="documents-summary">
// //                 <p>Found <strong>{documents.length}</strong> document(s) in the memory store</p>
// //               </div>
              
// //               <div className="documents-grid">
// //                 {documents.map((doc) => (
// //                   <div key={doc.documentId} className="document-card">
// //                     <div className="card-header">
// //                       <h3>{doc.documentId}</h3>
// //                       <div className="card-actions">
// //                         <button 
// //                           onClick={() => loadDocumentDetails(doc.documentId)}
// //                           className="view-btn"
// //                           title="View Details"
// //                         >
// //                           👁️
// //                         </button>
// //                         <button 
// //                           onClick={() => deleteDocument(doc.documentId)}
// //                           className="delete-btn"
// //                           title="Delete Document"
// //                         >
// //                           🗑️
// //                         </button>
// //                       </div>
// //                     </div>
                    
// //                     <div className="card-content">
// //                       <div className="document-stats">
// //                         <div className="stat">
// //                           <span className="stat-label">Chunks:</span>
// //                           <span className="stat-value">{doc.chunkCount}</span>
// //                         </div>
// //                         <div className="stat">
// //                           <span className="stat-label">Size:</span>
// //                           <span className="stat-value">{formatFileSize(doc.totalCharacters)}</span>
// //                         </div>
// //                       </div>
                      
// //                       <div className="document-preview">
// //                         <p>{doc.firstChunkPreview}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       {view === "details" && selectedDocument && (
// //         <div className="document-details">
// //           <div className="details-header">
// //             <h3>Document: {selectedDocument.documentId}</h3>
// //             <div className="document-info">
// //               <div className="info-grid">
// //                 <div className="info-item">
// //                   <span className="label">Status:</span>
// //                   <span className={`status ${selectedDocument.isReady ? 'ready' : 'processing'}`}>
// //                     {selectedDocument.isReady ? 'Ready' : 'Processing'}
// //                   </span>
// //                 </div>
// //                 <div className="info-item">
// //                   <span className="label">Chunks:</span>
// //                   <span className="value">{selectedDocument.chunkCount}</span>
// //                 </div>
// //                 <div className="info-item">
// //                   <span className="label">Total Size:</span>
// //                   <span className="value">{formatFileSize(selectedDocument.totalCharacters)}</span>
// //                 </div>
// //                 <div className="info-item">
// //                   <span className="label">Avg Chunk Size:</span>
// //                   <span className="value">{selectedDocument.averageChunkSize} chars</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="chunks-section">
// //             <h4>Document Chunks ({selectedDocument.chunks.length})</h4>
// //             <div className="chunks-list">
// //               {selectedDocument.chunks.map((chunk, index) => (
// //                 <div key={index} className="chunk-card">
// //                   <div className="chunk-header">
// //                     <span className="chunk-number">Chunk {chunk.index}</span>
// //                     <span className="chunk-size">{chunk.characterCount} chars</span>
// //                   </div>
// //                   <div className="chunk-content">
// //                     <p>{chunk.preview}</p>
// //                     {chunk.preview.endsWith('...') && (
// //                       <button 
// //                         onClick={() => {
// //                           // Toggle showing full text
// //                           const updatedChunks = [...selectedDocument.chunks];
// //                           updatedChunks[index] = {
// //                             ...chunk,
// //                             preview: chunk.preview.endsWith('...') ? chunk.fullText : chunk.fullText.substring(0, 200) + '...'
// //                           };
// //                           setSelectedDocument({
// //                             ...selectedDocument,
// //                             chunks: updatedChunks
// //                           });
// //                         }}
// //                         className="expand-btn"
// //                       >
// //                         Show More
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }






import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function DocumentBrowser({ refreshTrigger, onDocumentChange }) {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("list"); // "list" or "details"

  // Load documents when component mounts or when refreshTrigger changes
  useEffect(() => {
    loadDocuments();
  }, [refreshTrigger]);

  const loadDocumentDetails = async (documentId) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/${documentId}`);
      setSelectedDocument(data);
      setView("details");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load document details.");
    } finally {
      setLoading(false);
    }
  };
  const loadDocuments = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents`);
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    if (!window.confirm(`Are you sure you want to delete document "${documentId}"?`)) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API_BASE_URL}/api/memory/documents/${documentId}`);
      
      // Remove from local state immediately
      setDocuments(documents.filter(doc => doc.documentId !== documentId));
      
      // Trigger refresh across all components
      if (onDocumentChange) {
        onDocumentChange();
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="document-browser-section">
      <div className="browser-header">
        <h2>Document Browser</h2>
        <div className="browser-controls">
          <button onClick={loadDocuments} disabled={loading} className="refresh-btn">
            {loading ? "Loading..." : "Refresh"}
          </button>
          {view === "details" && (
            <button onClick={() => { setView("list"); setSelectedDocument(null); }} className="back-btn">
              ← Back to List
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="documents-list">
        {view === "list" && (
          <>
            {loading && documents.length === 0 ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="empty-state">
                <h3>No Documents Found</h3>
                <p>Upload your first document using the Import section above.</p>
              </div>
            ) : (
              <>
                <div className="documents-summary">
                  <p>Found <strong>{documents.length}</strong> document(s) in the memory store</p>
                </div>
                <div className="documents-grid">
                  {documents.map((doc) => (
                    <div key={doc.documentId} className="document-card">
                      <div className="card-header">
                        <h3>{doc.documentId}</h3>
                        <div className="card-actions">
                          <button 
                            onClick={() => loadDocumentDetails(doc.documentId)}
                            className="view-btn"
                            title="View Details"
                            disabled={loading}
                          >
                            👁️
                          </button>
                          <button 
                            onClick={() => deleteDocument(doc.documentId)}
                            className="delete-btn"
                            title="Delete Document"
                            disabled={loading}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="document-stats">
                          <div className="stat">
                            <span className="stat-label">Chunks:</span>
                            <span className="stat-value">{doc.chunkCount}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">Size:</span>
                            <span className="stat-value">{Math.round(doc.totalCharacters/1000)}K chars</span>
                          </div>
                        </div>
                        <div className="document-preview">
                          <p>{doc.firstChunkPreview}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {view === "details" && selectedDocument && (
          <div className="document-details">
            <div className="details-header">
              <h3>Document: {selectedDocument.documentId}</h3>
              <div className="document-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className={`status ${selectedDocument.isReady ? 'ready' : 'processing'}`}>
                      {selectedDocument.isReady ? 'Ready' : 'Processing'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Chunks:</span>
                    <span className="value">{selectedDocument.chunkCount}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Total Size:</span>
                    <span className="value">{Math.round(selectedDocument.totalCharacters/1000)}K chars</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Avg Chunk Size:</span>
                    <span className="value">{selectedDocument.averageChunkSize} chars</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chunks-section">
              <h4>Document Chunks ({selectedDocument.chunks?.length || 0})</h4>
              <div className="chunks-list">
                {selectedDocument.chunks?.map((chunk, index) => (
                  <div key={index} className="chunk-card">
                    <div className="chunk-header">
                      <span className="chunk-number">Chunk {chunk.index}</span>
                      <span className="chunk-size">{chunk.characterCount} chars</span>
                    </div>
                    <div className="chunk-content">
                      <p>{chunk.preview}</p>
                      {chunk.preview.endsWith('...') && (
                        <button 
                          onClick={() => {
                            const updatedChunks = [...selectedDocument.chunks];
                            updatedChunks[index] = {
                              ...chunk,
                              preview: chunk.preview.endsWith('...') ? chunk.fullText : chunk.fullText.substring(0, 200) + '...'
                            };
                            setSelectedDocument({
                              ...selectedDocument,
                              chunks: updatedChunks
                            });
                          }}
                          className="expand-btn"
                        >
                          {chunk.preview.endsWith('...') ? 'Show More' : 'Show Less'}
                        </button>
                      )}
                    </div>
                  </div>
                )) || <p>No chunks available</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}