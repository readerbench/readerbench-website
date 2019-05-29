import { DefaultInputData } from "../demo.component.data";

export var SemDiffData = {
    'title': 'Semantic Diff',
    'defaultText': 'Two days after he was sworn in as Prime Minister , '
    + ' the Wall Street Crash of 1929 occurred , marking the beginning of '
    + ' the Great Depression and subsequent Great Depression in Australia .',

    'defaultText1': 'While serving with that unit , he gained a reputation '
    + 'for making quick tactical decisions and taking advantage of enemy confusion.',

    'defaultText2': 'The sea is one of the most seismic areas in the world',

    'modalText1': 'The orbital elements given here are as of January 2000 , '
    + 'but they are changing a lot due to Solar and planetary perturbations .',
    
    'modalText2': 'The orbital elements given here are as of January 2000 , '
    + 'but they are continuously changing due to Solar and planetary perturbations',

    'default_number_of_docs': DefaultInputData.number_of_docs[0],
    'languages': [
        DefaultInputData.languages[0]
    ],
    'defaultLanguage': DefaultInputData.languages[0],
    test: true,
    'test_documents' :  [
        {
            id: '1',
            name: '500',
            value: '100'
        },
        {
            id: '2',
            name: '1000',
            value: '1000'
        },
        {
            id: '3',
            name: '5000',
            value: '5000'
        },
        {
            id: '4',
            name: '10000',
            value: '10000'
        },
        {
            id: '5',
            name: '50000',
            value: '50000'
        },
        {
            id: '6',
            name: '100000',
            value: '100000'
        },
        {
            id: '7',
            name: '132000',
            value: '132000'
        }
    ],
    'test_search_corpus_offline' : [
        {
            id: '1',
            name: 'unsimplified',
            value: 'unsimplified'
        },
        {
            id: '2',
            name: 'simplified',
            value: 'simplified'
        }]
};