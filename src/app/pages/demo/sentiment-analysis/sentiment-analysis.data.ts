import { DefaultInputData } from '../demo.component.data';

export let SentimentAnalysisData = {
    'text': 'Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, ' +
        'când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de ' +
        'cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii \'60 odată cu ieşirea colilor Letraset care conţineau pasaje ' +
        'Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.' + 
        String.fromCharCode(10) +
        'În ciuda opiniei publice, Lorem Ipsum nu e un simplu text fără sens. El îşi are rădăcinile într-o bucată a literaturii clasice latine din anul 45 î.e.n., ' + 
        'făcând-o să aibă mai bine de 2000 ani. Profesorul universitar de latină de la colegiul Hampden-Sydney din Virginia, Richard McClintock, a căutat în bibliografie ' + 
        ' unul din cele mai rar folosite cuvinte latine "consectetur", întâlnit în pasajul Lorem Ipsum, şi căutând citate ale cuvântului respectiv în literatura clasică, a descoperit ' + 
        'la modul cel mai sigur sursa provenienţei textului. Lorem Ipsum provine din secţiunile 1.10.32 şi 1.10.33 din "de Finibus Bonorum et Malorum" (Extremele Binelui şi ale Răului) ' + 
        'de Cicerone, scrisă în anul 45 î.e.n. Această carte este un tratat în teoria eticii care a fost foarte popular în perioada Renasterii. Primul rând din Lorem Ipsum, "Lorem ipsum ' + 
        'dolor sit amet...", a fost luat dintr-un rând din secţiunea 1.10.32.',
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
        return SentimentAnalysisData['granularities'][0];
    },
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
        DefaultInputData.languages[2],  // ro
        DefaultInputData.languages[3]   // nl
    ],
    'defaultLanguage': DefaultInputData.languages[2] // ro
};
