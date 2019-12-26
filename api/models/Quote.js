const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const quoteSchema = new mongoose.Schema({
  Created: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  slug: String,
  user: {
    type: String,
    required: 'Must have user UID!',
  },
  clientName: {
    type: String,
    trim: true,
    maxlength: 40,
    required: 'Must have a name!',
  },
  description: {
    type: String,
    trim: true,
    maxlength: 400,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    lat: {
      type: Number,
      default: 0,
    },
    lng: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    url: {
      type: String
    }
  },
  phone: String,
  email: String,
  items: [{
      name: String,
      description: String,
      price: String
  }]
});

quoteSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  // make sure slugs are unique
  this.slug = slug(Math.random().toString(36).substr(2, 9));
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const jobsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (jobsWithSlug.length) {
    this.slug = `${this.slug}-${jobsWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model('Quote', quoteSchema);
