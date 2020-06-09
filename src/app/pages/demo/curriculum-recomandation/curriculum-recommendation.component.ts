import {Component, OnInit, Input} from '@angular/core';
import {DemoMenuComponent} from '../sections/menu/menu.component';
import {CurriculumRecommendationData} from './curriculum-recommendation.data';
import {DefaultInputData} from '../demo.component.data';
import {DemoCommonFieldsComponent} from '../sections/common-fields/common-fields.component';
import {Language} from '../languages.data';
import {AppComponent} from '../../../app.component';
import {CurriculumRecommendationModel} from './curriculum-recommendation.model';

interface Granularity {
    id: string;
    name: string;
    value: number;
}

@Component({
    selector: 'app-demo-curriculum-recommendation',
    templateUrl: './curriculum-recommendation.component.html',
    styleUrls: ['./curriculum-recommendation.component.css']
})

export class CurriculumRecommendationComponent implements OnInit {

    componentTitle: string;
    formData: any;
    textValue: any;
    inputKeyword: any;
    @Input() advanced: boolean;
    loading: boolean;
    show: boolean;
    showResults: boolean;
    languages: any;
    language: any;
    expertise: any;
    themes: any;
    keywords: any;
    topics: any = [];
    selectedKeywords: any = [];
    filteredKeywords: any = [];
    lessons: any = [];
    recommended: any = [];
    preRequisite: any = [];
    postRequisite: any = [];
    preRequisiteLessons: any = [];
    postRequisiteLessons: any = [];
    levels: any = [];
    likedLessons: any = [];
    dislikedLessons: any = [];
    selectedDomain: string;
    selectedLevel: string;
    hoveredRating= 0;
    selectedRating= 0;

    constructor(private myApp: AppComponent) {
        this.myApp.apiRequestService.setApiService(CurriculumRecommendationData.serviceName);
        this.myApp.apiRequestService.setHeaders(this.myApp.apiRequestService.HEADERS_TYPE_FILE_UPLOAD);
    }

    ngOnInit() {
        this.componentTitle = CurriculumRecommendationData.componentTitle;
        this.languages = CurriculumRecommendationData.languages;
        this.language = CurriculumRecommendationData.defaultLanguage;
        this.expertise = Object.assign([], CurriculumRecommendationData.expertise);
        this.keywords = Object.assign([], CurriculumRecommendationData.keywords);
        this.themes = Object.assign([], CurriculumRecommendationData.themes);
        this.textValue = CurriculumRecommendationData.defaultText;
        this.advanced = false;
        this.loading = false;
        this.showResults = false;
        this.levels = ['Beginner', 'Intermediate', 'Expert'];
        this.selectedLevel = 'Beginner';
        this.selectedDomain = 'nutrition';
    }

    process() {
        const selectedExpertise = [];
        const selectedThemes = [];
        const topicsFormat = {};

        this.expertise.forEach(
            (exp) => {
                if (exp.checked && exp.id <= 5 && exp.value !== 'medicine') {
                    selectedExpertise.push('medicine_' + exp.value);
                } else if (exp.checked && exp.value !== 'medicine') {
                    selectedExpertise.push(exp.value);
                }
            }
        );

        this.themes.forEach(
            (thm) => {
                if (thm.checked) {
                    selectedThemes.push(thm.value);
                }
            }
        );

        this.selectedKeywords.forEach(
            (kywd) => {
                const tempKey = kywd.split('-');
                if (tempKey[1]) {
                    if (topicsFormat[tempKey[0].trim()]) {
                        topicsFormat[tempKey[0].trim()].push(tempKey[1].trim());
                    } else {
                        topicsFormat[tempKey[0].trim()] = [tempKey[1].trim()];
                    }
                } else {
                    this.keywords.forEach(
                        (key) => {
                            if (key.value === tempKey[0].trim()) {
                                topicsFormat[tempKey[0].trim()] = [...key.children];
                            }
                        }
                    );
                }
            }
        );

        if (this.selectedDomain !== 'other') {
            Object.keys(topicsFormat).forEach(
                (key) => {
                    this.topics.push({[key]: topicsFormat[key]});
                }
            );
        } else {
            this.topics = this.selectedKeywords;
        }

        if (selectedExpertise.length === 0 && this.selectedDomain !== 'other') {
            alert('Please add expertise!');
            return false;
        }

        if (this.selectedKeywords.length === 0) {
            alert('Please add some keywords!');
            return false;
        }

        this.loading = true;
        this.showResults = false;

        const data = {
            'cme': false,
            'expertise': selectedExpertise,
            'text': this.textValue,
            'themes': selectedThemes,
            'topics': this.topics,
            'otherdomains': this.selectedDomain === 'other',
            'level': this.selectedLevel.toLowerCase(),
            'likedlessons': this.likedLessons,
            'dislikedlessons': this.dislikedLessons
        };


        this.myApp.apiRequestService.process(data).subscribe((response) => {
                if (response.success !== true) {
                    alert(response.errorMsg);
                    this.loading = false;
                    this.topics = [];
                    this.showResults = false;
                    return;
                }

                this.lessons = response.data.lessons;
                if (this.selectedDomain === 'other') {
                    this.recommended = response.data.lessons;
                } else {
                    response.data.recommended.forEach(
                        (rec) => {
                            this.recommended = [...this.recommended, ...this.lessons.filter(el => el.id === rec)];
                        }
                    );


                    this.recommended.forEach(
                        (element) => {
                            this.preRequisite = [...this.preRequisite, ...element.prerequisites];
                            this.postRequisite = [...this.postRequisite, ...element.postrequisites];
                        }
                    );

                    this.preRequisite.forEach(
                        (pre) => {
                            this.preRequisiteLessons = [...this.preRequisiteLessons, ...this.lessons.filter(el => el.id === pre)];
                        }
                    );

                    this.postRequisite.forEach(
                        (post) => {
                            this.postRequisiteLessons = [...this.postRequisiteLessons, ...this.lessons.filter(el => el.id === post)];
                        }
                    );
                }

                this.loading = false;
                this.showResults = true;
            },
            error => {
                console.log(error);
                this.loading = false;
            });
    }

