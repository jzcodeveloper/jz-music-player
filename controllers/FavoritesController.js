//Updates the favorites array in the Model passed as argument to the function
exports.updateFavorites = async (req, res, Model) => {
  const _id = req.params.id;
  const info = await Model.findById(_id);
  const index = info.favorites.indexOf(req.user._id);
  if (index >= 0) {
    info.favorites.splice(index, 1);
  } else {
    info.favorites.push(req.user._id);
  }
  const updatedModel = await Model.findByIdAndUpdate(
    _id,
    { favorites: info.favorites, favoritesLength: info.favorites.length },
    { new: true }
  ).populate("albumArt");
  res.json(updatedModel);
};

////Sends user favorite albums/artists/songs metadata
exports.sendMetadata = async (req, res, Album, Artist, Song) => {
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
};
