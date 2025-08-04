// import React from 'react';
// import ImportDocument from './components/ImportDocument';
// import DocumentBrowser from './components/DocumentBrowser';
// import AskDocument from './components/AskDocument';
// import './main.css';

// function App() {
//   return (
//     <div className="app-wrapper">
//       <h1>Kernel Memory ChatBot</h1>
//       <ImportDocument />
//       <DocumentBrowser />
//       <AskDocument />
//     </div>
//   );
// }

// export default App;

import React, { useState} from 'react';
import ImportDocument from './components/ImportDocument';
import DocumentBrowser from './components/DocumentBrowser';
import AskDocument from './components/AskDocument';
import './main.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger refresh across all components
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-wrapper">
      <h1>KernelMemoryAPI Frontend</h1>
      <ImportDocument 
        refreshTrigger={refreshTrigger} 
        onDocumentChange={triggerRefresh} 
      />
      <DocumentBrowser 
        refreshTrigger={refreshTrigger} 
        onDocumentChange={triggerRefresh} 
      />
      <AskDocument 
        refreshTrigger={refreshTrigger} 
      />
    </div>
  );
}

export default App;