ServerSettings = {
    delim: '/',
    protocol: 'http',
    ip: window.location.hostname,
    port: '8080',
    mailPort: '9001',
    resourceRoot: 'resources/in/'
};
DemoTextProcessingItems = [
    {
        name: 'Sentiment Analysis',
        href: 'demo/sentiment-analysis',
        description: 'Sentiment Analysis',
        image: 'images/demo_sentiment_analysis.png',
        altText: 'Sentiment Analysis with ReaderBench framework'
    },
    {
        name: 'Textual Complexity',
        href: 'demo/textual-complexity',
        description: 'Classic Textual Complexity formulas.',
        image: 'images/demo_textual_complexity.png',
        altText: 'Textual Complexity with ReaderBench framework'
    },
    {
        name: 'Keywords',
        href: 'demo/keywords',
        description: 'Keywords',
        image: 'images/demo_keywords.png',
        altText: 'Keywords extraction with ReaderBench framework'
    }//,
//    {
//        name: 'Semantic Search',
//        href: 'demo/semantic-search',
//        description: 'Semantic Search',
//        image: 'images/demo_semantic_search.png',
//        altText: 'Semantic Search with ReaderBench framework'
//    }
];
DemoItems = [   
    {
        name: 'Semantic annotation',
        href: 'demo/semantic-annotation',
        description: 'Semantic annotation ensures a cohesion-centered, \n\
in-depth representation of discourse, useful for mining keywords and \n\
performing automated text categorization.',
        image: 'images/demo_semantic_annotation.png',
        altText: 'Semantic annotation with ReaderBench framework'
    },
    {
        name: 'Self explanation',
        href: 'demo/self-explanation',
        description: 'The automatically identified strategies within \n\
ReaderBench comprise of monitoring, causality, bridging, paraphrase and \n\
elaboration.',
        image: 'images/demo_self_explanation.png',
        altText: 'Self explanation with ReaderBench framework'
    },
    {
        name: 'CSCL',
        href: 'demo/cscl',
        description: 'Starting from dialogism and a cohesion-based model of \n\
discourse, this tool uses two computational models for assessing \n\
participation and collaboration.',
        image: 'images/demo_cscl.png',
        altText: 'CSCL conversation analysis with ReaderBench framework',
    },
    /*{
        name:'CV & Cover letter',
        href:'demo/cv-cover'
    },*/
    {
        name: 'CV',
        href: 'demo/cv',
        description: 'Given a CV document, specific lexical and visual \n\
analysis are performed.',
        image: 'images/demo_cv.png',
        altText: 'CV analysis with ReaderBench framework'
    }//,
//    {
//        name: 'VCoP',
//        href: 'demo/vcop',
//        description: 'Given a community forum, specific analysis are performed.',
//        image: 'images/demo_vcop.png',
//        altText: 'Virtual Communities of Practice analysis with ReaderBench \n\
//framework'
//    }
];
DemoItems = DemoTextProcessingItems.concat(DemoItems);
DemoElements = {
    languages: [
        {id: '1', name: 'English', value: 'EN'},
        {id: '2', name: 'French', value: 'FR'},
        {id: '3', name: 'Romanian', value: 'RO'},
        {id: '4', name: 'Dutch', value: 'NL'}
    ],
    defaultLanguage: {id: '1', name: 'English', value: 'EN'},
    posTaggingOptions: [
        {id: '1', name: 'Yes', value: true},
        {id: '2', name: 'No', value: false}
    ],
    defaultPosTaggingOption: {id: '1', name: 'Yes', value: true},
    dialogismOptions: [
        {id: '1', name: 'Yes', value: true},
        {id: '2', name: 'No', value: false}
    ],
    defaultDialogismOption: {id: '2', name: 'No', value: false},
    metricOptions: {
        lsa: {
            EN: [
                {id: '1', name: 'TASA', value: 'TASA'},
                {id: '2', name: 'TASA & LAK', value: 'TASA_LAK'},
                {id: '3', name: 'SciRef', value: 'SciRef'},
                {id: '4', name: 'None', value: ''}
            ],
            FR: [
                {id: '1', name: 'Le Monde', value: 'Le_Monde'},
                {id: '2', name: 'Text Enfants', value: 'Text_Enfants'},
                {id: '3', name: 'None', value: ''}
            ],
            RO: [
                {id: '1', name: 'Books RO', value: 'books_ro'},
                {id: '2', name: 'None', value: ''}
            ],
            NL: [
                {id: '1', name: 'None', value: ''}
            ],
            IT: [
                {id: '1', name: 'None', value: ''}
            ],
            ES: [
                {id: '1', name: 'Jose Antonio', value: 'Jose_Antonio'},
                {id: '2', name: 'None', value: ''}
            ]
        },
        lda: {
            EN: [
                {id: '1', name: 'TASA', value: 'TASA'},
                {id: '2', name: 'TASA & LAK', value: 'TASA_LAK'},
                {id: '3', name: 'None', value: ''}
            ],
            FR: [
                {id: '1', name: 'Le Monde', value: 'Le_Monde'},
                {id: '2', name: 'Text Enfants', value: 'Text_Enfants'},
                {id: '3', name: 'None', value: ''}
            ],
            RO: [
                {id: '1', name: 'Books RO', value: 'books_ro'},
                {id: '2', name: 'None', value: ''}
            ],
            NL: [
                {id: '1', name: 'Euro Parlamentean', value: 'Euro_Parlamentean'},
                {id: '2', name: 'None', value: ''}
            ],
            IT: [
                {id: '1', name: 'Paisa', value: 'Paisa'},
                {id: '2', name: 'None', value: ''}
            ],
            ES: [
                {id: '1', name: 'Jose Antonio', value: 'Jose_Antonio'},
                {id: '2', name: 'None', value: ''}
            ]
        },
        word2Vec: {
            EN: [
                {id: '1', name: 'TASA', value: 'TASA'},
                {id: '2', name: 'None', value: ''}
            ],
            FR: [
                {id: '1', name: 'Le Monde', value: 'Le_Monde'},
                {id: '2', name: 'None', value: ''}
            ],
            RO: [
                {id: '1', name: 'None', value: ''}
            ],
            NL: [
                {id: '1', name: 'None', value: ''}
            ]
        }
    },
    defaultMetricOptions: {
        lsa: {
            EN: {id: '1', name: 'TASA', value: 'TASA'},
            FR: {id: '1', name: 'Le Monde', value: 'Le_Monde'},
            RO: {id: '1', name: 'Books RO', value: 'books_ro'},
            NL: {id: '1', name: 'None', value: ''},
            IT: {id: '1', name: 'None', value: ''},
            ES: {id: '1', name: 'Jose Antonio', value: 'Jose_Antonio'}
        },
        lda: {
            EN: {id: '1', name: 'TASA', value: 'TASA'},
            FR: {id: '1', name: 'Le Monde', value: 'Le_Monde'},
            RO: {id: '1', name: 'Books RO', value: 'books_ro'},
            NL: {id: '1', name: 'Euro Parlamentean', value: 'Euro_Parlamentean'},
            IT: {id: '1', name: 'Paisa', value: 'Paisa'},
            ES: {id: '1', name: 'Jose Antonio', value: 'Jose_Antonio'}
        },
        word2Vec: {
            EN: {id: '2', name: 'None', value: ''},
            FR: {id: '2', name: 'None', value: ''},
            RO: {id: '1', name: 'None', value: ''},
            NL: {id: '1', name: 'None', value: ''}
        }
    },
    vcopCommunityOptions: [
        {id: '1', name: 'Forum Nic', value: 'forum_Nic'},
        {id: '2', name: '', value: ''}
    ],
    defaultVcopCommunityOptions: {id: '1', name: 'Forum Nic', value: 'forum_Nic'},
    textualComplexityOptions: [
        {id: '1', name: 'Yes', value: true},
        {id: '2', name: 'No', value: false}
    ],
    defaulttextualComplexityOptions: {id: '2', name: 'No', value: false},
    defaultMonthIncrement: 0,
    defaultDayIncrement: 7,
    defaultSemanticSimilarityThreshold: 0.5
};
NavBarItems = [{
        name: 'Home',
        href: '/'
    }, {
        name: 'Demo',
        href: 'demo'
    }, {
        name: 'People',
        href: 'people'
    }, {
        name: 'Projects',
        href: 'projects'
    }, {
        name: 'Publications',
        href: 'publications'
    }, {
        name: 'Contact',
        href: 'contact'
    }];
