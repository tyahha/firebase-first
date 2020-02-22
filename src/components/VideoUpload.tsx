import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import firebase from "firebase/app";
import "firebase/firebase-storage";
import "firebase/firestore";
import _ from "lodash";

export const VideoUpload = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <LoadingOverlay active={loading} spinner text="Loading your content...">
      <form onSubmit={() => alert("todo on submit")}>
        <h2>Video Upload</h2>
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideo(e.target.files && e.target.files[0])}
        />
        <button
          type="submit"
          onClick={async e => {
            e.preventDefault();
            if (video) {
              setLoading(true);
              const isSuccess = await fileUpload(video);
              if (!isSuccess) {
                alert("ファイルのアップロードに失敗しました");
              }
              setVideo(null);
              setLoading(false);
            }
          }}
        >
          Upload Video
        </button>
      </form>
    </LoadingOverlay>
  );
};

const fileUpload = async (video: File): Promise<boolean> => {
  try {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const userUid = currentUser.uid;
      const filePath = `videos/${userUid}/${video.name}`;
      const videoStrageRef = firebase.storage().ref(filePath);
      const idToken = await currentUser.getIdToken(true);
      const metadataForStorage = {
        customMetadata: {
          idToken
        }
      };
      const fileSnapshot = await videoStrageRef.put(video, metadataForStorage);

      // mp4以外の動画は、Cloud Functions上で、トランスコードした後にメタデータをFirestoreに保存する
      if (video.type === "video/mp4") {
        const downloadURL = await videoStrageRef.getDownloadURL();
        let metadataForFireStorage = _.omitBy(
          fileSnapshot.metadata,
          _.isEmpty
        ) as firebase.storage.FullMetadata;
        metadataForFireStorage = Object.assign(metadataForFireStorage, {
          downloadURL
        });
        await saveVideoMetaData(userUid, metadataForFireStorage);
      }
      console.log(fileSnapshot);
      if (fileSnapshot.state === "success") {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const saveVideoMetaData = async (
  userUid: string,
  metaData: firebase.storage.FullMetadata
) => {
  const videoRef = firebase
    .firestore()
    .doc(`users/${userUid}`)
    .collection("videos")
    .doc();
  metaData = Object.assign(metaData, { uid: videoRef.id });

  await videoRef.set(metaData, { merge: true });
};
