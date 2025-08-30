import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sequelize from "./Venue-Booking/src/config/db.js";
import venuesRouter from "./Venue-Booking/src/routes/venues.js";
import bookingsRouter from "./Venue-Booking/src/routes/bookings.js";
import errorHandler from "./Venue-Booking/src/middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// rate limit
const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

// routes
app.use("/api/venues", venuesRouter);
app.use("/api/bookings", bookingsRouter);

// error handler
app.use(errorHandler);

// db sync
sequelize.sync().then(() => console.log("✅ MySQL DB synced"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));