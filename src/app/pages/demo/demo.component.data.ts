export var DefaultInputData = {
    text: 'RAGE aims to develop, transform and enrich advanced technologies from the leisure games industry into self-contained gaming assets (i.e. solutions showing economic value potential) that support game studios at developing applied games easier, faster and more cost-effectively. These assets will be available along with a large volume of high-quality knowledge resources through a self-sustainable Ecosystem, which is a social space that connects research, gaming industries, intermediaries, education providers, policy makers and end-users. RAGE – Realising an Applied Gaming Eco-system,  is a 48-months Technology and Know-How driven Research and Innovation project co-funded by EU Framework Programme for Research and Innovation, Horizon 2020.' +
        String.fromCharCode(13) +
        'The EU based industry for non-leisure games – Applied Games – is an emerging business with multiple uses in industry, education, health and the public administration sectors. As such, it is still fragmented and needs critical mass to compete globally. Nevertheless its growth potential is widely recognised and even suggested to exceed the growth potential of the leisure games market.' +
        String.fromCharCode(13) +
        'The gaming technology assets gathered along the project lifecycle will be tested and evaluated by gaming companies integrated in the RAGE consortium. These companies will be creating games that will be empirically validated in real world pilots in different application scenarios representing different markets and target groups for the Applied Games industry.',
    semanticSimilarityThreshold: 0.3,
    languages: [
        {
            id: '1',
            name: 'English',
            value: 'English'
        },
        {
            id: '2',
            name: 'French',
            value: 'French'
        },
        {
            id: '3',
            name: 'Romanian',
            value: 'Romanian'
        },
        {
            id: '4',
            name: 'Dutch',
            value: 'Dutch'
        }
    ],
    defaultLanguage: function () {
        return DefaultInputData.languages[0];
    },
    posTaggingOptions: [
        true,
        false
    ],
    defaultPosTaggingOption: function () {
        return DefaultInputData.posTaggingOptions[0];
    },
    dialogismOptions: [
        true,
        false
    ],
    defaultDialogismOption: function () {
        return DefaultInputData.dialogismOptions[1];
    },
    defaultBigrams: false,
    metricOptions: {
        lsa: {
            EN: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'TASA & LAK',
                value: 'TASA_LAK'
            },
            {
                id: '3',
                name: 'SciRef',
                value: 'SciRef'
            },
            {
                id: '4',
                name: 'None',
                value: ''
            }
            ],
            FR: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'Text Enfants',
                value: 'Text_Enfants'
            },
            {
                id: '3',
                name: 'None',
                value: ''
            }
            ],
            RO: [{
                id: '1',
                name: 'Books RO',
                value: 'books_ro'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            NL: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            IT: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            ES: [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ]
        },
        lda: {
            EN: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'TASA & LAK',
                value: 'TASA_LAK'
            },
            {
                id: '3',
                name: 'None',
                value: ''
            }
            ],
            FR: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'Text Enfants',
                value: 'Text_Enfants'
            },
            {
                id: '3',
                name: 'None',
                value: ''
            }
            ],
            RO: [{
                id: '1',
                name: 'Books RO',
                value: 'books_ro'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            NL: [{
                id: '1',
                name: 'Euro Parlamentean',
                value: 'Euro_Parlamentean'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            IT: [{
                id: '1',
                name: 'Paisa',
                value: 'Paisa'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            ES: [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ]
        },
        word2vec: {
            EN: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            FR: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }
            ],
            RO: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            NL: [{
                id: '1',
                name: 'None',
                value: ''
            }]
        }
    },
    defaultMetricOptions: {
        lsa: {
            EN: function () {
                return DefaultInputData.metricOptions.lsa.EN[0];
            },
            FR: function () {
                return DefaultInputData.metricOptions.lsa.FR[0];
            },
            RO: {
                id: '1',
                name: 'Books RO',
                value: 'books_ro'
            },
            NL: {
                id: '1',
                name: 'None',
                value: ''
            },
            IT: {
                id: '1',
                name: 'None',
                value: ''
            },
            ES: {
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            }
        },
        lda: {
            EN: function () {
                return DefaultInputData.metricOptions.lda.EN[0];
            },
            FR: function () {
                return DefaultInputData.metricOptions.lda.FR[0];
            },
            RO: {
                id: '1',
                name: 'Books RO',
                value: 'books_ro'
            },
            NL: {
                id: '1',
                name: 'Euro Parlamentean',
                value: 'Euro_Parlamentean'
            },
            IT: {
                id: '1',
                name: 'Paisa',
                value: 'Paisa'
            },
            ES: {
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            }
        },
        word2vec: {
            EN: function () {
                return DefaultInputData.metricOptions.word2vec.EN[1];
            },
            FR: function () {
                return DefaultInputData.metricOptions.word2vec.FR[1];
            },
            RO: {
                id: '1',
                name: 'None',
                value: ''
            },
            NL: {
                id: '1',
                name: 'None',
                value: ''
            }
        }
    }
}