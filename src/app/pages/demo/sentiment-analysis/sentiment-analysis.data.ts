import { DefaultInputData } from '../demo.component.data';

export let SentimentAnalysisData = {
    'serviceName': 'sentimentAnalysis',
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
    'defaultGranularity': function () {
        return SentimentAnalysisData['granularities'][2];
    },
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
        DefaultInputData.languages[3]   // nl
    ],
    'defaultLanguage': DefaultInputData.languages[0] // en
};
