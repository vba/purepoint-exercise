const axios = require ('axios');
const sails = require ('sails');
const Q = require('q');

const findRecipe = (query, page) => {
    return axios
        .get(`http://www.recipepuppy.com/api/?q=${query}&p=${page}`)
        .catch(e => console.error('Something went wrong', e))
        .then(x => x.data.results);
};

module.exports = {
    find: (req, res) => {
        const query = req.query.q;
        return Q.all([findRecipe(query, 1), findRecipe(query, 2)])
            .spread((left, right) => {
                const result = (left || []).concat(right || []);
                return res.json(result);
            });
    }
};

