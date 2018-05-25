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
            value: 'en'
        },
        {
            id: '2',
            name: 'French',
            value: 'fr'
        },
        {
            id: '3',
            name: 'Romanian',
            value: 'ro'
        },
        {
            id: '4',
            name: 'Dutch',
            value: 'nl'
        },
        {
            id: '5',
            name: 'Spanish',
            value: 'es'
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
            'de': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'en': [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'es': [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'fr': [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'it': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'la': [{
                id: '1',
                name: 'Latin Letters',
                value: 'Letters'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'nl': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'ro': [{
                id: '1',
                name: 'None',
                value: ''
            }]
        },
        lda: {
            'de': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'en': [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'es': [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'fr': [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'it': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'la': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'nl': [{
                id: '1',
                name: 'None',
                value: ''
            }
            ],
            'ro': [{
                id: '1',
                name: 'None',
                value: ''
            }]
        },
        word2vec: {
            'de': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'en': [{
                id: '1',
                name: 'TASA',
                value: 'TASA'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'es': [{
                id: '1',
                name: 'Jose Antonio',
                value: 'Jose_Antonio'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'fr': [{
                id: '1',
                name: 'Le Monde',
                value: 'Le_Monde'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'it': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'la': [{
                id: '1',
                name: 'None',
                value: ''
            }],
            'nl': [{
                id: '1',
                name: 'INL',
                value: 'INL'
            },
            {
                id: '2',
                name: 'None',
                value: ''
            }],
            'ro': [{
                id: '1',
                name: 'None',
                value: ''
            }]
        }
    },
    defaultMetricOptions: {
        lsa: {
            'de': function() {
                return DefaultInputData.metricOptions.lsa.de[0];
            },
            'en': function () {
                return DefaultInputData.metricOptions.lsa.en[0];
            },
            'es': function() {
                return DefaultInputData.metricOptions.lsa.es[0];
            },
            'fr': function () {
                return DefaultInputData.metricOptions.lsa.fr[1];
            },
            'it': function() {
                return DefaultInputData.metricOptions.lsa.it[0];
            },
            'la': function() {
                return DefaultInputData.metricOptions.lsa.la[0];
            },
            'nl': function() {
                return DefaultInputData.metricOptions.lsa.nl[0];
            },
            'ro': function() {
                return DefaultInputData.metricOptions.lsa.ro[0];
            }
        },
        lda: {
            'de': function() {
                return DefaultInputData.metricOptions.lda.de[0];
            },
            'en': function () {
                return DefaultInputData.metricOptions.lda.en[0];
            },
            'es': function() {
                return DefaultInputData.metricOptions.lda.es[0];
            },
            'fr': function () {
                return DefaultInputData.metricOptions.lda.fr[0];
            },
            'it': function() {
                return DefaultInputData.metricOptions.lda.it[0];
            },
            'la': function() {
                return DefaultInputData.metricOptions.lda.la[0];
            },
            'nl': function() {
                return DefaultInputData.metricOptions.lda.nl[0];
            },
            'ro': function() {
                return DefaultInputData.metricOptions.lda.ro[0];
            }
        },
        word2vec: {
            'de': function() {
                return DefaultInputData.metricOptions.word2vec.de[0];
            },
            'en': function () {
                return DefaultInputData.metricOptions.word2vec.en[0];
            },
            'es': function() {
                return DefaultInputData.metricOptions.word2vec.es[0];
            },
            'fr': function () {
                return DefaultInputData.metricOptions.word2vec.fr[0];
            },
            'it': function() {
                return DefaultInputData.metricOptions.word2vec.it[0];
            },
            'la': function() {
                return DefaultInputData.metricOptions.word2vec.la[0];
            },
            'nl': function() {
                return DefaultInputData.metricOptions.word2vec.nl[0];
            },
            'ro': function() {
                return DefaultInputData.metricOptions.word2vec.ro[0];
            }
        }
    }
}