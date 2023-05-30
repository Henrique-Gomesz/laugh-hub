import { ref, getDownloadURL, listAll, list } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { AudioDTO } from "../DTO/audio-dto";
export default class AudioModel {
  listAll = async (): Promise<AudioDTO[]> => {
    const buttonList: AudioDTO[] = [];
    const audioFolder = ref(storage, "audios");
    const imageFolder = ref(storage, "images");

    const audioList = await listAll(audioFolder);
    const imageList = await listAll(imageFolder);
    for (let i = 0; i < audioList.items.length; i++) {
      const itemName = audioList.items[i].name.split(".")[0];
      const matchingImage = imageList.items.find(
        (image) => image.name.split(".")[0] === itemName
      );
      const audioUrl = await getDownloadURL(audioList.items[i]);
      const imageUrl = matchingImage
        ? await getDownloadURL(matchingImage)
        : "https://pbs.twimg.com/media/E54Tg1eWUAMBVvx?format=png&name=360x360";
      const newButton: AudioDTO = {
        name: itemName,
        audioUrl: audioUrl,
        imageUrl: imageUrl,
      };
      buttonList.push(newButton);
    }
    return buttonList;
  };
}