    check(expert, first) {
        expert.checked = !expert.checked;
        if (first) {
            this.expertise.forEach(
                (chld) => {
                    if (expert.checked && chld.isChild) {
                        chld.checked = true;
                    } else if (chld.isChild) {
                        chld.checked = false;
                    }

                }
            );
        }
    }

    selectDomain(domain) {
        this.selectedDomain = domain;
        if (domain === 'nutrition') {
            this.keywords = Object.assign([], CurriculumRecommendationData.keywords);
        } else {
            this.keywords = Object.assign([], CurriculumRecommendationData.subdomains);
        }
    }

    likeLesson(lesson) {
        if (this.likedLessons.includes(lesson.published_title)) {
            this.likedLessons = this.likedLessons.filter(e => e !== lesson.published_title);
        } else {
            this.likedLessons.push(lesson.published_title);
            this.dislikedLessons = this.dislikedLessons.filter(e => e !== lesson.published_title);
        }
    }

    dislikeLesson(lesson) {
        if (this.dislikedLessons.includes(lesson.published_title)) {
            this.dislikedLessons = this.dislikedLessons.filter(e => e !== lesson.published_title);
        } else {
            this.dislikedLessons.push(lesson.published_title);
            this.likedLessons = this.likedLessons.filter(e => e !== lesson.published_title);
        }
    }

    checkTheme(theme) {
        theme.checked = !theme.checked;
    }

    searchKeyword() {
        const tempString = this.inputKeyword.split(' ');
        this.show = true;

        if (tempString.length > 1 && tempString[tempString.length - 1] !== '') {
            tempString.forEach(
                (temp) => {
                    if (temp) {
                        this.filterKeywords(this.filteredKeywords, temp, true);
                    }
                }
            );
        } else {
            this.filteredKeywords = [];
            this.filterKeywords(this.keywords, tempString[0], false);
        }

    }

    filterKeywords(keywords, stringFilter, multipleWords) {
        if (multipleWords) {
            this.filteredKeywords = keywords.filter(el => el.toLowerCase().includes(stringFilter.toLowerCase()));
        } else {
            keywords.forEach(
                (keywordSection) => {
                    let tempValue = [];
                    if (this.selectedDomain === 'nutrition') {
                        if (keywordSection.value.toLowerCase().includes(stringFilter.toLowerCase())) {
                            tempValue.push(keywordSection.value);
                            keywordSection.children.forEach(
                                (childKey) => {
                                    tempValue.push(keywordSection.value + ' - ' + childKey);
                                }
                            );
                        } else {
                            tempValue = keywordSection.children.reduce((accum, el) => {
                                if (el.toLowerCase().includes(stringFilter.toLowerCase())) {
                                    return [...accum, keywordSection.value + ' - ' + el];
                                }
                                return [...accum];
                            }, []);
                        }
                    } else {
                        if (keywordSection.toLowerCase().includes(stringFilter.toLowerCase())) {
                            tempValue.push(keywordSection);
                        }
                    }


                    this.filteredKeywords = [...this.filteredKeywords, ...tempValue];
                }
            );
        }
    }

    addKeyword() {
        if (this.inputKeyword) {
            this.selectedKeywords.push(this.inputKeyword);
            this.filteredKeywords = [];
            this.inputKeyword = '';
        }
    }

    addItem(result) {
        this.inputKeyword = result;
        this.show = false;
        this.filteredKeywords = [];
    }

    removeKeyword(index) {
        this.selectedKeywords.splice(index, 1);
    }

    refineSearch() {
        this.dislikedLessons = [];
        this.process();
    }

    newSearch() {
        this.lessons = [];
        this.textValue = '';
        this.selectedKeywords = [];
        this.showResults = false;
    }
}
