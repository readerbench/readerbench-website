import { DefaultInputData } from '../demo.component.data';

export let CsclData = {
    'fileUploadEndpointKey': 'fileUpload',
    'serviceName': 'csclProcessing',
    'title': 'Computer-Supported Collaborative Learning',
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
    ],
    'defaultLanguage': DefaultInputData.languages[0] // en
};
