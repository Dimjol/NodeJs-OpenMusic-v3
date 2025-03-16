/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationsHandler, // Pastikan handler ditetapkan
    options: {
      auth: 'openmusicapp_jwt', // Sesuaikan dengan strategi auth yang benar
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationsHandler,
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
