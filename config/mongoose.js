const mongoose = require('mongoose');

const db = 'mongodb://localhost/ImpactWeekProject';

mongoose.connect(db)
    .then(() => console.log('Connected to DB ...'))
    .catch(err => console.log(err))

// mongoose.connect(db, (err, result) => {
//     if(err) console.log(err);
//     if(result) console.log('Connected to DB ...')
// });