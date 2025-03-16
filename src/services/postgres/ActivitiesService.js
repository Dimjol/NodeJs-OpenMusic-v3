/* eslint-disable linebreak-style */
const { Pool } = require('pg');

class ActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity({ playlistId, songId, userId, action }) {
    const query = {
      text: 'INSERT INTO playlist_song_activities (playlist_id, song_id, user_id, action, time) VALUES ($1, $2, $3, $4, NOW())',
      values: [playlistId, songId, userId, action],
    };

    await this._pool.query(query);
  }

  async getActivities(playlistId) {
    const query = {
      text: `
                SELECT users.username, songs.title, playlist_activities.action, playlist_activities.time 
                FROM playlist_song_activities
                JOIN users ON users.id = playlist_activities.user_id
                JOIN songs ON songs.id = playlist_activities.song_id
                WHERE playlist_activities.playlist_id = $1
                ORDER BY playlist_activities.time ASC
            `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = ActivitiesService;