Reviews = [
    {
        message: '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
        author: 'Adrian Sandu, ',
        title: 'Developer'
    },
    {
        message: '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
        author: 'Larise Stavarache, ',
        title: 'Developer'
    },
    {
        message: '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
        author: 'Mihai Dascalu, ',
        title: 'Developer'
    },
    {
        message: '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
        author: 'Razvan Marian Vlasceanu, ',
        title: 'Developer'
    },
    {
        message: '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
        author: 'Andrei Marinete, ',
        title: 'UI/UX Designer'
    }, ];
BrowseItems = [{
        title: 'Live Demo',
        description: 'See the live demonstration of the ReaderBench application.'
    }, {
        title: 'People',
        description: 'Meet up the people who worked on the application.'
    }, {
        title: 'Projects',
        description: 'Check the projects regarding the ReaderBench application.'
    }, {
        title: 'Publications',
        description: 'See the publications done by the people from ReaderBench.'
    }];
PeoplePlaces = [{
        name: 'Faculty of Automatic Control and Computers',
        picture: 'img/A&C-logo-EN-gradient.png'
    }, {
        name: 'Ludwig Maximilians Unversity of Munchen',
        picture: 'img/LMU.png'
    }, {
        name: 'Institute for the Science of Learning & Teaching - Arizona State University',
        picture: 'img/ASU.jpg'
    }, {
        name: 'Laboratoire de Science de l\'Education - University Grenoble Alpes',
        picture: 'img/UGA.jpg'
    }, {
        name: 'University "Politehnica" of Bucharest',
        picture: 'img/UPB.jpg'
    }, {
        name: 'Georgia State University',
        picture: 'img/GSU.jpg'
    }];
