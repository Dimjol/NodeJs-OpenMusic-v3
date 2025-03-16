/* eslint-disable linebreak-style */
const AlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albumLikes',
  version: '1.0.0',
  register: async (server, { service, validator, albumService }) => {
    const albumLikesHandler = new AlbumLikesHandler(
      service, validator, albumService
    );

    server.route(routes(albumLikesHandler));
  },
};