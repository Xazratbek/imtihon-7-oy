import "./index.css";
import { Composition } from "remotion";
import { EduShareVideo, getTotalDurationInFrames } from "./EduShareVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EduShareVideo"
        component={EduShareVideo}
        durationInFrames={getTotalDurationInFrames()}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
