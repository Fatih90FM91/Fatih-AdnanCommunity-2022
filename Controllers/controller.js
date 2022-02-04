
const getHome = (req, res) => {
    res.render('homePage', {pageTitle: 'Home'});
}

module.exports = {
    getHome
}