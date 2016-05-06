ServerSettings = {
    delim: '/',
    protocol: 'http',
    ip: window.location.hostname,
    port: '8080',
    resourceRoot: 'resources/in/',
    lsaRoot: 'resources/config/LSA',
    ldaRoot: 'resources/config/LDA'
};
DemoItems = [
 	{name:'Text processing', href:'demo/text-processing'},
 	{name:'Semantic annotation', href:'demo/semantic-annotation'},
 	{name:'Self explanation', href:'demo/self-explanation'},
 	{name:'CSCL', href:'demo/cscl'},
 	//{name:'CV & Cover letter', href:'demo/cv-cover'},
 	{name:'CV', href:'demo/cv'}
];
DemoElements = {
		languages: [
			{id: '1', name: 'English', value: 'English'},
		    {id: '2', name: 'French', value: 'French'}
		],
		defaultLanguage: {id: '1', name: 'English', value: 'English'},
		posTaggingOptions: [
        	{id: '1', name: 'Yes', value: true},
            {id: '2', name: 'No', value: false}
        ],
        defaultPosTaggingOption: {id: '2', name: 'No', value: false},
        dialogismOptions: [
        	{id: '1', name: 'Yes', value: true},
            {id: '2', name: 'No', value: false}
        ],
        defaultDialogismOption: {id: '2', name: 'No', value: false},
        metricOptions: {
    		 lsa: {
    			 	English: [
    	    	         {id: '1', name: 'tasa_en', value: 'tasa_en'},
    	    	         {id: '2', name: 'tasa_lak_en', value: 'tasa_lak_en'},
    	    	         {id: '3', name: 'financial_en', value: 'financial_en'},
    	    	         {id: '4', name: '', value: ''}
    	    	    ],
    	    	    French: [
    	    	        {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
    	    	        {id: '2', name: 'textenfants_fr', value: 'textenfants_fr'},
    	    	        {id: '3', name: '', value: ''}
    	    	    ],
    	    	    Italian: [
    	    	        {id: '1', name: '', value: ''}
    	    	    ],
    	    	    Spanish: [
    	    	        {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'},
    	    	        {id: '2', name: '', value: ''}
    	    	    ]
    		 },
    		 lda: {
    			 	English: [
    					{id: '1', name: 'tasa_en', value: 'tasa_en'},
    		            {id: '2', name: 'tasa_lak_en', value: 'tasa_lak_en'},
    		            {id: '3', name: 'tasa_smart_cities_en', value: 'tasa_smart_cities_en'},
    		            {id: '4', name: '', value: ''}
    	            ],
    	            French: [
    		            {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
    		            {id: '2', name: 'textenfants_fr', value: 'textenfants_fr'},
    		            {id: '3', name: 'philosophy_fr', value: 'philosophy_fr'},
    		            {id: '4', name: '', value: ''}
    		        ],
    		        Italian: [
    	               {id: '1', name: 'paisa_it', value: 'paisa_it'},
    	               {id: '2', name: '', value: ''}
    	            ],	             
    	            Spanish: [
    	               {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'},
    	               {id: '2', name: '', value: ''}
    	            ]
    		 }      
    	},
    	defaultMetricOptions: {
			lsa: {
				English: {id: '1', name: 'tasa_en', value: 'tasa_en'},
				French: {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
				Italian: {id: '1', name: '', value: ''},
				Spanish: {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'}
			},
			lda: {
				English: {id: '1', name: 'tasa_en', value: 'tasa_en'},
				French: {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
				Italian: {id: '1', name: 'paisa_it', value: 'paisa_it'},
				esSpanish: {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'}
				
			}
		},
    	defaultSemanticSimilarityThreshold: 0.3
};
NavBarItems = [ {
	name : 'Home',
	href : '/'
}, {
	name : 'Demo',
	href : 'demo'
}, {
	name : 'People',
	href : 'people'
}, {
	name : 'Projects',
	href : 'projects'
}, {
	name : 'Publications',
	href : 'publications'
}, {
	name : 'Contact',
	href : 'contact'
} ];
Reviews = [
	{
		message : '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
		author : 'Adrian Sandu, ',
		title : 'Developer'
	},
	{
		message : '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
		author : 'Larise Stavarache, ',
		title : 'Developer'
	},
	{
		message : '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
		author : 'Mihai Dascalu, ',
		title : 'Developer'
	},
	{
		message : '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
		author : 'Razvan Marian Vlasceanu, ',
		title : 'Developer'
	},
	{
		message : '"Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedid quo minus id quos maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."',
		author : 'Andrei Marinete, ',
		title : 'UI/UX Designer'
	}, ];
BrowseItems = [ {
	title : 'Live Demo',
	description : 'See the live demonstration of the ReaderBench application.'
}, {
	title : 'People',
	description : 'Meet up the people who worked on the application.'
}, {
	title : 'Projects',
	description : 'Check the projects regarding the ReaderBench application.'
}, {
	title : 'Publications',
	description : 'See the publications done by the people from ReaderBench.'
} ];
PeoplePlaces = [ {
	name : 'Faculty of Automatic Control and Computers',
	picture : 'img/A&C-logo-EN-gradient.png'
}, {
	name : 'Ludwig Maximilians Unversity of Munchen',
	picture : 'img/2000px-LMU_Muenchen_Logo.svg.png'
}, {
	name : 'Learning Sciences Instutute - Arizona State University',
	picture : 'img/LSI ASU.jpg'
}, {
	name : 'Universite Pierre Mendes-France - Sciences Sociales & Humaines',
	picture : 'img/sigla_upmf.jpg'
}, {
	name : 'University "Politehnica" of Bucharest',
	picture : 'img/Sigla UPB.jpg'
} ];
PeopleUPB = [
	{
		name : 'Mihai Dascalu',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/mihai-dascalu-8a57ab10a',
		scholarlink : 'https://scholar.google.com/citations?user=3L9yY8UAAAAJ&hl=en',
		dblplink : 'http://dblp1.uni-trier.de/pers/hd/d/Dascalu:Mihai'
	},
	{
		name : 'Stefan Trausan-Matu',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/stefan-trausan-matu-9296707',
		scholarlink : 'https://scholar.google.com/citations?user=p_KpBToAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/t/Trausan=Matu:Stefan'
	},
	{
		name : 'Marius-Gabriel Gutu',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : '',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/g/Gutu:Gabriel=Marius'
	},
	{
		name : 'Stefan Ruseti',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/stefan-ruseti-97a011a1',
		scholarlink : 'https://scholar.google.com/citations?user=aEyJTykAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/r/Ruseti:Stefan'
	},
	{
		name : 'Ionut Paraschiv',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/ionut-paraschiv-9aa6875',
		scholarlink : '',
		dblplink : 'http://dblp1.uni-trier.de/pers/hd/p/Paraschiv:Ionut_Cristian'
	},
	{
		name : 'Lucia Larise Stavarache',
		picture : 'img/female.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : 'https://scholar.google.com/citations?user=do49nJAAAAAJ&hl=en',
		dblplink : 'http://dblp1.uni-trier.de/pers/hd/s/Stavarache:Larise_Lucia'
	},
	{
		name : 'Adrian Sandu',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/adrian-bogdan-sandu-87a84a6a',
		scholarlink : '',
		dblplink : ''
	},
	{
		name : 'Traian Rebedea',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://ro.linkedin.com/in/trebedea',
		scholarlink : 'https://scholar.google.com/citations?user=7NxaE1MAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/r/Rebedea:Traian'
	} ];
PeopleLSE = [
	{
		name : 'Philippe Dessus',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : 'https://scholar.google.com/citations?user=I-RoP1cAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/d/Dessus:Philippe'
	},
	{
		name : 'Maryse Bianco',
		picture : 'img/female.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : 'https://scholar.google.com/citations?user=jFYNe4UAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/b/Bianco:Maryse'
	},
	{
		name : 'Aurelie Nardy',
		picture : 'img/female.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : 'https://scholar.google.com/citations?user=6LYAdBIAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/n/Nardy:Aur=eacute=lie'
		} ];
PeopleLMU = [ {
	name : 'Nicolae Nistor',
	picture : 'img/male.jpg',
	area : 'Software Development',
	linkedin : '',
	scholarlink : 'https://scholar.google.com/citations?user=cNVq5HUAAAAJ&hl=en',
	dblplink : 'http://dblp.uni-trier.de/pers/hd/n/Nistor:Nicolae'
} ];
PeopleUSA = [
	{
		name : 'Danielle S. McNamara',
		picture : 'img/female.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : 'https://scholar.google.com/citations?user=NOxLJQUAAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/m/McNamara:Danielle_S='
	},
	{
		name : 'Scott Crossley',
		picture : 'img/male.jpg',
		area : 'Software Development',
		linkedin : 'https://www.linkedin.com/in/scott-crossley-1bb07b5b',
		scholarlink : 'https://scholar.google.com/citations?user=PDzqXW4AAAAJ&hl=en',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/c/Crossley:Scott_A='
	}, {
		name : 'Laura V. Allen',
		picture : 'img/female.jpg',
		area : 'Software Development',
		linkedin : '',
		scholarlink : '',
		dblplink : 'http://dblp.uni-trier.de/pers/hd/a/Allen:Laura'
	} ];
Projects = [
	{
		title : 'RAGE',
		link : 'http://rageproject.eu/',
		description : 'RAGE aims to develop, transform and enrich advanced technologies from the leisure games industry into self-contained gaming assets (i.e. solutions showing economic value potential) that support game studios at developing applied games easier, faster and more cost-effectively. These assets will be available along with a large volume of high-quality knowledge resources through a self-sustainable Ecosystem, which is a social space that connects research, gaming industries, intermediaries, education providers, policy makers and end-users. RAGE â€“ Realising an Applied Gaming Eco-system,  is a 48-months Technology and Know-How driven Research and Innovation project co-funded by EU Framework Programme for Research and Innovation, Horizon 2020.',
		category : 'Horizon 2020',
		image : 'images/rage_logo.png',
		imageDescription : 'Delivering access to advanced gaming technology resources and state-of-the-art knowledge to develop Applied Games easier, faster and more cost-effectively'
	},
	{
		title : 'Language Technologies for Lifelong Learning',
		link : 'http://www.ltfll-project.org/',
		description : 'The outcomes of the LTfLL project are prototypes of next-generation services built on advanced research on the application of language technologies in education. Their exploitation to a consumer market requires some further development (on usability, transferability to other domains and other learning environments, etc.).The target groups (as targeted people) of the LTfLL outcomes can be grouped in three: Researchers and developers, Content service providers and End-users of the LTfLL services. The LTfLL project is partially supported/co-funded by the European Union under the Information and Communication Technologies (ICT) theme of the 7th Framework Programme for R&D (FP7-ICT-2007-1-4.1)',
		category : 'Information and Communication Technologies',
		image : 'images/ltfll-logo3.png',
		imageDescription : 'Finding new innovative ways to tackle this newest challenge is one of the ambitions of the â€˜Language Technologies for Lifelong Learningâ€™ project (LTfLL). Its two baseline objectives are: (a) helping people learn, and, (b) helping tutors/teachers to support learners.'
	} ];
AboutSections = [
	{
		title : 'ReaderBench',
		description : 'ReaderBench is an automated software framework designed to support both students and tutors by making use of text mining techniques, advanced natural language processing, and social network analysis tools. ReaderBench is centered on comprehension prediction and assessment based on a cohesion-based.representation of the discourse applied on different sources (e.g., textual materials, behavior tracks, metacognitive explanations, Computer Supported Collaborative Learning - CSCL - conversations). Therefore, Readerâ€ Bench can act as a Personal Learning Environment (PLE) which incorporates both individual and collaborative assessments. Besides the a priori evaluation of textual materialsâ€™ complexity presented to learners, our system supports the identification of reading strategies evident within the learnersâ€™ self-explanations or summaries. Moreover, ReaderBench integrates a dedicated cohesion-based module to assess participation and collaboration in CSCL conversations.'
	},
	{
		title : "ReaderBench's Purpose",
		description : 'Designed as support for both tutors and students, our implemented system, ReaderBench, can be best described as an educational learning helper tool to enhance the quality of the learning process. ReaderBench is a fully functional framework that enhances learning using various techniques such as textual complexity assessment, voice modeling for CSCL discourse analysis, topics modeling using Latent Semantic Analysis and Latent Dirichlet Allocation, and virtual communities of practice analysis.Our system was developed building upon indices provided in renowned systems such as E-rater, iSTART, and Coh-Metrix. However, ReaderBench provides an integration of these systems. ReaderBench includes multi-lingual comprehensioncentered analyses focused on semantics, cohesion and dialogism. For tutors, ReaderBench provides (a) the evaluation of reading materialâ€™s textual complexity, (b) the measurement of social collaboration within a group endeavors, and (c) the evaluation of learnersâ€™ summaries and self-explanations. For learners, ReaderBench provides (a) the improvement of learning capabilities through the use of reading strategies, and (b) the evaluation of studentsâ€™ comprehension levels and performance with respect to other students. ReaderBench maps directly onto classroom education, combining individual learning methods with Computer Supported Collaborative Learning (CSCL) techniques.'
	} ];
Publications = [
	{
		title : 'Nicolae Nistor, Stefan Trausan-Matu, Mihai Dascalu, Heather Duttweiler, Costin-Gabriel Chiru, Beate Baltes, George Smeaton: Finding student-centered open learning environments on the internet: Automated dialogue assessment in academic virtual communities of practice. Computers in Human Behavior 47: 119-127',
		year : '2015'
	},
	{
		title : 'Mihai Dascalu, Stefan Trausan-Matu, Danielle S. McNamara, Philippe Dessus: ReaderBench: Automated evaluation of collaboration based on cohesion and dialogism. I. J. Computer-Supported Collaborative Learning 10(4): 395-423',
		year : '2015'
	},
	{
		title : "Mihai Dascalu, Larise Lucia Stavarache, Philippe Dessus, Stefan Trausan-Matu, Danielle S. McNamara, Maryse Bianco: Predicting Comprehension from Students' Summaries. AIED 2015: 95-104",
		year : '2015'
	},
	{
		title : 'Nicolae Nistor, Mihai Dascalu, Larise Lucia Stavarache, Yvonne Serafin, Stefan Trausan-Matu: Informal Learning in Online Knowledge Communities: Predicting Community Response to Visitor Inquiries. EC-TEL 2015: 447-452',
		year : '2015'
	},
	{
		title : 'Mihai Dascalu, Larise Lucia Stavarache, Philippe Dessus, Stefan Trausan-Matu, Danielle S. McNamara, Maryse Bianco: ReaderBench: An Integrated Cohesion-Centered Framework. EC-TEL 2015: 505-508',
		year : '2015'
	},
	{
		title : 'Mihai Dascalu, Stefan Trausan-Matu, Philippe Dessus, Danielle S. McNamara: Discourse cohesion: a signature of collaboration. LAK 2015: 350-354',
		year : '2015'
	},
	{
		title : 'Mihai Dascalu:Analyzing Discourse and Text Complexity for Learning and Collaborating - A Cognitive Approach Based on Natural Language Processing. Studies in Computational Intelligence 534, Springer 2014, ISBN 978-3-319-03418-8, pp. 1-228',
		year : '2014'
	},
	{
		title : 'Nicolae Nistor, Beate Baltes, Mihai Dascalu, Dan Mihaila, George Smeaton, Stefan Trausan-Matu: Participation in virtual academic communities of practice under the influence of technology acceptance and community factors. A learning analytics application. Computers in Human Behavior 34: 339-344',
		year : '2014'
	},
	{
		title : 'Stefan Trausan-Matu, Mihai Dascalu, Traian Rebedea:PolyCAFe - automatic support for the polyphonic analysis of CSCL chats. I. J. Computer-Supported Collaborative Learning 9(2): 127-156',
		year : '2014'
	},
	{
		title : 'Carlo Giovannella, Mihai Dascalu, Federico Scaccia:Smart City Analytics: state of the art and future perspectives. IxD&A 20: 72-87',
		year : '2014'
	},
	{
		title : 'Mihai Dascalu, Philippe Dessus, Nicolae Nistor, Stefan Trausan-Matu: Preface. IxD&A 22',
		year : '2014'
	},
	{
		title : 'Ambar Murillo Montes de Oca, Nicolae Nistor, Mihai Dascalu, Stefan Trausan-Matu: Designing Smart Knowledge Building Communities. IxD&A 22: 9-21',
		year : '2014'
	},
	{
		title : 'Radu-Ioan Ciobanu, Ciprian Dobre, Mihai Dascalu, Stefan Trausan-Matu, Valentin Cristea: SENSE: A collaborative selfish node detection and incentive mechanism for opportunistic networks. J. Network and Computer Applications 41: 240-249',
		year : '2014'
	},
	{
		title : 'Ionut Cristian Paraschiv, Mihai Dascalu, Stefan Trausan-Matu: Voice Control Framework for Form Based Applications. AIMSA 2014: 222-227',
		year : '2014'
	},
	{
		title : 'Mihai Dascalu, Larise Lucia Stavarache, Stefan Trausan-Matu, Philippe Dessus, Maryse Bianco: Reflecting Comprehension through French Textual Complexity Factors. ICTAI 2014: 615-619',
		year : '2014'
	},
	{
		title : 'Mihai Dascalu, Stefan Trausan-Matu, Philippe Dessus: Validating the Automated Assessment of Participation and of Collaboration in Chat Conversations. Intelligent Tutoring Systems 2014: 230-235',
		year : '2014'
	},
	{
		title : 'Mihai Dascalu, Philippe Dessus, Maryse Bianco, Stefan Trausan-Matu: Are Automatically Identified Reading Strategies Reliable Predictors of Comprehension? Intelligent Tutoring Systems 2014: 456-465',
		year : '2014'
	},
	{
		title : 'Mihai Dascalu, Philippe Dessus, Stefan Trausan-Matu, Maryse Bianco, AurÃ©lie Nardy: ReaderBench, an Environment for Analyzing Text Complexity and Reading Strategies. AIED 2013: 379-388',
		year : '2013'
	},
	{
		title : 'Cecilie Hansen, ValÃ©rie Emin, Barbara Wasson, Yishay Mor, MarÃ­a JesÃºs RodrÃ­guez-Triana, Mihai Dascalu, Rebecca Ferguson, Jean-Philippe Pernin: Towards an Integrated Model of Teacher Inquiry into Student Learning, Learning Design and Learning Analytics. EC-TEL 2013: 605-606',
		year : '2013'
	},
	{
		title : 'Nicolae Nistor, Mihai Dascalu, Stefan Trausan-Matu, Dan Mihaila, Beate Baltes, George Smeaton: Virtual Communities of Practice in Academia: Automated Analysis of Collaboration Based on the Social Knowledge-Building Model. EC-TEL 2013: 623-624',
		year : '2013'
	},
	{
		title : "Mihai Dascalu, Stefan Trausan-Matu, Philippe Dessus: Voices' inter-animation detection with readerbench modelling and assessing polyphony in CSCL chats as voice synergy. ICSCS 2013: 280-285",
		year : '2013'
	},
	{
		title : 'Radu-Ioan Ciobanu, Ciprian Dobre, Mihai Dascalu, Stefan Trausan-Matu, Valentin Cristea: Collaborative selfish node detection with an incentive mechanism for opportunistic networks. IM 2013: 1161-1166',
		year : '2013'
	},
	{
		title : 'Diana Lupan, Mihai Dascalu, Stefan Trausan-Matu, Philippe Dessus: Analyzing Emotional States Induced by News Articles with Latent Semantic Analysis. AIMSA 2012: 59-68',
		year : '2012'
	},
	{
		title : 'Stefan Trausan-Matu, Mihai Dascalu, Traian Rebedea:A System for the Automatic Analysis of Computer-Supported Collaborative Learning Chats. ICALT 2012: 95-99',
		year : '2012'
	},
	{
		title : 'Mihai Dascalu, Stefan Trausan-Matu, Philippe Dessus: Towards an Integrated Approach for Evaluating Textual Complexity for Learning Purposes. ICWL 2012: 268-278',
		year : '2012'
	},
	{
		title : 'Stefan Trausan-Matu, Mihai Dascalu, Philippe Dessus: Textual Complexity and Discourse Structure in Computer-Supported Collaborative Learning. ITS 2012: 352-357',
		year : '2012'
	},
	{
		title : 'Mihnea Donciu, Madalina Ionita, Mihai Dascalu, Stefan Trausan-Matu: Ant Colony Optimisation for Automatically Populating Ontologies with Individuals. SYNASC 2012: 227-232',
		year : '2012'
	},
	{
		title : 'Cristian Bancu, Monica Dagadita, Mihai Dascalu, Ciprian Dobre, Stefan Trausan-Matu, Adina Magda Florea: ARSYS - Article Recommender System. SYNASC 2012: 349-355',
		year : '2012'
	},
	{
		title : "Constantin Daniil, Mihai Dascalu, Stefan Trausan-Matu: Automatic forum analysis: a thorough method of assessing the importance of posts, discussion threads and of users' involvement. WIMS 2012: 37:1-37:9",
		year : '2012'
	},
	{
		title : 'Traian Rebedea, Mihai Dascalu, Stefan Trausan-Matu, Gillian Armitt, Costin-Gabriel Chiru: Automatic Assessment of Collaborative Chat Conversations with PolyCAFe. EC-TEL 2011: 299-312',
		year : '2011'
	},
	{
		title : 'Mihai Dascalu, Ciprian Dobre, Stefan Trausan-Matu, Valentin Cristea: Beyond Traditional NLP: A Distributed Solution for Optimizing Chat Processing - Automatic Chat Assessment Using Tagged Latent Semantic Analysis. ISPDC 2011: 133-138',
		year : '2011'
	},
	{
		title : 'Mihnea Donciu, Madalina Ionita, Mihai Dascalu, Stefan Trausan-Matu:The Runner - Recommender System of Workout and Nutrition for Runners. SYNASC 2011: 230-238',
		year : '2011'
	},
	{
		title : 'Mihai Dascalu, Traian Rebedea, Stefan Trausan-Matu: A Deep Insight in Chat Analysis: Collaboration, Evolution and Evaluation, Summarization and Search. AIMSA 2010: 191-200',
		year : '2010'
	},
	{
		title : 'Traian Rebedea, Mihai Dascalu, Stefan Trausan-Matu, Dan Banica, Alexandru Gartner, Costin-Gabriel Chiru, Dan Mihaila:Overview and Preliminary Results of Using PolyCAFe for Collaboration Analysis and Feedback Generation. EC-TEL 2010: 420-425',
		year : '2010'
	},
	{
		title : 'Mihai Dascalu, Erol-Valeriu Chioasca, Stefan Trausan-Matu: ASAP- An Advanced System for Assessing Chat Participants. AIMSA 2008: 58-68',
		year : '2008'
	} ];
DemoTexts = {
	// Text Processing
	textProcessing : {
		title: 'Text Processing',
		text : 'RAGE aims to develop, transform and enrich advanced technologies from the leisure games industry into self-contained gaming assets (i.e. solutions showing economic value potential) that support game studios at developing applied games easier, faster and more cost-effectively. These assets will be available along with a large volume of high-quality knowledge resources through a self-sustainable Ecosystem, which is a social space that connects research, gaming industries, intermediaries, education providers, policy makers and end-users. RAGE – Realising an Applied Gaming Eco-system,  is a 48-months Technology and Know-How driven Research and Innovation project co-funded by EU Framework Programme for Research and Innovation, Horizon 2020.'
				+ String.fromCharCode(13)
				+ 'The EU based industry for non-leisure games – Applied Games – is an emerging business with multiple uses in industry, education, health and the public administration sectors. As such, it is still fragmented and needs critical mass to compete globally. Nevertheless its growth potential is widely recognised and even suggested to exceed the growth potential of the leisure games market.'
				+ String.fromCharCode(13)
				+ 'The gaming technology assets gathered along the project lifecycle will be tested and evaluated by gaming companies integrated in the RAGE consortium. These companies will be creating games that will be empirically validated in real world pilots in different application scenarios representing different markets and target groups for the Applied Games industry.',
		conceptMapTitle : 'Concept Map'
	},
	// Semantic Annotation
	semanticAnnotation : {
		title: 'Semantic Annotation',
		abstractText : 'Interactive virtual environments (IVEs) are now seen as an '
				+ 'engaging new way by which children learn experimental sciences and '
				+ 'other disciplines. These environments are populated by synthetic characters '
				+ 'that guide and stimulate the children activities. In order to build '
				+ 'such environments, one needs to address the problem of how achieve believable '
				+ 'lievable and empathic characters that act autonomously. Inspired by the '
				+ 'work of traditional character animators, this paper proposes an architectural '
				+ 'model to build autonomous characters where the agentâ€™s reasoning '
				+ 'and behaviour is influenced by its emotional state and personality. We '
				+ 'performed a small case evaluation in order to determine if the characters '
				+ 'evoked empathic reactions in the users with positive results.',
		keywords : 'interactive virtual environment, emotional characters, empathic reactions',
		conceptMapTitle : 'Concept Map'
	},
	// Self Explanation (Reading Strategies)
	selfExplanation : {
		title: 'Self Explanation',
		language: DemoElements.languages[1], // fr
		text : 'Ce soir-là, la famille de Matilda dînait comme d\'habitude devant la télévision. Ils entendirent une voix forte venant du salon dire : « salut, salut, salut ».'
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
		explanation : 'au début c\'est une famille de riches qui mangent et puis ils entendent une phrase avec une voix grave salut salut. Donc les parents commencent à avoir peur. Donc la mère de la fille elle croit que c\'est un voleur qui vient leur voler leur argent leur argenterie. Et du coup elle dit au père d\'y aller mais il veut pas donc ils y vont tous ensemble. Et la fille elle joue bien la comédie parce que ça redit salut salut salut et elle commence à sursauter. Et puis un moment elle leur raconte l\'histoire de fantômes donc ils y croient. Et puis au bout d\'un moment elle arrête la plaisanterie en allant chercher le perroquet qu\'elle avait mis au-dessus de la cheminée qu\'elle avait emprunté à son copain Arthur. Et du coup ben ils eurent plus jamais de fantômes chez eux. C\'était juste pour jouer un tour à ses parents.'
	},
	csclProcessing : {
		title: 'CSCL',
		conversationFile : 'corpus_v2/Beizadea_352C2_in.xml',
		participantInteractionTitle : 'Participant Interaction',
		participantEvolutionTitle : 'Participant Evolution',
		collaborationSocialKB : 'Collaboration - Social KB',
		collaborationVoiceOverlapTitle : 'Collaboration - Voice Overlap'
	},
	cvCover : {
		title: 'CV & Cover',
		language: DemoElements.languages[1] // fr
	},
	cv: {
		title: 'CV',
		keywords: 'prospection, prospect, développement, clients, fidélisation, chiffred’affaires, marge, vente, portefeuille, négociation, budget, rendez-vous, proposition, terrain, téléphone, rentabilité, business, reporting, veille, secteur, objectifs, comptes, animation, suivi, création, gestion',
		language: DemoElements.languages[1] // fr
	}
};