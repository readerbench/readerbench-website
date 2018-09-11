import { DefaultInputData } from "../demo.component.data";

export var SemanticDiffData = {
    'originalText' : "MARLEY was dead: to start with. There is no doubt whatever about that. The register of his burial was signed by the clergyman, the clerk, the undertaker, and the chief mourner. Scrooge signed it: and Scrooge's name was good upon 'Change, for anything he chose to put his hand to. Old Marley was as dead as a door-nail.\nMind! I don't mean to say that I know, of my own knowledge, what there is particularly dead about a door-nail. I might have been inclined, myself, to regard a coffin-nail as the deadest piece of ironmongery in the trade. But the wisdom of our ancestors is in the simile; and my unhallowed hands shall not disturb it, or the Country's done for. You will therefore permit me to repeat, emphatically, that Marley was as dead as a door-nail.",
    'revisedText' : "MARLEY was dead: to begin with. There is no doubt whatever about that. The register of his burial was signed by the clergyman, the clerk, the undertaker, and the chief mourner. Scrooge signed it: and Scrooge's name was good upon 'Change, for anything he chose to put his hand to. Old Marley was as dead as a door-nail.\nMind! I don't mean to say that I know, of my own awareness, what there is particularly dead about a door-nail. I might have been inclined, myself, to regard a coffin-nail as the deadest piece of ironmongery in the trade. But the wisdom of our ancestors is in the simile; and my unhallowed hands shall not disturb it, or the Country's done for. You will therefore permit me to repeat, emphatically, that Marley was as dead as a door-nail.\nScrooge knew he was dead? Of course he did.",
    'componentTitle': 'Semantic Diff',
    'languages': [
        DefaultInputData.languages[0],  // en
    ],
    'defaultLanguage': DefaultInputData.languages[0], // en
    'diffStrategies': [
        {
            id: '1',
            name: 'Classic Diff',
            value: 'ClassicDiff'
        },
        {
            id: '2',
            name: 'WordNet Diff',
            value: 'WordNetDiff'
        },
        {
            id: '3',
            name: 'Disambiguation Graph Diff',
            value: 'DisambiguationGraphDiff'
        },
        {
            id: '4',
            name: 'LSA',
            value: 'LSA'
        },
        {
            id: '5',
            name: 'LDA',
            value: 'LDA'
        },
        {
            id: '6',
            name: 'Word2Vec',
            value: 'Word2Vec'
        }
    ],
    'similarityTypes': [
        {
            id: '1',
            name: 'WU PALMER',
            value: 'WU_PALMER'
        },
        {
            id: '2',
            name: 'LEACOCK CHODOROW',
            value: 'LEACOCK_CHODOROW'
        },
        {
            id: '3',
            name: 'PATH SIM',
            value: 'PATH_SIM'
        }
    ],
    'defaultDiffStrategy': function() {
        return SemanticDiffData['diffStrategies'][0];
    },
    'defaultSimilarityType': function() {
        return SemanticDiffData['similarityTypes'][0];
    },
};