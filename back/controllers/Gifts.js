const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const giftPath = process.env.GIFTS_STORE_PATH || './gifts.json';
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

const mailer = nodemailer.createTransport(mailgunTransport({
  auth: {
    api_key: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  debug: true,
}));

try {
  fs.statSync(giftPath);
} catch (err) {
  fs.writeFileSync(giftPath, '[]', 'utf8');
}

const saveGifts = gifts => writeFile(giftPath, JSON.stringify(gifts), 'utf8')
const readGifts = async () => JSON.parse(await readFile(giftPath, 'utf8'))
'use strict';

const Gifts = {
  create: async req => {
    const gifts = await readGifts();
    const lastGift = gifts[gifts.length - 1];
    gifts.push({
      name: String(req.body.name),
      key: lastGift ? lastGift.key + 1 : 0
    });
    await saveGifts(gifts);
    return gifts;
  },
  read: readGifts,
  delete: async req => {
    gifts = (await readGifts())
      .filter(gift => gift.key !== req.body.key);
    await saveGifts(gifts);
    return gifts;
  },
  notify: async () => mailer.sendMail({
    from: `Le Père Noel 🎅 <santa@${process.env.MAILGUN_DOMAIN}>`, // sender address
    subject: "🎄Votre liste de souhaits 🎁", // Subject line
    to: 'florian@wildcodeschool.fr',
    text: (await readGifts())
        .map(gift => gift.name)
        .join('\n'),
  })
}

module.exports = Gifts;
