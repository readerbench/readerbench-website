'use strict';

angular.module('services')
.service('Data2', function () {
    return {
        id: '0',
        name: 'Thing',
        children: [{
            id: '1',
            name: 'Fast-Info',
            children: []
        }, {
            id: '2',
            name: 'Country',
            children: []
        }, {
            id: '3',
            name: 'Colorinfo',
            children: [{
                id: '3.1',
                name: 'Black_and_White',
                children: []
            }, {
                id: '3.2',
                name: 'Color',
                children: []
            }]
        }, {
            id: '4',
            name: 'Certification',
            children: [{
                id: '4.1',
                name: 'USA_Passed',
                children: []
            }]
        }, {
            id: '5',
            name: 'SocialActive',
            children: []
        }, {
            id: '6',
            name: 'Award',
            children: [{
                id: '6.1',
                name: 'BAFTA_Film_Award',
                children: []
            }, {
                id: '6.2',
                name: 'Golden_Globe_Award',
                children: []
            }, {
                id: '6.3',
                name: 'Miscelaneous_Award',
                children: []
            }, {
                id: '6.4',
                name: 'Oscar_Award',
                children: []
            }, {
                id: '6.5',
                name: 'Primetime_Emmy_Award',
                children: []
            }]
        }, {
            id: '7',
            name: 'Costume_Designer',
            children: []
        }, {
            id: '8',
            name: 'Editor',
            children: []
        }, {
            id: '9',
            name: 'Special-Info',
            children: []
        }, {
            id: '10',
            name: 'Sound_Mix',
            children: []
        }, {
            id: '11',
            name: 'Writter',
            children: []
        }, {
            id: '12',
            name: 'Production_Company',
            children: []
        }, {
            id: '13',
            name: 'VideoOnDemand_Consumable',
            children: []
        }, {
            id: '14',
            name: 'Film',
            children: []
        }, {
            id: '15',
            name: 'Genre',
            children: [{
                id: '15.1',
                name: 'Love',
                children: [{
                    id: '15.1.1',
                    name: 'Romance',
                    children: []
                }]
            }, {
                id: '15.2',
                name: 'Experience',
                children: []
            }, {
                id: '15.3',
                name: 'Action',
                children: [{
                    id: '15.3.1',
                    name: 'Adventure',
                    children: []
                }, {
                    id: '15.3.2',
                    name: 'Old',
                    children: [{
                        id: '15.3.2.1',
                        name: 'Western',
                        children: []
                    }]
                }]
            }, {
                id: '15.4',
                name: 'Heavy_Sensible',
                children: [{
                    id: '15.4.1',
                    name: 'DramaFilm-Noir',
                    children: []
                }]
            }, {
                id: '15.5',
                name: 'Kids',
                children: [{
                    id: '15.5.1',
                    name: 'Family',
                    children: []
                }]
            }, {
                id: '15.6',
                name: 'SciFi_and_Fantasy',
                children: []
            }, {
                id: '15.7',
                name: 'Entertainment',
                children: [{
                    id: '15.7.1',
                    name: 'Entertainment_Information',
                    children: [{
                        id: '15.7.1.1',
                        name: 'Sport',
                        children: []
                    }, {
                        id: '15.7.2',
                        name: 'Intelectual_Entertainment',
                        children: []
                    }, {
                        id: '15.7.3',
                        name: 'Musical_Entertainment',
                        children: [{
                            id: '15.7.3.1',
                            name: 'Music',
                            children: []
                        }, {
                            id: '15.7.3.2',
                            name: 'Musical',
                            children: []
                        }]
                    }, {
                        id: '15.7.4',
                        name: 'TV_Entertainment',
                        children: [{
                            id: '15.7.4.1',
                            name: 'Game-Show',
                            children: []
                        }, {
                            id: '15.7.4.2',
                            name: 'Reality-TV',
                            children: []
                        }]
                    }]
                }]
            }, {
                id: '15.8',
                name: 'Historical_Information',
                children: [{
                    id: '15.8.1',
                    name: 'History',
                    children: []
                }]
            }, {
                id: '15.9',
                name: 'Porn',
                children: [{
                    id: '15.9.1',
                    name: 'Adult',
                    children: []
                }]
            }, {
                id: '15.10',
                name: 'Documentarial_Information',
                children: [{
                    id: '15.10.1',
                    name: 'BiographyDocumentary',
                    children: []
                }]
            },  {
                id: '15.11',
                name: 'Fun',
                children: [{
                    id: '15.11.1',
                    name: 'Animation',
                    children: []
                }, {
                    id: '15.11.2',
                    name: 'Comedy',
                    children: []
                }]
            }]
        }, {
            id: '16',
            name: 'Language',
            children: []
        }, {
            id: '17',
            name: 'Person',
            children: []
        }, {
            id: '18',
            name: 'Place',
            children: []
        }]
    };
});
