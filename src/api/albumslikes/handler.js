/* eslint-disable linebreak-style */
const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service, albumService) {
    this._service = service;
    this._albumService = albumService;

    this.postAlbumLikesHandler = this.postAlbumLikesHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikesHandler(request, h) {
    try {
      const { albumId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      // Debugging
      console.log('Album ID dari request:', albumId);
      console.log('User ID:', credentialId);

      // Pastikan album ada
      await this._albumService.verifyAlbum(albumId);

      await this._service.addAlbumLike(credentialId, albumId);

      return h.response({
        status: 'success',
        message: 'Like berhasil.',
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }

  async getAlbumLikesHandler(request, h) {
    try {
      const { albumId } = request.params;

      const data = await this._service.getLikesCount(albumId);
      const likes = data.count;

      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.header('X-Data-Source', data.source);
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AlbumLikesHandler;