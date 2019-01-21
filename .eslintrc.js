module.exports = {
    "extends": "airbnb-base",
    "rules":{
        "indent": [2, "tab"],
        "no-tabs": 0,
        "no-underscore-dangle": [2, { "allow": ["_id"] }]
    },
    "env": {
        "jasmine": true
    }
};