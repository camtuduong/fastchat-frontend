let audio: HTMLAudioElement | null = null;

export const messageNotificationSound = () => {
  audio = new Audio("/sounds/message.mp3");
  audio.volume = 0.5;

  audio?.play();
};
