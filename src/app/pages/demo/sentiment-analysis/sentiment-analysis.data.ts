import { DefaultInputData } from "../demo.component.data";

export var SentimentAnalysisData = {
    'componentTitle': 'Sentiment Analysis',
    'granularities': [
        {
            id: '1',
            name: 'Document',
            value: 1
        },
        {
            id: '2',
            name: 'Paragraph',
            value: 2
        },
        {
            id: '3',
            name: 'Sentence',
            value: 3
        },
        {
            id: '4',
            name: 'Word',
            value: 4
        }
    ],
    'defaultGranularity': function() {
        return SentimentAnalysisData['granularities'][2];
    },
    'languages': [
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
    'defaultLanguage': DefaultInputData.languages[0] // en
};