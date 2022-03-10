import React, { useState, useEffect } from 'react';
import { Moralis } from 'moralis';

export default function Accounts() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    const value = e.target.files[0];
    setPreview(URL.createObjectURL(value));
    setFile(value);
  };

  const handleSubmit = async () => {
    const data = new Moralis.File(file.name, file);
    await data.saveIPFS();
    console.log(data.ipfs());
  };

  return (
    <>
      <div>Accounts</div>
      <img src={preview} />
      <input type='file' onChange={handleChange} />
      <button onClick={handleSubmit}>send</button>
    </>
  );
}
