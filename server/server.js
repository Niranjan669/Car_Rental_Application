// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------- CONFIG ----------
dotenv.config();
const app = express();

// Path setup (for static frontend deployment)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- MIDDLEWARE ----------
app.use(express.json());

// CORS: allow requests from frontend (Vercel/Render or local)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// ---------- DB CONNECT ----------
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Please set MONGO_URI in .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ---------- SESSION SETUP ----------
const sessionStore = MongoStore.create({
  mongoUrl: MONGO_URI,
  collectionName: 'sessions',
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production', // HTTPS in prod
  },
}));

// ---------- MODELS ----------
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', UserSchema);

const CarSchema = new Schema({
  name: String,
  carNumber: String,
  pricePerDay: Number,
  image: String,
  description: String,
});
const Car = mongoose.model('Car', CarSchema);

const BookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  carId: { type: Schema.Types.ObjectId, ref: 'Car' },
  fromDate: Date,
  toDate: Date,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});
const Booking = mongoose.model('Booking', BookingSchema);

// ---------- HELPERS ----------
function daysBetweenInclusive(from, to) {
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
}

// // ---------- SEED INITIAL 10 CARS ----------
// async function seedCars() {
//   const count = await Car.countDocuments();
//   if (count === 0) {
//     const sample = [
//       { name: "Hyundai i20", carNumber: "KA01AB1234", pricePerDay: 1500, image: "/images/hyundai_i20.jpg", description: "Compact hatchback, AC, 5 seats" },
//       { name: "Honda City", carNumber: "KA02CD5678", pricePerDay: 2200, image: "/images/honda_city.jpg", description: "Comfort sedan, great for city rides" },
//       { name: "Maruti Swift", carNumber: "KA03EF9012", pricePerDay: 1400, image: "/images/maruti_swift.jpg", description: "Fuel efficient & easy to drive" },
//       { name: "Toyota Innova", carNumber: "KA04GH3456", pricePerDay: 4000, image: "/images/toyota_innova.jpg", description: "7 seater, ideal for family trips" },
//       { name: "Mahindra XUV", carNumber: "KA05IJ7890", pricePerDay: 3500, image: "/images/mahindra_xuv.jpg", description: "SUV with space & power" },
//       { name: "Skoda Rapid", carNumber: "KA06KL2345", pricePerDay: 2500, image: "/images/skoda_rapid.jpg", description: "Premium feel, comfortable ride" },
//       { name: "Kia Seltos", carNumber: "KA07MN6789", pricePerDay: 3800, image: "/images/kia_seltos.jpg", description: "Modern SUV, feature rich" },
//       { name: "Tata Nexon", carNumber: "KA08OP0123", pricePerDay: 2300, image: "/images/tata_nexon.jpg", description: "Compact SUV, good mileage" },
//       { name: "Renault Duster", carNumber: "KA09QR4567", pricePerDay: 2700, image: "/images/renault_duster.jpg", description: "Solid SUV for all roads" },
//       { name: "Ford EcoSport", carNumber: "KA10ST8901", pricePerDay: 2400, image: "/images/ford_ecosport.jpg", description: "Compact SUV, fun to drive" },
//     ];
//     await Car.insertMany(sample);
//     console.log("🚘 Seeded 10 sample cars");
//   }
// }
// seedCars().catch(console.error);

// ---------- ROUTES ----------
app.post('/api/register', async (req, res) => { /* logic unchanged */ });
app.post('/api/login', async (req, res) => { /* logic unchanged */ });
app.post('/api/logout', async (req, res) => { /* logic unchanged */ });
app.get('/api/me', async (req, res) => { /* logic unchanged */ });
app.get('/api/cars', async (req, res) => { /* logic unchanged */ });
app.post('/api/book', async (req, res) => { /* logic unchanged */ });
app.get('/api/bookings', async (req, res) => { /* logic unchanged */ });

// ---------- FRONTEND DEPLOY (Render/Vercel) ----------
if (process.env.NODE_ENV === 'production') {
  const clientPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚗 Server running on port ${PORT}`));
