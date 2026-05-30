const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/hackathons', require('./routes/hackathonRoutes'));
app.use('/api/timeline', require('./routes/timelineRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio CMS API is running!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
