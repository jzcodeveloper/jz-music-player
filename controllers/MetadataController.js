class MetadataController {
  //Sends albums/artists/songs metadata with limit
  async sendTopMetadata(req, res, Album, Artist, Song) {
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
  }

  //Sends all albums/artists/songs metadata with from, limit and query
  async sendMetadata(req, res, Model, findByProperty = "") {
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
  }

  //Sends metadata for a given album/artist/song
  async sendAllMetadata(req, res, Model, findByProperty) {
    const param = req.params.album || req.params.artist || req.params.title;
    const fields = {};
    fields[findByProperty] = param;
    const info = await Model.find(fields);
    res.json(info);
  }

  //Count documents for a given Model
  async countDocuments(req, res, Model) {
    const count = await Model.find({}).countDocuments();
    res.json(count);
  }
}

const metadataController = new MetadataController();

module.exports = metadataController;
