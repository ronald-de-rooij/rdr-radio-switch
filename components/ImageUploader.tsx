import { useState } from 'react';
import { auth, ref, getDownloadURL, uploadBytesResumable, storage } from '../lib/firebase';

import Loader from './Loader';

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  function uploadFile(e) {
    const file = e.target.files[0];
    const extension = file.type.split('/')[1];

    const storageRef = ref(storage, `streams/${}`);
    setUploading(true);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL)
        });
      }
    );
  }

  return (
    <>
      <div className="box">
        <Loader show={uploading} />
        {uploading && <h3>{progress}%</h3>}

        {!uploading && (
          <>
            <label className='btn'>
              Upload Img
              <input type="file" onChange={uploadFile} />
            </label>
          </>
        )}

        {downloadURL && <code className='upload-snippet'>{`![alt](${downloadURL}`}</code>}
      </div>
    </>
  )



}