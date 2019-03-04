//Sends albums/artists/songs metadata with limit
exports.sendTopMetadata = async (req, res, Album, Artist, Song) => {
  const limit = Number(req.query.limit);

  const albumsInfo = await Album.find({})
    .sort({ favoritesLength: -1 })
    .limit(limit)
    .populate("albumArt");

  const artistsInfo = await Artist.find({})
    .sort({ favoritesLength: -1 })
    .limit(limit)
    .populate("albumArt");

  const songsInfo = await Song.find({})
    .sort({ favoritesLength: -1 })
    .limit(limit)
    .populate("albumArt");

  res.json({
    albumsInfo,
    artistsInfo,
    songsInfo
  });
};

//Sends all albums/artists/songs metadata with from, limit and query
exports.sendMetadata = async (req, res, Model, findByProperty = "") => {
  const query = new RegExp(req.query.query, "i");
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);
  const fields = {};
  fields[findByProperty] = query;

  const info = {
    count: await Model.find(fields).countDocuments(),
    info: await Model.find(fields)
      .skip(from)
      .limit(limit)
      .populate("albumArt")
  };

  res.json(info);
};

//Sends metadata for a given album/artist/song
exports.sendAllMetadata = async (req, res, Model, findByProperty) => {
  const param = req.params.album || req.params.artist || req.params.title;
  const fields = {};
  fields[findByProperty] = param;
  const info = await Model.find(fields);
  res.json(info);
};

//Count documents for a given Model
exports.countDocuments = async (req, res, Model) => {
  const count = await Model.find({}).countDocuments();
  res.json(count);
};

//Deletes a song from the database using Artist + Song Title
exports.deleteSong = async (req, res, Song, Album, Artist) => {
  const _id = req.params.id;
  const deletedSong = await Song.findOneAndRemove({_id});

  //Fills the Album model
  const albums = await Song.aggregate([
    {
      $group: {
        _id: "$album",
        duration: { $sum: "$duration" },
        count: { $sum: 1 },
        albumArt: { $first: "$albumArt" },
        albumArtist: { $first: "$albumArtist" }
      }
    }
  ]);
  //Loop through the albums array
  for (const item of albums) {
    const albumFields = {
      album: item._id,
      duration: item.duration,
      count: item.count,
      albumArt: item.albumArt,
      albumArtist: item.albumArtist,
      favorites: [],
      favoritesLength: 0
    };

    const album = await Album.findOne({ album: albumFields.album });

    if (album) {
      //console.log("Album already stored in DB");
      await Album.findOneAndUpdate(
        { album: albumFields.album },
        { $set: albumFields }
      );
    } else {
      const newAlbum = new Album(albumFields);
      await newAlbum.save();
    }
  }

  //Fills the Artist model
  const artists = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        duration: { $sum: "$duration" },
        count: { $sum: 1 },
        albumArt: { $first: "$albumArt" },
        albumArtist: { $first: "$albumArtist" }
      }
    }
  ]);
  //Loop through the artists array
  for (const item of artists) {
    const artistFields = {
      artist: item._id,
      duration: item.duration,
      count: item.count,
      albumArt: item.albumArt,
      albumArtist: item.albumArtist,
      favorites: [],
      favoritesLength: 0
    };

    const artist = await Artist.findOne({ artist: artistFields.artist });

    if (artist) {
      //console.log("Artist already stored in DB");
      await Artist.findOneAndUpdate(
        { artist: artistFields.artist },
        { $set: artistFields }
      );
    } else {
      const newArtist = new Artist(artistFields);
      await newArtist.save();
    }
  }

  res.json(deletedSong);
};
