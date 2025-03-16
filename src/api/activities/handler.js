/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const ClientError = require('../../exceptions/ClientError');

class PlaylistSongActivitiesHandler {
  constructor(activitiesService, playlistsService) {
    this._activitiesService = activitiesService;
    this._playlistsService = playlistsService;

    this.getPlaylistSongActivities = this.getPlaylistSongActivities.bind(this);
  }

  async getPlaylistSongActivities(request, h) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const activities= await this._activitiesService.getActivities(playlistId);
    const response = h.response({
      status: 'success',
      data: {
        playlistId,
        activities
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongActivitiesHandler;
