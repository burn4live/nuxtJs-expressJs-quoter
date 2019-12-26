const express = require('express')
const app = express()
const Quote = require('./models/Quote');
const Profile = require('./models/Profile');

function formatPhoneNumber(phoneNumberString) {
    const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

// hardcoded user
// get all user quotes
app.get('/fetch', async (req, res) => {
    const quotesPromise = Quote.find({ user: '1234' }).sort({ Created: -1 });
    const [quotes] = await Promise.all([quotesPromise]); 
    res.json(quotes);
})

// create quote
app.post('/quote/create', async (req, res) => {
    if (req.body.phone !== '' && req.body.phone !== null && req.body.phone !== undefined) {
        req.body.phone = formatPhoneNumber(req.body.phone);
      }
    const quote = await (new Quote(req.body)).save();
    res.json(quote);
})

// edit quote
app.post('/edit/quote/:id', async (req, res, next) => {
    if (req.body.phone !== '' && req.body.phone !== null && req.body.phone !== undefined) {
        req.body.phone = formatPhoneNumber(req.body.phone);
      }
    const quote = await Quote.findOneAndUpdate({ _id: req.params.id, user: '1234' }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true,
      }).exec();
    if (!quote) return next
    res.json(quote);
})

// get 1 quote
app.get('/quote/:id', async (req, res, next) => {
    const quote = await Quote.findOne({_id: req.params.id});
    if (!quote) return next;
    res.json(quote);
})

// create & get profile 
app.get('/profile', async (req, res) => {
    const profile = await Profile.findOne({user: '1234'});
    if (!profile) {
        const profile = await (new Profile({user: '1234'})).save();
        return res.json(profile);
    }
    res.json(profile);
})

app.post('/edit/profile', async (req, res, next) => {
    if (req.body.phone !== '' && req.body.phone !== null && req.body.phone !== undefined) {
        req.body.phone = formatPhoneNumber(req.body.phone);
      }
    const profile = await Profile.findOneAndUpdate({ user: '1234' }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true,
      }).exec();
    if (!profile) return next
    res.json(profile);
})

module.exports = {
   path: '/api',
   handler: app
}
