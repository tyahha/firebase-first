import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import VideoPlayer from "./VideoPlayer";
import { Video } from "../model/Videl";

const fetchVideo = async () => {
  console.log("featch video start");
  const datas: Video[] = [];
  const collection = firebase
    .firestore()
    .collection("videos")
    .limit(50);

  const querySnapshot = await collection.get();

  querySnapshot.forEach(doc => {
    const data = doc.data();
    console.log("data", data);
    if ("downloadURL" in data) {
      datas.push(doc.data() as Video);
    }
  });

  console.log("fetch vide end", datas.length);

  return datas;
};

export const VideoFeed = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    fetchVideo().then(v => setVideos(v));
  }, []);

  return (
    <div>
      {videos.map(video => (
        <VideoPlayer key={video.name} video={video} />
      ))}
    </div>
  );
};