PeopleUPB = [
    {
        name: 'Mihai Dascalu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/mihai-dascalu-8a57ab10a',
        scholarlink: 'https://scholar.google.com/citations?user=3L9yY8UAAAAJ&hl=en',
        dblplink: 'http://dblp1.uni-trier.de/pers/hd/d/Dascalu:Mihai'
    },
    {
        name: 'Stefan Trausan-Matu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/stefan-trausan-matu-9296707',
        scholarlink: 'https://scholar.google.com/citations?user=p_KpBToAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/t/Trausan=Matu:Stefan'
    },
    {
        name: 'Gabriel Gutu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/gabrielgutu/',
        scholarlink: 'https://scholar.google.ro/citations?user=-pGqq7QAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/g/Gutu:Gabriel=Marius'
    },
    {
        name: 'Stefan Ruseti',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/stefan-ruseti-97a011a1',
        scholarlink: 'https://scholar.google.com/citations?user=aEyJTykAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/r/Ruseti:Stefan'
    },
    {
        name: 'Ionut Paraschiv',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/ionut-paraschiv-9aa6875',
        scholarlink: '',
        dblplink: 'http://dblp1.uni-trier.de/pers/hd/p/Paraschiv:Ionut_Cristian'
    },
    {
        name: 'Traian Rebedea',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/trebedea',
        scholarlink: 'https://scholar.google.com/citations?user=7NxaE1MAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/r/Rebedea:Traian'
    },
    {
        name: 'Remus Mazilu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: '',
        scholarlink: '',
        dblplink: ''
    },
    {
        name: 'Dragos Corlatescu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: '',
        scholarlink: '',
        dblplink: ''
    }
];
PeopleLSE = [
    {
        name: 'Philippe Dessus',
        picture: 'img/male.jpg',
        area: 'Educational Sciences',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=I-RoP1cAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/d/Dessus:Philippe'
    },
    {
        name: 'Maryse Bianco',
        picture: 'img/female.jpg',
        area: 'Educational Sciences',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=jFYNe4UAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/b/Bianco:Maryse'
    },
    {
        name: 'Aurelie Nardy',
        picture: 'img/female.jpg',
        area: 'Educational Sciences',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=6LYAdBIAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/n/Nardy:Aur=eacute=lie'
    }];
