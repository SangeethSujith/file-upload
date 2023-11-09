import '@picocss/pico'
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState<any>(null);
  const [description, setDescription] = useState<any>('');
  const [message, setMessage] = useState<any>(null);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    const formData:any = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('level_id', 1);
    formData.append('difficulty_level', 1);
    formData.append('task_id', 1);
 

    let student_id =5;
    let token = "ee47079c48a62b5e0cb26de53a1fb49b";
    fetch(`http://localhost:8000/api/task_attachments/${student_id}?token=${token}`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      setMessage(data);
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('Error uploading file');
    });
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;

