import { DefaultInputData } from '../demo.component.data';

export let KeywordsData = {
    'serviceName': 'keywords',
    'title': 'Keywords',
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
        DefaultInputData.languages[2],  // ro
        DefaultInputData.languages[3],  // nl
        DefaultInputData.languages[4]   // es
    ],
    'defaultLanguage': DefaultInputData.languages[0] // en
};