PeopleLMU = [{
        name: 'Nicolae Nistor',
        picture: 'img/male.jpg',
        area: 'Psychology',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=cNVq5HUAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/n/Nistor:Nicolae'
    }];
PeopleASU = [
    {
        name: 'Danielle S. McNamara',
        picture: 'img/female.jpg',
        area: 'Cognitive Psychology',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=NOxLJQUAAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/m/McNamara:Danielle_S='
    },
    {
        name: 'Laura V. Allen',
        picture: 'img/female.jpg',
        area: 'Cognitive Psychology',
        linkedin: '',
        scholarlink: '',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/a/Allen:Laura'
    }];
PeopleGSU = [
    {
        name: 'Scott Crossley',
        picture: 'img/male.jpg',
        area: 'Computational Linguistics',
        linkedin: 'https://www.linkedin.com/in/scott-crossley-1bb07b5b',
        scholarlink: 'https://scholar.google.com/citations?user=PDzqXW4AAAAJ&hl=en',
        dblplink: 'http://dblp.uni-trier.de/pers/hd/c/Crossley:Scott_A='
    },
    {
        name: 'Stephen Skalicky',
        picture: 'img/male.jpg',
        area: 'Applied Linguistics',
        linkedin: 'https://www.linkedin.com/in/stephen-skalicky-9009a9107/',
        scholarlink: 'https://scholar.google.com/citations?user=vXuyDG4AAAAJ&hl=en',
        dblplink: ''
    },
    {
        name: 'William Michael Lake',
        picture: 'img/male.jpg',
        area: 'Applied Linguistics',
        linkedin: '',
        scholarlink: '',
        dblplink: ''
    },
    {
        name: 'Rurik Lol Tywoniw',
        picture: 'img/male.jpg',
        area: 'Applied Linguistics',
        linkedin: 'https://www.linkedin.com/in/rurik-tywoniw-38b642a7/',
        scholarlink: '',
        dblplink: ''
    }];
PeoplePrevious = [
    {
        name: 'Lucia Larise Stavarache',
        picture: 'img/female.jpg',
        area: 'Software Development',
        linkedin: '',
        scholarlink: 'https://scholar.google.com/citations?user=do49nJAAAAAJ&hl=en',
        dblplink: 'http://dblp1.uni-trier.de/pers/hd/s/Stavarache:Larise_Lucia'
    },
    {
        name: 'Adrian Sandu',
        picture: 'img/male.jpg',
        area: 'Software Development',
        linkedin: 'https://ro.linkedin.com/in/adrian-bogdan-sandu-87a84a6a',
        scholarlink: '',
        dblplink: ''
    }];
