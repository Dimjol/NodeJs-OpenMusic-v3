/* eslint-disable no-undef */
require('dotenv').config();
const amqp = require('amqplib');
const SongsService = require('./SongsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const songsService = new SongsService();
  const mailSender = new MailSender();
  const listener = new Listener(songsService, mailSender);
  const queueName = 'export:playlist-songs';

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(queueName, listener.listen, { noAck: true });
  console.log('Server consumer openmusicapp berjalan.');
};

init();
