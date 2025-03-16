/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const ClientError = require('../../exceptions/ClientError');

class AlbumLikesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumLikesHandler = this.postAlbumLikesHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
    this.deleteAlbumLikesHandler = this.deleteAlbumLikesHandler.bind(this);
  }

  async postAlbumLikesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumService.getAlbumById(albumId);
    await this._service.deleteAlbumLike(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Menyukai album',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikesHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteAlbumLike(id, credentialId); // Pastikan method ini ada di AlbumLikesService

    return h.response({
      status: 'success',
      message: 'Like dihapus',
    }).code(200);
  }

  async getAlbumLikesHandler(request, h) {
    const { id:albumId } = request.params;

    const { likes, headerValue } = await this._service.getAlbumLikesByAlbumId(albumId);
    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.header('X-Data-Source', headerValue);
    return response;
  }
}

module.exports = AlbumLikesHandler;