Projects = [
    {
        title: 'RAGE',
        link: 'http://rageproject.eu/',
        description: 'RAGE aims to develop, transform and enrich advanced technologies from the leisure games industry into self-contained gaming assets (i.e. solutions showing economic value potential) that support game studios at developing applied games easier, faster and more cost-effectively. These assets will be available along with a large volume of high-quality knowledge resources through a self-sustainable Ecosystem, which is a social space that connects research, gaming industries, intermediaries, education providers, policy makers and end-users. RAGE - Realising an Applied Gaming Eco-system, is a 48-months Technology and Know-How driven Research and Innovation project co-funded by EU Framework Programme for Research and Innovation, Horizon 2020.',
        category: 'Horizon 2020',
        image: 'images/rage_logo.png',
        imageDescription: 'Delivering access to advanced gaming technology resources and state-of-the-art knowledge to develop Applied Games easier, faster and more cost-effectively'
    },
    {
        title: 'Language Technologies for Lifelong Learning',
        link: 'http://www.ltfll-project.org/',
        description: 'The outcomes of the LTfLL project are prototypes of next-generation services built on advanced research on the application of language technologies in education. Their exploitation to a consumer market requires some further development (on usability, transferability to other domains and other learning environments, etc.).The target groups (as targeted people) of the LTfLL outcomes can be grouped in three: Researchers and developers, Content service providers and End-users of the LTfLL services. The LTfLL project is partially supported/co-funded by the European Union under the Information and Communication Technologies (ICT) theme of the 7th Framework Programme for R&D (FP7-ICT-2007-1-4.1)',
        category: 'Information and Communication Technologies',
        image: 'images/ltfll-logo3.png',
        imageDescription: 'Finding new innovative ways to tackle this newest challenge is one of the ambitions of the Language Technologies for Lifelong Learning project (LTfLL). Its two baseline objectives are: (a) helping people learn, and, (b) helping tutors/teachers to support learners.'
    }];
