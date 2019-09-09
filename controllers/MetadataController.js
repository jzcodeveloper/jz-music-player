const client = require("../config/redis");

const models = {
  Song: require("../models/Song"),
  Album: require("../models/Album"),
  Artist: require("../models/Artist"),
  Playlist: require("../models/Playlist")
};

//Sends albums/artists/songs metadata with limit
exports.sendTopMetadata = async (req, res) => {
  try {
    const limit = Number(req.query.limit);

    //Check whether there is a key already in the cache
    const result = await client.getAsync(`music/${limit}`);
    if (result) {
      res.json(JSON.parse(result));
    } else {
      const albumsInfo = await models["Album"]
        .find({})
        .sort({ timesPlayed: -1 })
        .limit(limit)
        .populate("albumArt");

      const artistsInfo = await models["Artist"]
        .find({})
        .sort({ timesPlayed: -1 })
        .limit(limit)
        .populate("albumArt");

      const songsInfo = await models["Song"]
        .find({})
        .sort({ timesPlayed: -1 })
        .limit(limit)
        .populate("albumArt");

      const info = { albumsInfo, artistsInfo, songsInfo };

      //Caching response
      await client.setexAsync(`music/${limit}`, 3600, JSON.stringify(info));
      res.json(info);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Sends all albums/artists/songs metadata with from, limit and query
exports.sendMetadata = async (req, res, Model) => {
  try {
    const query = new RegExp(req.query.query, "i");
    const from = Number(req.query.from);
    const limit = Number(req.query.limit);

    //Check whether there is a key already in the cache
    const key = `more/${Model}/${query}/${from}/${limit}`;
    const result = await client.getAsync(key);
    if (result) {
      res.json(JSON.parse(result));
    } else {
      const fields = {};

      if (Model === "Album") fields["album"] = query;
      if (Model === "Artist") fields["artist"] = query;
      if (Model === "Song") fields["title"] = query;

      const info = {
        count: await models[Model].find(fields).countDocuments(),
        info: await models[Model].find(fields)
          .skip(from)
          .limit(limit)
          .populate("albumArt")
      };

      //Caching response
      await client.setexAsync(key, 3600, JSON.stringify(info));
      res.json(info);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Sends metadata for a given album/artist/song/playlist
exports.sendAllMetadata = async (req, res, Model) => {
  try {
    const { album, artist, title, name } = req.params;
    const param = album || artist || title || name;

    //Check whether there is a key already in the cache
    const result = await client.getAsync(`player/${param}`);
    if (result) {
      res.json(JSON.parse(result));
    } else {
      const fields = {};

      if (title) {
        const [artist, title] = param.split(" - ");
        fields["artist"] = artist;
        fields["title"] = title;

        const info = await models[Model].find(fields).populate("albumArt");

        //Caching response
        await client.setexAsync(`player/${param}`, 3600, JSON.stringify(info));
        res.json(info);
      } else {
        if (album) fields["album"] = album;
        if (artist) fields["artist"] = artist;
        if (name) fields["name"] = name;

        const { songs } = await models[Model].findOne(fields).populate({
          path: "songs",
          populate: { path: "albumArt" }
        });

        //Caching response
        await client.setexAsync(`player/${param}`, 3600, JSON.stringify(songs));
        res.json(songs);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Count documents for the any Model
exports.countDocuments = async (req, res, Model) => {
  try {
    //Check whether there is a key already in the cache
    const result = await client.getAsync(`count/${Model}`);
    if (result) {
      res.json(JSON.parse(result));
    } else {
      const count = await models[Model].find({}).countDocuments();
      //Caching response
      await client.setexAsync(`count/${Model}`, 3600, JSON.stringify(count));
      res.json(count);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Updates metadata for a given album, artist or song (timesPlayed property)
exports.updateMetadata = async (req, res, Model) => {
  const { album, artist, title } = req.params;
  const param = album || artist || title;
  const fields = {};

  if (title) {
    const [artist, title] = param.split(" - ");
    fields["artist"] = artist;
    fields["title"] = title;
  }
  if (album) fields["album"] = param;
  if (artist) fields["artist"] = param;

  const { _id, timesPlayed } = await models[Model].findOne(fields);
  await models[Model].findByIdAndUpdate(_id, { timesPlayed: timesPlayed + 1 });

  res.json("Success");
};

//Deletes a song from the database using Artist + Song Title
/*exports.deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndRemove(id);

    //Updates duration, count and the songs array of the Album model
    const album = await Album.find({ album: deletedSong.album });
    if (album) {
      const updatedFields = {
        duration: album.duration - deletedSong.duration,
        count: album.count - 1,
        songs: album.songs.filter(song => song !== deletedSong._id)
      };
      await Album.findOneAndUpdate(
        { album: deletedSong.album },
        { $set: updatedFields }
      );
    }

    //Updates duration, count and the songs array of the Artist model
    const artist = await Artist.findOne({ artist: deletedSong.artist });
    if (artist) {
      const updatedFields = {
        duration: artist.duration - deletedSong.duration,
        count: artist.count - 1,
        songs: artist.songs.filter(song => song !== deletedSong._id)
      };
      await Artist.findOneAndUpdate(
        { artist: deletedSong.artist },
        { $set: updatedFields }
      );
    }

    res.json(deletedSong);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
*/
