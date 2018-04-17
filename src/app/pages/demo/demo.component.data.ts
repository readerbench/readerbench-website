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
        },
        {
            id: '5',
            name: 'Spanish',
            value: 'Spanish'
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
            German: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            English: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Spanish: [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            French: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Italian: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Latin: [{
                id: '1',
                name: 'Latin Letters',
                value: 'Letters'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Dutch: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Romanian: [{
                id: '1',
                name: 'None',
                value: ''
            }]
        },
        lda: {
            German: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            English: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Spanish: [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            French: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Italian: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Latin: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Dutch: [{
                id: '1',
                name: 'None',
                value: ''
            }
            ],
            Romanian: [{
                id: '1',
                name: 'None',
                value: ''
            }]
        },
        word2vec: {
            German: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            English: [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Spanish: [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            French: [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Italian: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Latin: [{
                id: '1',
                name: 'None',
                value: ''
            }],
            Dutch: [{
                id: '1',
                name: 'INL',
                value: 'INL'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            Romanian: [{
                id: '1',
                name: 'None',
                value: ''
            }]
        }
    },
    defaultMetricOptions: {
        lsa: {
            German: function() {
                return DefaultInputData.metricOptions.lsa.German[0];
            },
            English: function () {
                return DefaultInputData.metricOptions.lsa.English[0];
            },
            Spanish: function() {
                return DefaultInputData.metricOptions.lsa.Spanish[0];
            },
            French: function () {
                return DefaultInputData.metricOptions.lsa.French[0];
            },
            Italian: function() {
                return DefaultInputData.metricOptions.lsa.Italian[0];
            },
            Latin: function() {
                return DefaultInputData.metricOptions.lsa.Latin[0];
            },
            Dutch: function() {
                return DefaultInputData.metricOptions.lsa.Dutch[0];
            },
            Romanian: function() {
                return DefaultInputData.metricOptions.lsa.Romanian[0];
            }
        },
        lda: {
            German: function() {
                return DefaultInputData.metricOptions.lda.German[0];
            },
            English: function () {
                return DefaultInputData.metricOptions.lda.English[0];
            },
            Spanish: function() {
                return DefaultInputData.metricOptions.lda.Spanish[0];
            },
            French: function () {
                return DefaultInputData.metricOptions.lda.French[0];
            },
            Italian: function() {
                return DefaultInputData.metricOptions.lda.Italian[0];
            },
            Latin: function() {
                return DefaultInputData.metricOptions.lda.Latin[0];
            },
            Dutch: function() {
                return DefaultInputData.metricOptions.lda.Dutch[0];
            },
            Romanian: function() {
                return DefaultInputData.metricOptions.lda.Romanian[0];
            }
        },
        word2vec: {
            German: function() {
                return DefaultInputData.metricOptions.word2vec.German[0];
            },
            English: function () {
                return DefaultInputData.metricOptions.word2vec.English[0];
            },
            Spanish: function() {
                return DefaultInputData.metricOptions.word2vec.Spanish[0];
            },
            French: function () {
                return DefaultInputData.metricOptions.word2vec.French[0];
            },
            Italian: function() {
                return DefaultInputData.metricOptions.word2vec.Italian[0];
            },
            Latin: function() {
                return DefaultInputData.metricOptions.word2vec.Latin[0];
            },
            Dutch: function() {
                return DefaultInputData.metricOptions.word2vec.Dutch[0];
            },
            Romanian: function() {
                return DefaultInputData.metricOptions.word2vec.Romanian[0];
            }
        }
    }
}