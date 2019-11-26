import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-storage";

export const VideoUpload = () => {
  const [video, setVideo] = useState<File | null>(null);
  return (
    <form onSubmit={() => alert("todo on submit")}>
      <h2>Video Upload</h2>
      <input
        type="file"
        accept="video/*"
        onChange={e => setVideo(e.target.files && e.target.files[0])}
      />
      <button type="submit">Upload Video</button>
    </form>
  );
};
