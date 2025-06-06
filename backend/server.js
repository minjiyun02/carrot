const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ======= Listing Model =======
const listingSchema = new mongoose.Schema({
  title: String,
  category: String,
  brand: String,
  model: String,
  condition: String,
  saleType: String,
  color: String,
  age: String,
  sellerName: String,
  itemLocation: String,
  accountType: String,
  manufacturerSpec: Boolean,
  startPrice: String,
  bidIncrement: String,
  buyNowPrice: String,
  photos: [{
    data: Buffer,
    contentType: String
  }]
});

const Listing = mongoose.model('Listing', listingSchema);

// ======= User Model =======
const userSchema = new mongoose.Schema({
  accountType: String,
  firstName: String,
  lastName: String,
  username: String,
  businessName: String,
  email: String,
  password: String,
  country: String,
  state: String,
  city: String,
  zipCode: String
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

// ======= File Upload =======
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ======= Routes =======

// Get user by ID - navbar
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send({ name: user.firstName || user.username });
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Submit new listing
app.post('/api/listings', upload.array('photos'), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }));

    const listing = new Listing({
      ...req.body,
      photos: images
    });

    await listing.save();
    res.status(201).send({ message: 'Listing saved' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



// Sign in
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Invalid password' });

    res.send({
      userId: user._id,
      firstName: user.firstName,
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});


app.get('/api/listings/category/:category', async (req, res) => {
  try {
    const listings = await Listing.find({
      category: decodeURIComponent(req.params.category)
    });
    res.send(listings);
  } catch (err) {
    res.status(500).send({ error: 'Failed to load listings.' });
  }
});

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.send(listings);
  } catch (err) {
    res.status(500).send({ error: 'Failed to load listings.' });
  }
});


// listing photos
app.get('/api/listings/:id/photo/:index', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const index = parseInt(req.params.index, 10);

    if (!listing || !listing.photos || !listing.photos[index]) {
      return res.status(404).send('Image not found');
    }

    const photo = listing.photos[index];
    res.set('Content-Type', photo.contentType);
    res.send(photo.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send({ message: 'Listing not found' });
    res.send(listing);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});

const watchlistSchema = new mongoose.Schema({
  userId: String,
  listingId: String,
  addedAt: { type: Date, default: Date.now }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

app.post('/api/watchlist', async (req, res) => {
  const { userId, listingId } = req.body;

  if (!userId || !listingId) {
    return res.status(400).send({ message: "userId and listingId are required" });
  }

  try {
    const exists = await Watchlist.findOne({ userId, listingId });
    if (exists) {
      return res.status(200).send({ message: "Already in watchlist" });
    }

    const newItem = new Watchlist({ userId, listingId });
    await newItem.save();
    res.status(201).send({ message: "Added to watchlist" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/api/watchlist/:userId/:listingId', async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const exists = await Watchlist.findOne({ userId, listingId });
    res.send({ exists: !!exists });
  } catch (err) {
    res.status(500).send({ error: 'Failed to check watchlist.' });
  }
});

app.delete('/api/watchlist/:userId/:listingId', async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    await Watchlist.deleteOne({ userId, listingId });
    res.send({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to remove item' });
  }
});

app.get('/api/watchlist', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).send({ error: 'Missing userId' });

  try {
    const entries = await Watchlist.find({ userId });
    const listings = await Promise.all(entries.map(async (entry) => {
      const listing = await Listing.findById(entry.listingId);
      return {
        listingId: entry.listingId,
        title: listing?.title || '',
        price: listing?.startPrice || '',
        location: listing?.itemLocation || '',
        saleType: listing?.saleType || '',
      };
    }));

    res.send(listings);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch watchlist' });
  }
});

const bidSchema = new mongoose.Schema({
  listingId: String,
  userId: String,
  title: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Bid = mongoose.model('Bid', bidSchema);

app.post('/api/bids', async (req, res) => {
  const { listingId, userId, title, amount, status } = req.body;

  if (!listingId || !userId || !amount) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const bid = new Bid({ listingId, userId, title, amount, status });
    await bid.save();
    res.status(201).send({ message: 'Bid placed successfully', bid });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/api/bids/user/:userId', async (req, res) => {
  try {
    const bids = await Bid.find({ userId: req.params.userId });
    res.send(bids);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch bids' });
  }
});

app.delete('/api/bids/:bidId', async (req, res) => {
  try {
    await Bid.findByIdAndDelete(req.params.bidId);
    res.send({ message: 'Bid cancelled successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to cancel bid' });
  }
});

app.post('/api/seller', async (req, res) => {
  try {
    const sellerInfo = req.body;

    // TODO: Save this to MongoDB or validate it
    console.log('Received seller info:', sellerInfo);

    res.status(200).send({ message: 'Seller info received' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save seller info' });
  }
});


// Start server
app.listen(5000, () => console.log('Server started on port 5000'));
