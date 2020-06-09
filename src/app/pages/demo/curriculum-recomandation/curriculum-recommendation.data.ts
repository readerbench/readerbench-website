import {DefaultInputData} from '../demo.component.data';

export let CurriculumRecommendationData = {
    'serviceName': 'curriculumRecommendation',
    'componentTitle': 'Curriculum Recommendation',
    'expertise': [
        {
            name: 'Medicine',
            value: 'medicine',
            checked: false,
            id: 1
        },
        {
            name: 'Paediatrics',
            isChild: true,
            value: 'paediatrician',
            checked: false,
            id: 2
        },
        {
            name: 'Obstetrics / Gynocology',
            isChild: true,
            value: 'gynocologist',
            checked: false,
            id: 3
        },
        {
            name: 'General Practice / Family Medicine',
            isChild: true,
            value: 'gp',
            checked: false,
            id: 4
        },
        {
            name: 'Specialist Other Areas',
            isChild: true,
            value: 'other',
            checked: false,
            id: 5
        },
        {
            name: 'Nursing / Midwifery',
            value: 'nursing',
            checked: false,
            id: 6
        },
        {
            name: 'Nutrition / Dietetics',
            value: 'nutrition',
            checked: false,
            id: 7
        },
        {
            name: 'Other Healthcare Workers',
            value: 'other',
            checked: false,
            id: 8
        },
        {
            name: 'Student / Trainee',
            value: 'student',
            checked: false,
            id: 9
        }
    ],
    'themes': [
        {
            name: 'Background',
            value: 'science',
            checked: false
        },
        {
            name: 'Practice & Counselling',
            value: 'practice',
            checked: false
        },
        {
            name: 'Guidelines',
            value: 'guidelines',
            checked: false
        }
    ],
    'defaultText': 'Incorrect formula preparation can have serious medical ' +
        'consequences for the infant and it is essential that parents and caregivers ' +
        'follow the manufacturer’s instructions when preparing formula.' +
        'If the formula is too dilute this may result in insufficient intake of calories and nutrients. \n' +
        'If the formula is too concentrated it may lead to dehydration, ' +
        'diarrhea and excessive intake of calories which can result in overweight or obesity.\n\n ' +
        ' In severe cases hypernatremic dehydration may result. ' +
        'This lesson offers a practical case study on hypernatremic dehydration, or hypernatremia' +
        ' induced by inappropriate infant feeding with cow’s milk is presented. ' +
        'Risk factors and clinical parameters for diagnosis arediscussed' +
        ' as well as treatment of hypernatremic dehyration.',
    'keywords': [
        {
        key: 'pregnancy',
        value: 'Pregnancy',
        children: [
                'Fetal Growth & Development',
                'Maternal physiology',
                'Gestational Weight Gain',
                'Undernutrition & underweight',
                'Metabolic changes & adaptations during pregnancy',
                'Physiology',
                'Fetus & Placenta, maternal-fetal interface',
                'Placental-fetal transfer of micronutrients',
                'Maternal underweight',
                'Nutrient requirements /reference nutrient intake',
                'Nutritional myths & diet restrictions',
                'Healthy diet',
                'Micronutrient deficiency & supplementation',
                'Vitamins',
                'Minerals',
                'Foodborne Infection',
                'Listeriosis, salmonellosis, Toxoplasmosis, Hepatitis A, Cholera',
                'Physical Activity',
                'Exercise/sports',
                'Alcohol',
                'Smoking/tobacco exposure',
                'Coffee/caffeine',
                'Stress/relaxation',
                'Maternity leave',
                'Medication & drugs',
                'Environmental Pollutants, pesticides & heavy metals',
                'Long term outcomes',
                'Child insulin resistance & metabolism',
                'Obesity & overweight',
                'Supportive interventions',
                'Overweight & obesity',
                'Diabetes & gestational diabetes ',
                'Pregnancy complications',
                'Macrosomia',
                'Nausea & vomiting',
                'Hyperemesis gravidarum',
                'Eating disorders',
                'Anorexia, bulimia & binge eating disorders',
            ]
        },
        {
            key: 'breastfeeding',
            value: 'Breastfeeding',
            children: [
                'Maternal Nutrition',
                'Lactation process & neuroendocrine pathway of milk secretion',
                'Macronutrients',
                'Micronutrients',
                'Milk bioactive factors',
                'Breastfeeding practice & nursing',
                'Expressed breast milk',
                'Practical aspects of feeding',
                'Obesity',
                'Diabetes',
                'Childhood diarrhea',
                'Cognitive development',
                'Mother-infant bonding',
                'Child health & disease',
                'Long term outcomes',
                'Maternal health',
                'Health benefits of breastfeeding',
                'Epidemiology & demographics',
                'Barriers & challenges to exclusive or continued breastfeeding',
                'Contraindications to breastfeeding',
                'Psychosocial & cultural factors, partner, family and peer support',
                'Teenage pregnancy',
                'Postpartum depression, partner support, family and peer support',
                'Supportive interventions',
                'Breastfeeding support policies',
                'Maternity leave',
            ]
        },
        {
            key: 'breastmilk_substitutes',
            value: 'Breastmilk Substitutes',
            children: [
                'Supportive interventions',
                'Infant hypernatremia & dehydration',
                'Long term outcomes',
                'Code of Marketing of Breast Milk Substitutes',
                'Contraindication to breast feeding',
                'Psychosocial & cultural factors, partner, family and peer support',
                'Standard Components, Codex Alimentarius, Guideline',
                'Composition of human milk',
                'Macronutrients',
                'Milk bioactive factors',
                'Probiotics, Prebiotics & Synbiotics',
                'Quality control & Safety Regulation',
                'Hygienic Formula Preparation',
                'Bacterial contamination',
                'Correct preparation & storage of breast milk substitutes',
                'Bottle-feeding hunger & satiety cues',
                'Practical aspects of feeding',
                'Weaning from bottle feeding',
            ]
        },
        {
            key: 'preterm',
            value: 'Preterm',
            children: [
                'Epidemiology',
                'Nutrition on the Neonatal ICU',
                'Long term outcomes',
                'Kangaroo Mother Care (skin-to-skin contact)',
                'Nutrient requirements /reference nutrient intake',
                'Macronutrients',
                'Fluid & electrolyte balance',
                'Micronutrients',
                'Vitamins',
                'Minerals',
                'Standardising feeding guidelines',
                'Practical aspects of feeding',
                'Expressed breast milk',
                'Enteral & parenteral nutrition',
                'Bronchopulmonary dysplasia',
                'Necrotising enterocolitis',
                'Low-resource settings',
                'Maternal HIV infection',
                'Postnatal growth',
                'Discharge planning & support',
            ]
        },
        {
            key: 'complementary_feeding',
            value: 'Complementary feeding',
            children: [
                'Definition',
                'Psychosocial & cultural factors, partner, family and peer support',
                'Supportive interventions',
                'Principles, ATAS acronym',
                'Epidemiology & demographics',
                'Undernutrition & underweight',
                'Overweight & obesity',
                'Postnatal growth',
                'Micronutrients',
                'Minerals',
                'Micronutrient deficiency & supplementation',
                'Nutrient requirements /reference nutrient intake',
                'Vitamins',
                'Healthy diet',
            ]
        }
    ],
    'subdomains': [
        '3D & Animation', 'Accounting & Bookkeeping', 'Advertising', 'Affiliate Marketing', 'Analytics & Automation',
        'Apple', 'Architectural Design', 'Arts & Crafts', 'Beauty & Makeup', 'Branding', 'Business Law', 'Career Development',
        'Commercial Photography', 'Communications', 'Compliance', 'Content Marketing', 'Creativity', 'Cryptocurrency & Blockchain',
        'Dance', 'Data & Analytics', 'Data Science', 'Databases', 'Design Thinking', 'Design Tools', 'Development Tools',
        'Dieting', 'Digital Marketing', 'Digital Photography', 'E-Commerce', 'Economics', 'Engineering', 'Entrepreneurship',
        'Essential Tech Skills', 'Fashion', 'Finance', 'Finance Cert & Exam Prep', 'Financial Modeling & Analysis', 'Fitness',
        'Food & Beverage', 'Game Design', 'Game Development', 'Gaming', 'General Health', 'Google', 'Graphic Design',
        'Growth Hacking', 'Happiness', 'Hardware', 'Home Business', 'Home Improvement', 'Human Resources', 'Humanities',
        'Industry', 'Influence', 'Instruments', 'Interior Design', 'Investing & Trading', 'IT Certification', 'Language', 'Leadership',
        'Management', 'Marketing Fundamentals Math', 'Media', 'Meditation', 'Memory & Study Skills', 'Mental Health',
        'Microsoft', 'Mobile Apps', 'Money Management Tools', 'Motivation', 'Music Fundamentals', 'Music Software',
        'Music Techniques', 'Network & Security', 'Nutrition', 'Online Education', 'Operating Systems', 'Operations',
        'Oracle', 'Other', 'Other Finance & Economics', 'Other Teaching & Academics', 'Parenting & Relationships',
        'Personal Brand Building', 'Personal Finance', 'Personal Growth & Wellness', 'Personal Transformation',
        'Pet Care & Training', 'Photography Fundamentals', 'Photography Tools', 'Portraits', 'Product Marketing',
        'Production', 'Productivity', 'Productivity & Professional Skills', 'Programming Languages', 'Project Management',
        'Public Relations', 'Real Estate', 'Religion & Spirituality', 'Safety & First Aid', 'Sales', 'SAP', 'Science',
        'Search Engine Optimization', 'Self Defense', 'Self Esteem', 'Social Media Marketing', 'Social Science',
        'Software Engineering', 'Software Testing ', 'Sports', 'Strategy', 'Stress Management', 'Taxes',
        'Teacher Training', 'Test Prep', 'Travel', 'User Experience', 'Video & Mobile Marketing', 'Video Design',
        'Vocal', 'Vodafone', 'Web Design', 'Web Development', 'Yoga'
    ],
    'languages': [
        DefaultInputData.languages[0],  // en
        DefaultInputData.languages[1],  // fr
        DefaultInputData.languages[3]   // nl
    ],
    'defaultLanguage': DefaultInputData.languages[0] // en
};
