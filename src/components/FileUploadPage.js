import React, { useState, useEffect, useContext } from 'react';
import { addPhoto, getPhotos, APIURL } from '../requests';
import PhotoContext from '../context/Photo';

const imageMimeType = /image\/(png|jpg|jpeg|gif)/i;

export const FileUploadPage = () => {
  const { photo, setPhoto } = useContext(PhotoContext); 
  const [file, setFile] = useState("");
  const [name, setName] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  const getAllPhotos = async () => {
    const response = await getPhotos();
    setPhoto(response.data);
  };

  useEffect(() => {
    if (!initialized) {
      getAllPhotos();
      setInitialized(true);
    }
  });
 
  const render = photo && photo.length>0 && photo.map((p)=> {
    const splitPath = p['photoPath'].split("/")
    const path = splitPath[splitPath.length - 1]
    return ( 
      <li key={p['id']}>
        <h3> Photo: {path}</h3>
        <img src={`http://localhost:8000/${path}`} alt={p['name']} />
      </li>
    )
  });


  const handleFileNameInput = e => {
    setName(e.target.value);
  };

  function handleFileUploadInput(event) {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append("photo", file);
      await addPhoto(formData);
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <div>
    {render}
      <form encType="multipart/form-data" method="post" onSubmit={handleSubmit} >
        <input type="text" value={name} onChange={handleFileNameInput} />
        <input type="file" accept=".gif" name="photo" onChange={handleFileUploadInput} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default FileUploadPage
