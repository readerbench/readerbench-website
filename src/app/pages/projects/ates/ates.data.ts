export let AtesData = {
    title: 'Automated Text Evaluation and Simplification',
    shortname: 'ATES',
    link: 'projects/atest',
    period: 'Oct 2020 - Sep 2022',
    description: 'The project wants to enable writers to improve the quality of their writing, in both English and Romanian languages, with immediate feedback when typing the input text through personalized recommendations and highlights of different text elements that can be improved',
    abstract: [
        'Writing is an essential learning activity that requires both practice and experience. Writing is performed in academic environments, at workspaces, or for personal purposes, and people\'s ability to clearly and concisely express their ideas in a coherent manner is an essential skill, difficult to both evaluate and improve.',
        'ATES (Automated Text Evaluation and Simplification) aims to help users improve the quality of their writing, in both English and Romanian languages, by providing immediate feedback, tailored to their writing style.',
        'Complex Natural Language Processing techniques, including deep learning models, will be used to automatically score essays relying on textual complexity indices, together with word embeddings, applied on annotated datasets of documents.',
        'In addition, textual complexity indices, combined with various features of the cohesion graph, will trigger rules to improve the text by comparison to baseline domain-specific documents.',
        'The system will also make suggestions for text simplification in order to improve its readability. For this matter, machine translation models will be trained on existing text simplification datasets, augmented with paraphrases, and ordered by readability scores.',
        'Moreover, the overall complexity of the text will be measured by automatically computing word Age of Acquisition (AoA) scores through incremental semantic models and regression analyses, in order to approximate the age when people adequately learn a word’s meaning.'
    ],
    objective: [
        'The general objective of the ATES (Automated Text Evaluation Simplification) project is to enable writers to improve the quality of their writing, in both English and Romanian languages.',
        'Writers will receive immediate feedback when typing the input text through personalized recommendations and highlights of different text elements that can be improved with an easy-to-use and intuitive user interface.',
        'The system will automatically evaluate the texts and provide guidance and instructions to allow users to adjust them accordingly to the targeted audience (e.g., belletristic, scientific writing styles), through text adjustments and simplification mechanisms.',
        'Our aim is to increase the reading ease of resulted materials and to incrementally refine the user\'s writing style, transcending towards a higher writing proficiency.',
        'This objective will consider multiple experiments performed towards assessing text difficulty, before and after any automated adjustments are made.'
    ],
    aoe: [
        'Age of Acquisition (AoA) is a measure of word complexity which refers to the age at which a word is typically learned. AoA measures have shown strong correlations with reading comprehension, lexical decision times, and writing quality. AoA scores based on both adult and child data have limitations that allow for error in measurement, and increase the cost and effort to produce.',
        'We introduce Age of Exposure (AoE) version 2, a novel method of expanding AoA word lists through training regressors to predict AoA scores. Word2vec word embeddings are trained on cumulatively increasing corpora of texts and are then used to generate word exposure trajectories by aligning the word2vec vector spaces. This method was used as a proxy for human exposure to new vocabulary terms in order to generate features of words that were then used to model the AoA scores. In addition, multiple regression models were trained to learn and generalize AoA word lists across multiple languages including English, German, French, and Spanish. Our approach allows for the estimation of AoA scores for words that are not found in the original lists, up to the majority of the target language’s vocabulary. Our method can be uniformly applied across multiple languages though the usage of parallel corpora and helps bridge the gap in the size of AoA word lists available for non-English languages. This effort is particularly important for efforts toward extending AI to languages with fewer resources and benchmarked corpora.'
    ],
    aes: [
        'Designing learning materials tailored for each individual’s level of understanding is a challenging and arguably a crucial task, especially for students in earlier grades. Linguists underpinned a potential problem in educational systems related to a proper presentation of materials in increasing order of difficulty to learners; however, manual assessments are time-consuming and may be subject to conflicting points of view. We introduce an adaptation of the open source ReaderBench framework that now supports multilevel analyses of text characteristics, while integrating both textual complexity indices and state-of-the-art language models, namely BERT.'
    ],
    ts: [
        'A key writing skill is the capability to clearly convey desired meaning using available linguistic knowledge. Consequently, writers must select from a large array of idioms, vocabulary terms that are semantically equivalent, and discourse features that simultaneously reflect content and allow readers to grasp meaning. In many cases, a simplified version of a text is needed to ensure comprehension on the part of a targeted audience (e.g., second language learners). To address this need, we propose an automated method to simplify texts based on paraphrasing. Specifically, we explore the potential for a deep learning model, previously used for machine translation, to learn a simplified version of the English language within the context of short phrases. The best model based on a Transformer architecture achieves a BLEU score of 64.71. We also evaluate this model’s capability to perform similar transformation to texts that were simplified by human experts at different levels.'
    ],
    team: [
        {
            name: 'Mihai Dascalu',
            picture: 'img/male.jpg',
            area: 'Software Development',
            linkedin: 'https://www.linkedin.com/in/mihai-dascalu-8a57ab10a',
            scholarlink: 'https://scholar.google.com/citations?user=3L9yY8UAAAAJ&hl=en',
            dblplink: 'http://dblp1.uni-trier.de/pers/hd/d/Dascalu:Mihai',
            researchgate: 'https://www.researchgate.net/profile/Mihai_Dascalu'
        },
        {
            name: 'Stefan Ruseti',
            picture: 'img/male.jpg',
            area: 'Software Development',
            linkedin: 'https://www.linkedin.com/in/stefan-ruseti-97a011a1',
            scholarlink: 'https://scholar.google.com/citations?user=aEyJTykAAAAJ&hl=en',
            dblplink: 'http://dblp.uni-trier.de/pers/hd/r/Ruseti:Stefan',
            researchgate: 'https://www.researchgate.net/profile/Stefan_Ruseti'
        },
        {
            name: 'Dragos Corlatescu',
            picture: 'img/male.jpg',
            area: 'Software Development',
            linkedin: 'https://www.linkedin.com/in/dragos-corlatescu-0b815a78',
            scholarlink: 'https://scholar.google.com/citations?user=rfr85cYAAAAJ&hl=en',
            dblplink: 'https://dblp.uni-trier.de/pers/hd/c/Corlatescu:Dragos',
            researchgate: 'https://www.researchgate.net/profile/Dragos_Georgian_Corlatescu'
        },
        {
            name: 'Gabriel Gutu-Robu*',
            tooltip: 'Withdrawn from the project',
            picture: 'img/male.jpg',
            area: 'Software Development',
            linkedin: 'https://www.linkedin.com/in/gabrielgutu',
            scholarlink: 'https://scholar.google.com/citations?user=-pGqq7QAAAAJ&hl=en',
            dblplink: 'http://dblp.uni-trier.de/pers/hd/g/Gutu:Gabriel=Marius',
            researchgate: 'https://www.researchgate.net/profile/Gabriel_Gutu'
        },
        {
            name: 'Irina Toma*',
            tooltip: 'Withdrawn from the project',
            picture: 'img/male.jpg',
            area: 'Software Development',
            linkedin: 'https://www.linkedin.com/in/irina-toma-b51146151/',
            scholarlink: 'https://scholar.google.com/citations?user=tJ8GnRUAAAAJ&hl=en',
            dblplink: 'http://dblp.uni-trier.de/pers/hd/t/Toma:Irina',
            researchgate: 'https://www.researchgate.net/profile/Irina_Toma'
        }
    ],
    activities: [
        {
            name: 'A1. Gather relevant datasets',
            status: 'Completed \n(Phase 1)'
        },
        {
            name: 'A2. Build multi-lingual automated AoA models',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A2.1. Create baseline English model',
            status: 'Completed (Phase 1)'
        },
        {
            name: 'A2.2. Train AoA models for additional languages',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A2.3. Bridge word learning rates modeled by automated AoA scores across languages',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A3. Automated Essay Scoring',
            status: 'Ongoing'
        },

        {
            name: 'A3.1. Train models that combine ReaderBench textual complexity indices with word embeddings',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A3.2. Assess multi-lingual AES models',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A3.3. Develop and deploy a dedicated service that takes as input a collection of documents and their scores and establishes the most predictive model',
            status: 'To be started (Phase 3)'

        },
        {
            name: 'A4. Automated Writing Evaluation',
            status: 'To be started (Phase 3)'
        },
        {
            name: 'A4.1. Run experiments on paragraph restructuring',
            status: 'To be started (Phase 3)'
        },
        {
            name: 'A4.2. Generate rules for a given domain based on textual complexity indices and PCA components to provide feedback',
            status: 'To be started (Phase 3)'
        },
        {
            name: 'A4.3. Detect out-of-place phrases',
            status: 'To be started (Phase 3)'

        },
        {
            name: 'A5. Text simplification',
            status: 'Ongoing'
        },
        {
            name: 'A5.1. Prepare datasets consisting of proper alignments',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A5.2. Train multiple sequence-to-sequence models',
            status: 'Completed (Phase 2)'
        },
        {
            name: 'A5.3. Analyze results and iteratively improve methods',
            status: 'To be started (Phase 3)'

        },
        {
            name: 'A6. Dissemination of results',
            status: 'Ongoing'
        }
    ],
    phases: [
        { id: 'Phase 1 – 2020', title: 'Gather relevant datasets' },
        { id: 'Phase 2 – 2021', title: 'Development of services for automatic essay scoring (O1), text simplification (O3), and prediction of AoA scores at word level (O4) - initial version' },
        { id: 'Phase 3 – 2022', title: 'Development of automatic essay scoring services (O1), automate writing evaluation (O2), text simplification (O3), and prediction of AoA scores at word level (O4) - final version' }
    ],
    publications: {
        journals: [
            'Dascalu, M.-D., Ruseti, S., Dascalu, M., McNamara, D. S., Carabas, M., Rebedea, T., & Trausan-Matu, S. (2021). Before and during COVID-19: A Cohesion Network Analysis of Students’ Online Participation in Moodle Courses. Computers in Human Behavior, 121. (Q1 journal, WOS:000651382100007, IF: 6,829)',
            'Nicula, B., Dascalu, M., Newton, N., Orcutt, E., & McNamara, D. S. (2021). Automated Paraphrase Quality Assessment using Language Models and Transfer Learning. Computers, 10(12).',
            'Botarleanu, R.-M., Dascalu, M., Watanabe, M., Crossley, S. A., & McNamara, D. S. (submitted). Age of Exposure 2.0: Estimating Word Complexity using Iterative Models of Word Embeddings. Behavior Research Methods. (Q1 journal, IF: 6,242)',
            'Corlatescu, D., Ruseti, S., & Dascalu, M. (submitted). ReaderBench Learns Russian: Multilevel Analysis of Russian Text Characteristics. Russian Journal of Linguistics. (Q1 journal)',
            'Masala, M., Ruseti, S., Rebedea, T., Dascalu, M., Gutu-Robu, G., & Trausan-Matu, S. (submitted). Identifying the Structure of CSCL Conversations using String Kernels. Mathematics. (Q1 journal, IF: 2,258)'
        ],
        conferences: [
            'Botarleanu, R.-M., Dascalu, M., Watanabe, M., McNamara, D. S., & Crossley, S. A. (2021). Multilingual Age of Exposure. In 22nd Int. Conf. on Artificial Intelligence in Education (AIED 2021) (pp. 77–87). Utrech, Netherlands (Online): Springer. (Category A conference in accordance to CORE Ranking)',
            'Masala, M., Ruseti, S., Dascalu, M., & Dobre, C. (2021). Extracting and Clustering Main Ideas from Student Feedback using Language Models. In 22nd Int. Conf. on Artificial Intelligence in Education (AIED 2021) (pp. 282–292). Utrech, Netherlands (Online): Springer. (Category A conference in accordance to CORE Ranking)',         
            'Ruseti, S., Dascalu, M.-D., Corlatescu, D.-G., Dascalu, M., Trausan-Matu, S., & McNamara, D. S. (2021). Exploring Dialogism using Language Models. In 22nd Int. Conf. on Artificial Intelligence in Education (AIED 2021) (pp. 296–301). Utrech, Netherlands (Online): Springer. (Category A conference in accordance to CORE Ranking)',
            'Corlatescu, D.-G., Dascalu, M., & McNamara, D. S. (2021). Automated Model of Comprehension v2.0. In 22nd Int. Conf. on Artificial Intelligence in Education (AIED 2021) (pp. 119–123). Utrech, Netherlands (Online): Springer. (Category A conference in accordance to CORE Ranking)',
            'Niculescu, M., Ruseti, S., & Dascalu, M. (2021). RoGPT2: Romanian GPT2 for Text Generation. In 33rd Int. Conf. on Tools with Artificial Intelligence (ICTAI 2021). Washington DC, USA (Online): IEEE. (Category B conference in accordance to CORE Ranking)',
            'Nicula, B., Dascalu, M., Newton, N., Orcutt, E., & McNamara, D. S. (2021). Automated Paraphrase Quality Assessment using Recurrent Neural Networks and Language Models. In 17th Int. Conf. on Intelligent Tutoring Systems (ITS 2021) (pp. 321–328). Athens, Greece (Online): Springer. (Category B conference in accordance to CORE Ranking)',
            'Botarleanu, R.-M., Dascalu, M., Allen, L. K., Crossley, S. A., & McNamara, D. S. (2021). Automated Summary Scoring with ReaderBench. In 17th Int. Conf. on Intelligent Tutoring Systems (ITS 2021) (pp. 310–320). Athens, Greece (Online): Springer. (Category B conference in accordance to CORE Ranking)',
            'Ionita, R. F., Corlatescu, D.-G., Dascalu, M., & McNamara, D. S. (2021). Predicting the Global Impact of Authors from the Learning Analytics Community – A Case Study grounded in CNA. In 23rd Conference on Control Systems and Computer Science (pp. 439–446). Bucharest, Romania (Online): IEEE.',
            'Dascalu, M.-D., Ruseti, S., Dascalu, M., McNamara, D. S., & Trausan-Matu, S. (2021). Dialogism Meets Language Models for Evaluating Involvement in CSCL Conversations. In 6th Int. Conf. on Smart Learning Ecosystems and Regional Development (SLERD 2021) (pp. 67–78). Bucharest, Romania (Online): Springer.',
            'Corlatescu, D.-G., Ruseti, S., & Dascalu, M. (2021). Romanian Syllabification using Deep Neural Networks. In 6th Int. Conf. on Smart Learning Ecosystems and Regional Development (SLERD 2021) (pp. 93–102). Bucharest, Romania (Online): Springer.'
        ]
    },
    category: 'Physical Sciences and Engineering',
    categoryAcronym: 'NLP',
    image: 'assets/images/projects/ates_700x418.jpg',
    imageDescription: 'Automated text evaluation for tutors and learners',
    logo: 'assets/images/projects/ates_100x100.jpg',
    logoDescription: 'Automated text evaluation for tutors and learners',
    fullWidthImage: 'assets/images/projects/ates_1995x392.jpg',
    uefiscdiImage: 'assets/images/projects/uefiscdi_330x200.png',
}
