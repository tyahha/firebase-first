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
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          if (video) {
            fileUpload(video);
          }
        }}
      >
        Upload Video
      </button>
    </form>
  );
};

const fileUpload = async (video: File) => {
  try {
    const curentUser = firebase.auth().currentUser;
    if (curentUser) {
      const userUid = curentUser.uid;
      const filePath = `videos/${userUid}/${video.name}`;
      const videoStrageRef = firebase.storage().ref(filePath);
      const fileSnapshot = await videoStrageRef.put(video);

      console.log(fileSnapshot);
    }
  } catch (error) {
    console.log(error);
    return;
  }
}