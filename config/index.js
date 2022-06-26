const config = {
    // dbConStr:'mongodb://localhost:27017/latestfolder'
//   dbConStr: 'mongodb+srv://sumaiah:Afiyah@cluster0.bggkkmm.mongodb.net/latestfolder'
    dbConStr: process.env.dbConStr
};


module.exports = config;