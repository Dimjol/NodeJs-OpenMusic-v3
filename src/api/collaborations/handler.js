/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this.collaborationsService = collaborationsService;
    this.playlistsService = playlistsService;
    this.usersService = usersService;
    this.validator = validator;

    this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this);
    this.deleteCollaborationsHandler = this.deleteCollaborationsHandler.bind(this);
  }

  async postCollaborationsHandler(request, h) {
    this.validator.validateCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    await this.usersService.getUserById(userId);
    await this.playlistsService.verifyPlaylistOwner(playlistId, request.auth.credentials.id);
    const collaborationId = await this.collaborationsService.addCollaboration(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: { collaborationId },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationsHandler(request, h) {
    this.validator.validateCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;

    await this.playlistsService.verifyPlaylistOwner(playlistId, request.auth.credentials.id);
    await this.collaborationsService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    };
  }
}

module.exports = CollaborationsHandler;