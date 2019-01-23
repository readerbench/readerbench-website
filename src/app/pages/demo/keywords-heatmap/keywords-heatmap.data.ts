import { DefaultInputData } from '../demo.component.data';

export let KeywordsHeatmapData = {
    'serviceName': 'keywordsHeatmap',
    'title': 'Keywords Heatmap',
    'granularities': [
        {
            id: '1',
            name: 'Paragraph',
            value: 1
        },
        {
            id: '2',
            name: 'Sentence',
            value: 2
        }
    ],
    'defaultGranularity': function () {
        return KeywordsHeatmapData['granularities'][1];
    },
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
        DefaultInputData.languages[2],  // ro
        DefaultInputData.languages[3]   // nl
    ],
    'defaultLanguage': DefaultInputData.languages[0] // en
};
