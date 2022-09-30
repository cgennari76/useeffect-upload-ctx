import React, { useState } from 'react';
import FileUploadPage from './components/FileUploadPage';
import PhotoContext from './context/Photo';

function App() {
  const [photo, setPhoto] = useState(null);

  return (
    <PhotoContext.Provider value={{photo, setPhoto}}> 
      <div className="App">
        <div className="my-2">
          <h4>React upload multiple files</h4>
        </div>
        <FileUploadPage />
      </div>
    </PhotoContext.Provider>
  );
}

export default App;
