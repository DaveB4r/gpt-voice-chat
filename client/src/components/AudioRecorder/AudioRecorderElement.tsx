import { FC } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

type AudioRecorderProps = {
  addAudioElement: (blob: Blob) => void;
};

const AudioRecorderElement: FC<AudioRecorderProps> = ({ addAudioElement }) => {
  const recorder = useAudioRecorder();
  return (
    <AudioRecorder
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: true,
      }}
      onNotAllowedOrFound={(err) => console.error(err)}
      downloadOnSavePress={false}
      downloadFileExtension="mp3"
      mediaRecorderOptions={{
        audioBitsPerSecond: 128000,
      }}
      showVisualizer={true}
      recorderControls={recorder}
    />
  );
};

export default AudioRecorderElement;
