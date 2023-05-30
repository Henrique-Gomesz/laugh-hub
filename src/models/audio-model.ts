import {
  ref,
  getDownloadURL,
  listAll,
  list,
  StorageReference,
  ListResult,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import { AudioDTO } from "../DTO/audio-dto";

const buildObject = async (
  audio: StorageReference,
  audioName: string,
  image?: StorageReference
): Promise<AudioDTO> => {
  const newAudio: AudioDTO = {
    audioUrl: await getDownloadURL(audio),
    imageUrl: image
      ? await getDownloadURL(image)
      : "https://pbs.twimg.com/media/E54Tg1eWUAMBVvx?format=png&name=360x360",
    name: audioName,
  };
  return newAudio;
};

const buildList = (audioList: ListResult, imageList: ListResult) => {
  const buttonList: AudioDTO[] = [];
  audioList.items.forEach(async (item) => {
    const itemName = item.name.split(".")[0];
    const matchingImage = imageList.items.find(
      (image) => image.name.split(".")[0] === itemName
    );

    const newButton = await buildObject(item, itemName, matchingImage);
    console.log(newButton);
    buttonList.push(newButton);
  });
  return buttonList;
};

export default class AudioModel {
  listAll = async (): Promise<AudioDTO[]> => {
    const audioFolder = ref(storage, "audios");
    const imageFolder = ref(storage, "images");

    const audioList = await listAll(audioFolder);
    const imageList = await listAll(imageFolder);

    return buildList(audioList, imageList);
  };
}
