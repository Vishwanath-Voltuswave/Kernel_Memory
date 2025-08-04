#!/bin/bash

# Create DocumentBrowser component
cat > src/components/DocumentBrowser.jsx << 'COMPONENT_EOF'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function DocumentBrowser() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

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

  return (
    <section className="document-browser-section">
      <div className="browser-header">
        <h2>Document Browser</h2>
        <button onClick={loadDocuments} disabled={loading} className="refresh-btn">
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="documents-list">
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
              <p>Found <strong>{documents.length}</strong> document(s)</p>
            </div>
            <div className="documents-grid">
              {documents.map((doc) => (
                <div key={doc.documentId} className="document-card">
                  <div className="card-header">
                    <h3>{doc.documentId}</h3>
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
      </div>
    </section>
  );
}
COMPONENT_EOF

# Create AskDocument component
cat > src/components/AskDocument.jsx << 'COMPONENT_EOF'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function AskDocument() {
  const [documentId, setDocumentId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState("specific");
  const [loading, setLoading] = useState(false);
  const [availableDocuments, setAvailableDocuments] = useState([]);

  useEffect(() => {
    if (searchMode === "specific") {
      loadAvailableDocuments();
    }
  }, [searchMode]);

  const loadAvailableDocuments = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/memory/documents/ids`);
      setAvailableDocuments(data.documentIds || []);
    } catch (err) {
      console.error("Failed to load document IDs:", err);
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
          <select
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Select a document --</option>
            {availableDocuments.map((docId) => (
              <option key={docId} value={docId}>{docId}</option>
            ))}
          </select>
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
              {searchMode === "specific" ? "Searching Document..." : "Searching All Documents..."}
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
                <h3>Result {searchMode === "global" && "(from all documents)"}</h3>
                <p>{answer.text}</p>
                <h4>Sources</h4>
                <ul className="sources-list">
                  {answer.relevantSources?.map((src, i) =>
                    src.partitions.map((p, j) => (
                      <li key={`${i}-${j}`}>
                        {src.sourceName} – Document: {src.documentId} ({Math.round(p.relevance * 100)}%)
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
COMPONENT_EOF

echo "All components created successfully!"
