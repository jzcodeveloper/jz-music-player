const User = require("../models/User");

//Updates the favorites array in the Model passed as argument to the function
exports.updateFavorites = async (req, res, model) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const key = `favorite${model}`;
    const user = await User.findById(_id);
    const index = user[key].indexOf(id);

    if (index >= 0) {
      user[key].splice(index, 1);
    } else {
      user[key].push(id);
    }

    const updatedModel = await User.findByIdAndUpdate(
      _id,
      { [key]: user[key] },
      { new: true }
    );

    const { favoriteAlbums, favoriteArtists, favoriteSongs } = updatedModel;

    res.json({ id, model, favoriteAlbums, favoriteArtists, favoriteSongs });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

////Sends user favorite albums/artists/songs metadata
exports.sendMetadata = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "favoriteAlbums",
        populate: { path: "albumArt" }
      })
      .populate({
        path: "favoriteArtists",
        populate: { path: "albumArt" }
      })
      .populate({
        path: "favoriteSongs",
        populate: { path: "albumArt" }
      });

    const { favoriteAlbums, favoriteArtists, favoriteSongs } = user;

    res.json({ favoriteAlbums, favoriteArtists, favoriteSongs });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Sends user favorite albums/artists/songs metadata
/* exports.sendMetadata2 = async (req, res) => {
  try {
    const favoriteAlbums = await Album.find({
      favorites: { $in: [req.user._id] }
    }).populate("albumArt");
    const favoriteArtists = await Artist.find({
      favorites: { $in: [req.user._id] }
    }).populate("albumArt");
    const favoriteSongs = await Song.find({
      favorites: { $in: [req.user._id] }
    }).populate("albumArt");
    res.json({
      favoriteAlbums,
      favoriteArtists,
      favoriteSongs
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}; */
