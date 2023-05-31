import {
  ref,
  getDownloadURL,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import { AudioDTO } from "../DTO/audio-dto";
import { AudioSchema } from "../schemas/audio-schemas";
import { AudioModelError } from "../errors/audio/audio-model-error";

export default class AudioModel {
  listAllFromFirebase = async (): Promise<AudioDTO[]> => {
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
      buttonList.push({
        name: itemName,
        audioUrl: audioUrl,
        imageUrl: imageUrl,
      });
    }
    return buttonList;
  };

  updateDatabase = async () => {
    console.log("executando atualização");
    const fireBaseAudios = await this.listAllFromFirebase();
    const dataBaseAudios = await this.listAllFromDataBase();
    const newAudios = fireBaseAudios.filter(
      (item) =>
        dataBaseAudios.find((obj) => obj.name === item.name) === undefined
    );

    const removeAudios = dataBaseAudios.filter(
      (item) =>
        fireBaseAudios.find((element) => element.name === item.name) ===
        undefined
    );

    if (newAudios.length) await AudioSchema.insertMany(newAudios);

    if (removeAudios.length)
      for (let i = 0; i < removeAudios.length; i++)
        await AudioSchema.deleteOne({ name: removeAudios[i].name });
  };

  listAllFromDataBase = async () => {
    const databaseList = await AudioSchema.find();
    const list: AudioDTO[] = [];

    databaseList.forEach((item) => {
      return list.push({
        audioUrl: item.audioUrl,
        imageUrl: item.imageUrl,
        name: item.name,
      });
    });
    return list;
  };

  deleteOneAudio = async (audioName: string) => {
    const errors: AudioModelError = {
      audio: false,
      audioNotFoundDataBase: false,
      image: false,
    };
    const audioFolder = ref(storage, "audios");
    const imageFolder = ref(storage, "images");
    const audioList = await listAll(audioFolder);
    const imageList = await listAll(imageFolder);

    const audio = audioList.items.find(
      (item) => item.name.split(".")[0] === audioName
    );
    const image = imageList.items.find(
      (item) => item.name.split(".")[0] === audioName
    );

    if (audio && image) {
      await deleteObject(audio)
        .then(async () => {
          await deleteObject(image)
            .then(async () => {})
            .catch((reason) => {
              console.log(reason);
              errors.image = true;
            });
        })
        .catch((reason) => {
          console.log(reason);
          errors.audio = true;
        });
    }
    if (!errors.audio && !errors.image)
      await AudioSchema.deleteOne({
        name: audioName,
      })
        .then((DeleteResult) => {
          if (DeleteResult.deletedCount <= 0)
            errors.audioNotFoundDataBase = true;
        })
        .catch((reason) => {
          console.log(reason);
        });
    return errors;
  };
}