AboutSections = [
    {
        title: 'ReaderBench',
        description: 'ReaderBench is an automated software framework designed to support both students and tutors by making use of text mining techniques, advanced natural language processing, and social network analysis tools. ReaderBench is centered on comprehension prediction and assessment based on a cohesion-based.representation of the discourse applied on different sources (e.g., textual materials, behavior tracks, metacognitive explanations, Computer Supported Collaborative Learning - CSCL - conversations). Therefore, ReaderBench can act as a Personal Learning Environment (PLE) which incorporates both individual and collaborative assessments. Besides the a priori evaluation of textual materials\' complexity presented to learners, our system supports the identification of reading strategies evident within the learners\' self-explanations or summaries. Moreover, ReaderBench integrates a dedicated cohesion-based module to assess participation and collaboration in CSCL conversations.'
    },
    {
        title: "ReaderBench's Purpose",
        description: 'Designed as support for both tutors and students, our implemented system, ReaderBench, can be best described as an educational learning helper tool to enhance the quality of the learning process. ReaderBench is a fully functional framework that enhances learning using various techniques such as textual complexity assessment, voice modeling for CSCL discourse analysis, topics modeling using Latent Semantic Analysis and Latent Dirichlet Allocation, and virtual communities of practice analysis.Our system was developed building upon indices provided in renowned systems such as E-rater, iSTART, and Coh-Metrix. However, ReaderBench provides an integration of these systems. ReaderBench includes multi-lingual comprehensioncentered analyses focused on semantics, cohesion and dialogism. For tutors, ReaderBench provides (a) the evaluation of reading material\'s textual complexity, (b) the measurement of social collaboration within a group endeavors, and (c) the evaluation of learners\' summaries and self-explanations. For learners, ReaderBench provides (a) the improvement of learning capabilities through the use of reading strategies, and (b) the evaluation of students\' comprehension levels and performance with respect to other students. ReaderBench maps directly onto classroom education, combining individual learning methods with Computer Supported Collaborative Learning (CSCL) techniques.'
    }
];
DemoTexts = {
    // Text Processing
    textProcessing: {
        title: 'Text Processing'
    },
    // Common fields
    common: {
        text: 'RAGE aims to develop, transform and enrich advanced technologies from the leisure games industry into self-contained gaming assets (i.e. solutions showing economic value potential) that support game studios at developing applied games easier, faster and more cost-effectively. These assets will be available along with a large volume of high-quality knowledge resources through a self-sustainable Ecosystem, which is a social space that connects research, gaming industries, intermediaries, education providers, policy makers and end-users. RAGE – Realising an Applied Gaming Eco-system,  is a 48-months Technology and Know-How driven Research and Innovation project co-funded by EU Framework Programme for Research and Innovation, Horizon 2020.'
                + String.fromCharCode(13)
                + 'The EU based industry for non-leisure games – Applied Games – is an emerging business with multiple uses in industry, education, health and the public administration sectors. As such, it is still fragmented and needs critical mass to compete globally. Nevertheless its growth potential is widely recognised and even suggested to exceed the growth potential of the leisure games market.'
                + String.fromCharCode(13)
                + 'The gaming technology assets gathered along the project lifecycle will be tested and evaluated by gaming companies integrated in the RAGE consortium. These companies will be creating games that will be empirically validated in real world pilots in different application scenarios representing different markets and target groups for the Applied Games industry.'
    },
    // Sentiment Analysis
    sentimentAnalysis: {
        title: 'Sentiment Analysis'
    },
    // Textual Complexity
    textualComplexity: {
        title: 'Textual Complexity'
    },
    // Keywords
    keywords: {
        title: 'Keywords',
        conceptMapTitle: 'Concept Map'
    },
    // Semantic Search
    semanticSearch: {
        title: 'Semantic Search'
    },
    // Semantic Annotation
    semanticAnnotation: {
        title: 'Semantic Annotation',
        abstractText: 'Interactive virtual environments (IVEs) are now seen as an '
                + 'engaging new way by which children learn experimental sciences and '
                + 'other disciplines. These environments are populated by synthetic characters '
                + 'that guide and stimulate the children activities. In order to build '
                + 'such environments, one needs to address the problem of how achieve believable '
                + 'lievable and empathic characters that act autonomously. Inspired by the '
                + 'work of traditional character animators, this paper proposes an architectural '
                + 'model to build autonomous characters where the agent\'s reasoning '
                + 'and behaviour is influenced by its emotional state and personality. We '
                + 'performed a small case evaluation in order to determine if the characters '
                + 'evoked empathic reactions in the users with positive results.',
        keywords: 'interactive virtual environment, emotional characters, empathic reactions',
        conceptMapTitle: 'Concept Map'
    },
    // Self Explanation (Reading Strategies)
    selfExplanation: {
        title: 'Self Explanation',
        language: DemoElements.languages[1], // fr
        text: 'Ce soir-là, la famille de Matilda dînait comme d\'habitude devant la télévision. Ils entendirent une voix forte venant du salon dire : « salut, salut, salut ».'
                + 'La mère devint toute blanche. Elle dit à son mari « il y a quelqu\'un dans la maison ». Ils arrêtèrent tous de manger. Ils étaient tous sur le qui-vive. La voix reprit « salut, salut, salut ». Le frère se mit à crier « ça recommence ! ». Matilda se leva et alla éteindre la télévision.'
                + String.fromCharCode(13)
                + 'La mère, paniquée, dit à son mari : « Henri, des voleurs, ils sont dans le salon, tu devrais y aller ». Le père, raide sur sa chaise ne bougea pas. Il n\'avait pas envie de jouer au héros.  Sa femme lui dit : « Alors, tu te décides ? Ils doivent être en train de faucher l\'argenterie ! ».'
                + String.fromCharCode(13)
                + 'Monsieur Verdebois s\'essuya nerveusement les lèvres avec sa serviette et proposa d\'aller voir tous ensemble. La mère attrapa un tisonnier au coin de la cheminée. Le père s\'arma d\'une canne de golf posée dans un coin. Le frère attrapa un tabouret. Matilda prit le couteau avec lequel elle mangeait. Puis ils se dirigèrent tous les quatre vers la porte du salon en marchant sur la pointe des pieds.'
                + 'À ce moment-là, ils entendirent à nouveau la voix. Matilda fit alors irruption dans la pièce en brandissant son couteau et cria « haut les mains, vous êtes pris ! ».  Les autres la suivirent en agitant leurs armes.'
                + String.fromCharCode(13)
                + 'Puis, ils s\'arrêtèrent pour regarder autour d\'eux. Ils ne virent personne. Le père fut soulagé et dit « il n\'y a pas de voleur ici ». Sa femme lui répondit d\'une voix tremblante « mais Henri, je l\'ai entendu, et toi aussi ». Matilda appuya la réponse de sa mère en ajoutant « je suis sûre de l\'avoir entendu, il est ici quelque part ».'
                + 'C\'est alors que la voix s\'éleva à nouveau. Ils sursautèrent tous, y compris Matilda qui jouait très bien la comédie. Ils inspectèrent la grande pièce. Ils ne trouvèrent toujours personne.'
                + String.fromCharCode(13)
                + 'Matilda dit alors que c\'était un fantôme : « Le salon est hanté, je croyais que vous le saviez. Je sais que c\'est le fantôme, je l\'ai déjà entendu ici ». Les parents, très pâles, sortirent du salon suivis par les enfants.'
                + String.fromCharCode(13)
                + 'Plus tard, suivie de son frère, Matilda retourna dans la pièce. C\'est alors qu\'elle sortit du manteau de la cheminée le perroquet de leur copain Arthur. Ils éclatèrent alors de rire.'
                + String.fromCharCode(13)
                + 'Ils passèrent par la porte de derrière en emmenant l\'animal avec eux. Matilda rendit son perroquet à Arthur et lui raconta la soirée. Il n\'y eut plus jamais de fantôme chez les Verdebois.',
        explanation: 'au début c\'est une famille de riches qui mangent et puis ils entendent une phrase avec une voix grave salut salut. Donc les parents commencent à avoir peur. Donc la mère de la fille elle croit que c\'est un voleur qui vient leur voler leur argent leur argenterie. Et du coup elle dit au père d\'y aller mais il veut pas donc ils y vont tous ensemble. Et la fille elle joue bien la comédie parce que ça redit salut salut salut et elle commence à sursauter. Et puis un moment elle leur raconte l\'histoire de fantômes donc ils y croient. Et puis au bout d\'un moment elle arrête la plaisanterie en allant chercher le perroquet qu\'elle avait mis au-dessus de la cheminée qu\'elle avait emprunté à son copain Arthur. Et du coup ben ils eurent plus jamais de fantômes chez eux. C\'était juste pour jouer un tour à ses parents.'
    },
    csclProcessing: {
        title: 'CSCL Conversation Analysis',
        conversationFile: 'corpus_v2/Beizadea_352C2_in.xml',
        participantInteractionTitle: 'Participant Interaction',
        participantEvolutionTitle: 'Participant Evolution',
        collaborationSocialKB: 'Collaboration - Social KB',
        collaborationVoiceOverlapTitle: 'Collaboration - Voice Overlap',
        sampleFileUrl: '../../samples/cscl.xml'
    },
    cvCover: {
        title: 'CV & Cover',
        language: DemoElements.languages[1] // fr
    },
    cv: {
        title: 'CV Analysis',
        keywords: 'prospection, prospect, développement, clients, fidélisation, chiffred’affaires, marge, vente, portefeuille, négociation, budget, rendez-vous, proposition, terrain, téléphone, rentabilité, business, reporting, veille, secteur, objectifs, comptes, animation, suivi, création, gestion',
        ignore: 'janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre',
        language: DemoElements.languages[1] // fr
    },
    vcop: {
        title: 'View Community',
        language: DemoElements.languages[0],
        CommunityGlobalView: 'Coommunity Global View',
        CommunityInTimeFrameView: 'Community in selected timeframe view'
    },
    contact: {
        title: 'Contact Us'
    },
    // Map Builder Controller
    mapBuilder: {
        title: 'Concept Map Builder'
    }
};
