const express = require('express');
const app = express();
const port = 3005;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

// Use user routes
app.use('/users', userRoutes);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});