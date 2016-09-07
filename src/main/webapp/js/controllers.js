"use strict";

var NavBarItems;
var BrowseItems;
var AboutSections;

(function () {
    angular
            .module('controllers', ['services', 'ngFileUpload'])
            .controller('AppController', ['$location', function ($location) {
                    var vm = this; // Use 'controller as' syntax.
                }])

            .controller('HeaderController',
            ['$scope', '$window', function ($scope, $window) {

                    if(_isNotMobile) $scope.hamburgerMenu = true;

                    $scope.openMenu = function () {
                        $scope.hamburgerMenu = !$scope.hamburgerMenu;
                    };

                    // angular.element($window).bind("scroll", function() {
                    // console.log("in scroll")
                    // if (this.pageYOffset >= 70) {
                    // $scope.isFixed = false;
                    // console.log( $scope.isFixed)
                    // } else {
                    // $scope.isFixed = true;
                    // console.log( $scope.isFixed)
                    // }
                    // return $scope.isFixed;
                    // })

                }])
            .controller('ReaderMenuController', ['$scope', function ($scope) {
                    $scope.navItems = NavBarItems;
                }])
            .controller('HomeController', ['$scope', function ($scope) {
                    $scope.browseSections = BrowseItems;
                    $scope.aboutSections = AboutSections;
                }])

            .controller('ContactController', ['$scope', function ($scope) {
                }])
            .controller(
                    'PublicationsController',
            [
                '$scope',
                '$timeout',
                '$http',
                function ($scope, $timeout, $http) {
                    $http
                            .get('json/publications.json')
                            .then(
                                    function (publications) {
                                        FacetedPublications.settings.items = publications.data;
                                        // Put the function in a
                                        // closure
                                        var facetelize = function () {
                                            // Add facets
                                            $
                                                    .facetelize(FacetedPublications.settings);
                                            // Style the facets
                                            // columns
                                            FacetedPublications
                                                    .styleFacets();
                                            // Add sorting
                                            // functionality
                                            FacetedPublications
                                                    .addSorting();
                                            // Sort years facet
                                            // descending
                                            FacetedPublications
                                                    .descendingOrderForYearsFilter();
                                        };
                                        // and add it to the browser
                                        // queue with delay 0. This
                                        // ensures that the DOM is
                                        // fully loaded before
                                        // applying
                                        // the function. For further
                                        // details, see:
                                        // http://blog.brunoscopelliti.com/run-a-directive-after-the-dom-has-finished-rendering/
                                        $timeout(facetelize, 0);
                                    });
                }])
            .controller('PeopleController', ['$scope', function ($scope) {
                    $scope.peopleListUPB = PeopleUPB;
                    $scope.peopleListLSE = PeopleLSE;
                    $scope.peopleListLMU = PeopleLMU;
                    $scope.peopleListASU = PeopleASU;
                    $scope.peopleListGSU = PeopleGSU;
                }])
            .controller('DemoMenuController', ['$location', '$scope', function ($location, $scope) {
                    $scope.demoItems = DemoItems;
                    $scope.getClass = function (path) {
                        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
                    }
                }])
            .controller('DemoController',
            ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
                }])
            .controller(
                    'DemoTextProcessingController',
            [
                '$scope',
                '$http',
                '$sce',
                function ($scope, $http, $sce) {

                    // texts
                    $scope.title = DemoTexts.textProcessing.title;
                    $scope.text = DemoTexts.textProcessing.text;

                    // options for selectable fields
                    $scope.advanced = false;
                    $scope.languages = DemoElements.languages;
                    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                    $scope.dialogismOptions = DemoElements.dialogismOptions;

                    $scope.$watch('formData.language', function () {
                        $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                        $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                    });

                    // Text Processing Form Data
                    $scope.formData = {
                        text: DemoTexts.textProcessing.text,
                        language: DemoElements.defaultLanguage,
                        lsa: DemoElements.defaultMetricOptions.lsa.English,
                        lda: DemoElements.defaultMetricOptions.lda.English,
                        posTagging: DemoElements.defaultPosTaggingOption,
                        dialogism: DemoElements.defaultDialogismOption,
                        threshold: DemoElements.defaultSemanticSimilarityThreshold
                    };

                    $scope.loading = false;

                    $scope.sentiments = null;
                    $scope.complexity = null;
                    $scope.topics = null;
                    $scope.topicEdges = null;
                    $scope.search = null;

                    $scope.buttonClick = function (req) {

                        $scope.loading = true;
                        $scope.showResults = 'NONE';

                        var endpoint;

                        switch (req) {

                            case 'SENTIMENT_ANALYSIS':

                                endpoint = 'getSentiment';

                                var params = {
                                    text: encodeURIComponent($scope.formData.text)
                                            .replace(/%0D/g, "%0A"),
                                    lang: $scope.formData.language.name,
                                    lsa: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LSA' + '/'
                                            + $scope.formData.lsa.value,
                                    lda: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LDA' + '/'
                                            + $scope.formData.lda.value,
                                    postagging: $scope.formData.posTagging.value,
                                    dialogism: $scope.formData.dialogism.value
                                };

                                $http
                                        .get(buildServerPath(endpoint, params))
                                        .then(function (response) {
                                            $scope.loading = false;
                                            if (response.data.success != true) {
                                                alert('Server error occured!');
                                                return;
                                            }

                                            $scope.showResults = 'SENTIMENT_ANALYSIS';

                                            $scope.sentiments = response.data.data;
                                            var interval = setInterval(function () {
                                                if ($scope.sentiments.count == response.data.data.count) {
                                                    clearInterval(interval);
                                                    courseDescriptionToggle();
                                                }
                                            }, 1000);
                                        },
                                                function (response) {
                                                    $scope.loading = false;
                                                    if (response.status == 0) {
                                                        alert('Server error occured!');
                                                    } else {
                                                        alert(response.statusText);
                                                    }
                                                });
                                break;

                            case 'TEXTUAL_COMPLEXITY':

                                endpoint = 'getComplexity';

                                var params = {
                                    text: encodeURIComponent(
                                            $scope.formData.text)
                                            .replace(/%0D/g, "%0A"),
                                    lang: $scope.formData.language.name,
                                    lsa: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LSA' + '/'
                                            + $scope.formData.lsa.value,
                                    lda: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LDA' + '/'
                                            + $scope.formData.lda.value,
                                    postagging: $scope.formData.posTagging.value,
                                    dialogism: $scope.formData.dialogism.value
                                }

                                $http
                                        .get(
                                                buildServerPath(
                                                        endpoint,
                                                        params))
                                        .then(
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.data.success != true) {
                                                        alert('Server error occured!');
                                                        return;
                                                    }

                                                    $scope.showResults = 'TEXTUAL_COMPLEXITY';

                                                    $scope.complexity = response.data.data;
                                                    var interval = setInterval(
                                                            function () {
                                                                if ($scope.complexity.count == response.data.data.count) {
                                                                    clearInterval(interval);
                                                                    courseDescriptionToggle();
                                                                }
                                                            }, 1000);

                                                },
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.status == 0) {
                                                        alert('Server error occured!');
                                                    } else {
                                                        alert(response.statusText);
                                                    }

                                                });
                                break;

                            case 'CONCEPT_MAP':

                                endpoint = 'getTopics';

                                var params = {
                                    text: encodeURIComponent(
                                            $scope.formData.text)
                                            .replace(/%0D/g, "%0A"),
                                    lang: $scope.formData.language.name,
                                    lsa: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LSA' + '/'
                                            + $scope.formData.lsa.value,
                                    lda: ServerSettings.configRoot + '/'
                                            + $scope.formData.language.value + '/' + 'LDA' + '/'
                                            + $scope.formData.lda.value,
                                    postagging: $scope.formData.posTagging.value,
                                    dialogism: $scope.formData.dialogism.value,
                                    threshold: $scope.formData.threshold
                                }

                                $http
                                        .get(
                                                buildServerPath(
                                                        endpoint,
                                                        params))
                                        .then(
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.data.success != true) {
                                                        alert('Server error occured!');
                                                        return;
                                                    }

                                                    $scope.showResults = 'CONCEPT_MAP';

                                                    $scope.topics = response.data.data.nodes;
                                                    $scope.topicEdges = response.data.data.links;
                                                    var interval = setInterval(
                                                            function () {
                                                                if ($scope.topicEdges.count == response.data.data.links.count) {
                                                                    clearInterval(interval);
                                                                    d3jsForTopics(
                                                                            response.data.data,
                                                                            "#conceptMap",
                                                                            false);
                                                                }
                                                            }, 1000);

                                                },
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.status == 0) {
                                                        alert('Server error occured!');
                                                    } else {
                                                        alert(response.statusText);
                                                    }

                                                });
                                break;

                            case 'SEMANTIC_SEARCH':

                                endpoint = 'search';

                                var params = {
                                    text: encodeURIComponent(
                                            $scope.formData.text)
                                            .replace(/%0D/g, "%0A"),
                                    path: 'tasa_search_en'
                                }

                                $http
                                        .get(
                                                buildServerPath(
                                                        endpoint,
                                                        params))
                                        .then(
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.data.success != true) {
                                                        alert('Server error occured!');
                                                        return;
                                                    }

                                                    $scope.showResults = 'SEMANTIC_SEARCH';

                                                    $scope.search = response.data.data;
                                                    var interval = setInterval(
                                                            function () {
                                                                if ($scope.search.count == response.data.data.count) {
                                                                    clearInterval(interval);
                                                                    courseDescriptionToggle();
                                                                }
                                                            }, 1000);

                                                },
                                                function (response) {

                                                    $scope.loading = false;

                                                    if (response.status == 0) {
                                                        alert('Server error occured!');
                                                    } else {
                                                        alert(response.statusText);
                                                    }

                                                });
                                break;

                        }
                    }

                }])
            .controller(
                    'DemoSemanticAnnotationController',
            [
                '$scope',
                '$http',
                '$sce',
                'Upload',
                '$timeout',
                function ($scope, $http, $sce, Upload, $timeout) {

                    var params = {};
                    var endpoint = 'fileUpload';
                    $scope.uploadFile = function (file, errFiles, f,
                            errFile, errorMsg) {
                        $scope[f] = file;
                        $scope[errFile] = errFiles && errFiles[0];
                        if (file) {
                            file.upload = Upload.upload({
                                url: buildServerPath(endpoint,
                                        params),
                                data: {
                                    file: file
                                }
                            });

                            file.upload
                                    .then(
                                            function (response) {
                                                $timeout(function () {
                                                    file.result = response.data;
                                                    $scope.formData.file = file.result;
                                                });
                                            },
                                            function (response) {
                                                if (response.status > 0)
                                                    $scope[errorMsg] = response.status
                                                            + ': '
                                                            + response.data;
                                            },
                                            function (evt) {
                                                file.progress = Math
                                                        .min(
                                                                100,
                                                                parseInt(100.0
                                                                        * evt.loaded
                                                                        / evt.total));
                                                            });
                                                }
                                            }

                                            // texts
                                            $scope.title = DemoTexts.semanticAnnotation.title;

                                            // options for selectable fields
                                            $scope.advanced = false;
                                            $scope.languages = DemoElements.languages;
                                            $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                                            $scope.dialogismOptions = DemoElements.dialogismOptions;

                                            $scope
                                                    .$watch(
                                                            'formData.language',
                                                            function () {
                                                                $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                                                                $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                                                            });

                                            // Semantic Annotation Form Data
                                            $scope.formData = {
                                                abstract: DemoTexts.semanticAnnotation.abstractText,
                                                keywords: DemoTexts.semanticAnnotation.keywords,
                                                language: DemoElements.defaultLanguage,
                                                lsa: DemoElements.defaultMetricOptions.lsa.English,
                                                lda: DemoElements.defaultMetricOptions.lda.English,
                                                posTagging: DemoElements.defaultPosTaggingOption,
                                                dialogism: DemoElements.defaultDialogismOption,
                                                threshold: DemoElements.defaultSemanticSimilarityThreshold
                                            };

                                            $scope.abstractDocumentSimilarity = -1;
                                            $scope.keywordsAbstractCoverage = -1;
                                            $scope.keywordsDocumentCoverage = -1;
                                            $scope.keywords = null;
                                            $scope.categories = null;

                                            $scope.loading = false;

                                            $scope.topics = null;
                                            $scope.topicEdges = null;
                                            $scope.search = null;
                                            $scope.uri = "";

                                            $scope.collaborationSocialKBNodes = null;
                                            $scope.collaborationVoiceOverlapNodes = null;

                                            $scope.buttonClick = function (req) {

                                                $scope.showSemanticRelevance = false;
                                                $scope.showSemanticCategories = false;

                                                var endpoint;
                                                switch (req) {

                                                    case 'SEMANTIC_ANNOTATION':

                                                        $scope.loading = true;

                                                        endpoint = 'semanticProcess';

                                                        var data = {
                                                            file: $scope.formData.file,
                                                            abstract: $scope.formData.abstract,
                                                            keywords: $scope.formData.keywords,
                                                            lang: $scope.formData.language.name,
                                                            lsa: ServerSettings.configRoot + '/'
                                                                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                                                                    + $scope.formData.lsa.value,
                                                            lda: ServerSettings.configRoot + '/'
                                                                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                                                                    + $scope.formData.lda.value,
                                                            postagging: $scope.formData.posTagging.value,
                                                            dialogism: $scope.formData.dialogism.value,
                                                            threshold: $scope.formData.threshold
                                                        }

                                                        var params = {};
                                                        $http
                                                                .post(
                                                                        buildServerPath(
                                                                                endpoint,
                                                                                params), data)
                                                                .then(
                                                                        function (response) {

                                                                            $scope.loading = false;

                                                                            if (response.data.success != true) {
                                                                                alert('Server error occured!');
                                                                                return;
                                                                            }

                                                                            $scope.showConcept = true;
                                                                            $scope.showSemanticRelevance = true;
                                                                            $scope.showSemanticCategories = true;

                                                                            $scope.topics = response.data.data.concepts.nodes;
                                                                            $scope.topicEdges = response.data.data.concepts.links;
                                                                            $scope.abstractDocumentSimilarity = response.data.data.abstractDocumentSimilarity;
                                                                            $scope.keywordsAbstractCoverage = response.data.data.keywordsAbstractCoverage;
                                                                            $scope.keywordsDocumentCoverage = response.data.data.keywordsDocumentCoverage;
                                                                            $scope.keywords = response.data.data.keywords;
                                                                            $scope.categories = response.data.data.categories;

                                                                            var interval = setInterval(
                                                                                    function () {
                                                                                        if ($scope.topicEdges.count == response.data.data.concepts.links.count) {
                                                                                            clearInterval(interval);
                                                                                            d3jsForTopics(
                                                                                                    response.data.data.concepts,
                                                                                                    "#conceptMap",
                                                                                                    false);
                                                                                        }
                                                                                    }, 1000);

                                                                        },
                                                                        function (response) {

                                                                            $scope.loading = false;

                                                                            if (response.status == 0) {
                                                                                alert('Server error occured!');
                                                                            } else {
                                                                                alert(response.statusText);
                                                                            }

                                                                        });
                                                        break;
                                                }
                                            }

                                        }])
                                    .controller(
                                            'DemoSelfExplanationController',
                                    [
                                        '$scope',
                                        '$http',
                                        '$sce',
                                        function ($scope, $http, $sce) {

                                            // texts
                                            $scope.title = DemoTexts.selfExplanation.title;

                                            // options for selectable fields
                                            $scope.advanced = false;
                                            $scope.languages = DemoElements.languages;
                                            $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                                            $scope.dialogismOptions = DemoElements.dialogismOptions;

                                            $scope
                                                    .$watch(
                                                            'formData.language',
                                                            function () {
                                                                $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                                                                $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                                                            });

                                            $scope.formData = {
                                                text: DemoTexts.selfExplanation.text,
                                                explanation: DemoTexts.selfExplanation.explanation,
                                                language: DemoTexts.selfExplanation.language,
                                                lsa: DemoElements.defaultMetricOptions.lsa.French,
                                                lda: DemoElements.defaultMetricOptions.lda.French,
                                                posTagging: DemoElements.defaultPosTaggingOption,
                                                dialogism: DemoElements.defaultDialogismOption
                                            };

                                            $scope.loading = false;

                                            $scope.buttonClick = function (req) {

                                                $scope.showReadingStrategies = false;

                                                var endpoint;
                                                switch (req) {
                                                    case 'SELF_EXPLANATION':

                                                        $scope.loading = true;

                                                        endpoint = 'selfExplanation';
                                                        var data = {
                                                            text: $scope.formData.text,
                                                            explanation: $scope.formData.explanation,
                                                            lang: $scope.formData.language.name,
                                                            lsa: ServerSettings.configRoot + '/'
                                                                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                                                                    + $scope.formData.lsa.value,
                                                            lda: ServerSettings.configRoot + '/'
                                                                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                                                                    + $scope.formData.lda.value,
                                                            postagging: $scope.formData.posTagging.value,
                                                            dialogism: $scope.formData.dialogism.value
                                                        };

                                                        var params = {};

                                                        $http
                                                                .post(
                                                                        buildServerPath(
                                                                                endpoint,
                                                                                params), data)
                                                                .then(
                                                                        function (response) {
                                                                            $scope.loading = false;
                                                                            if (response.data.success != true) {
                                                                                alert('Server error occured!');
                                                                                return;
                                                                            }

                                                                            $scope.showReadingStrategies = true;
                                                                            $scope.selfExplanationColored = $sce
                                                                                    .trustAsHtml(response.data.data.selfExplanationColored);
                                                                            $scope.strategies = response.data.data.strategies;
                                                                            var interval = setInterval(
                                                                                    function () {
                                                                                        if ($scope.strategies.count == response.data.data.strategies.count) {
                                                                                            clearInterval(interval);
                                                                                            courseDescriptionToggle();
                                                                                        }
                                                                                    }, 1000);
                                                                        },
                                                                        function (response) {

                                                                            $scope.loading = false;

                                                                            if (response.status == 0) {
                                                                                alert('Server error occured!');
                                                                            } else {
                                                                                alert(response.statusText);
                                                                            }

                                                                        });
                                                        break;
                                                }
                                            }

                                        }])
                                    .controller(
                                            'DemoCsclController',
                                    [
                                        '$scope',
                                        '$http',
                                        '$sce',
                                        'Upload',
                                        '$timeout',
                                        function ($scope, $http, $sce, Upload, $timeout) {

                                            var params = {};
                                            var endpoint = 'fileUpload';
                                            $scope.uploadFile = function (file, errFiles, f,
                                                    errFile, errorMsg) {
                                                $scope[f] = file;
                                                $scope[errFile] = errFiles && errFiles[0];
                                                if (file) {
                                                    file.upload = Upload.upload({
                                                        url: buildServerPath(endpoint,
                                                                params),
                                                        data: {
                                                            file: file
                                                        }
                                                    });

                                                    file.upload
                                                            .then(
                                                                    function (response) {
                                                                        $timeout(function () {
                                                                            file.result = response.data;
                                                                            $scope.formData.csclFile = file.result;
                                                                        });
                                                                    },
                                                                    function (response) {
                                                                        if (response.status > 0)
                                                                            $scope[errorMsg] = response.status
                                                                                    + ': '
                                                                                    + response.data;
                                                                    },
                                                                    function (evt) {
                                                                        file.progress = Math
                                                                                .min(
                                                                                        100,
                                                                                        parseInt(100.0
                                                                                                * evt.loaded
                                                                                                / evt.total));
                                                                                    });
                                                                        }
                                                                    }

                                                                    // texts
                                                                    $scope.title = DemoTexts.csclProcessing.title;

                                                                    // options for selectable fields
                                                                    $scope.advanced = false;
                                                                    $scope.languages = DemoElements.languages;
                                                                    $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                                                                    $scope.dialogismOptions = DemoElements.dialogismOptions;

                                                                    $scope
                                                                            .$watch(
                                                                                    'formData.language',
                                                                                    function () {
                                                                                        $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                                                                                        $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                                                                                    });

                                                                    $scope.sampleFileUrl = DemoTexts.csclProcessing.sampleFileUrl;
                                                                    $scope.formData = {
                                                                        language: DemoElements.defaultLanguage,
                                                                        lsa: DemoElements.defaultMetricOptions.lsa.English,
                                                                        lda: DemoElements.defaultMetricOptions.lda.English,
                                                                        posTagging: DemoElements.defaultPosTaggingOption,
                                                                        dialogism: DemoElements.defaultDialogismOption,
                                                                        threshold: DemoElements.defaultSemanticSimilarityThreshold
                                                                    };

                                                                    $scope.loading = false;

                                                                    $scope.topics = null;
                                                                    $scope.topicEdges = null;

                                                                    $scope.collaborationSocialKBNodes = null;
                                                                    $scope.collaborationVoiceOverlapNodes = null;

                                                                    $scope.buttonClick = function (req) {

                                                                        $scope.showParticipantInteractionMap = false;
                                                                        $scope.showParticipantCsclIndices = false;
                                                                        $scope.showParticipantEvolutionGraph = false;
                                                                        $scope.showCollaborationGraphs = false;
                                                                        $scope.showConceptMap = false;

                                                                        var endpoint;
                                                                        switch (req) {
                                                                            case 'CSCL':

                                                                                $scope.loading = true;

                                                                                endpoint = 'csclProcessing';

                                                                                var data = {
                                                                                    csclFile: $scope.formData.csclFile,
                                                                                    lang: $scope.formData.language.name,
                                                                                    lsa: ServerSettings.configRoot + '/'
                                                                                            + $scope.formData.language.value + '/' + 'LSA' + '/'
                                                                                            + $scope.formData.lsa.value,
                                                                                    lda: ServerSettings.configRoot + '/'
                                                                                            + $scope.formData.language.value + '/' + 'LDA' + '/'
                                                                                            + $scope.formData.lda.value,
                                                                                    postagging: $scope.formData.posTagging.value,
                                                                                    dialogism: $scope.formData.dialogism.value,
                                                                                    threshold: $scope.formData.threshold
                                                                                };

                                                                                var params = {};

                                                                                $http
                                                                                        .post(
                                                                                                buildServerPath(
                                                                                                        endpoint,
                                                                                                        params), data)
                                                                                        .then(
                                                                                                function (response) {

                                                                                                    $scope.loading = false;

                                                                                                    if (response.data.success != true) {
                                                                                                        alert('Server error occured!');
                                                                                                        return;
                                                                                                    }

                                                                                                    // build concept map
                                                                                                    $scope.showConceptMap = true;
                                                                                                    $scope.topics = response.data.data.concepts.nodes;
                                                                                                    $scope.topicEdges = response.data.data.concepts.links;
                                                                                                    var interval = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.topicEdges.count == response.data.data.concepts.links.count) {
                                                                                                                    clearInterval(interval);
                                                                                                                    d3jsForTopics(
                                                                                                                            response.data.data.concepts,
                                                                                                                            "#conceptMap",
                                                                                                                            false);
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    // build participant
                                                                                                    // interaction
                                                                                                    // concept map
                                                                                                    $scope.showParticipantInteractionMap = true;
                                                                                                    $scope.participants = response.data.data.participantInteraction.nodes;
                                                                                                    $scope.participantEdges = response.data.data.participantInteraction.links;
                                                                                                    var intervalParticipantInteraction = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.participantEdges.count == response.data.data.participantInteraction.links.count) {
                                                                                                                    clearInterval(intervalParticipantInteraction);
                                                                                                                    d3jsForTopics(
                                                                                                                            response.data.data.participantInteraction,
                                                                                                                            "#participantInteractionMap",
                                                                                                                            false);
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    // build participant
                                                                                                    // evolution graph
                                                                                                    $scope.showParticipantEvolutionGraph = true;
                                                                                                    $scope.participantEvolution = response.data.data.participantEvolution;
                                                                                                    var intervalParticipantEvolution = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.participantEvolution.count == response.data.data.participantEvolution.count) {
                                                                                                                    clearInterval(intervalParticipantEvolution);
                                                                                                                    d3jsMultipleLinesGraph(
                                                                                                                            response.data.data.participantEvolution,
                                                                                                                            "#participantEvolution",
                                                                                                                            "Contribution ID",
                                                                                                                            "value");
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    $scope.showCollaborationGraphs = true;

                                                                                                    // build
                                                                                                    // collaboration kb
                                                                                                    // graph
                                                                                                    $scope.collaborationSocialKBNodes = response.data.data.socialKB;
                                                                                                    var intervalCollaborationSocialKB = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.collaborationSocialKBNodes.count == response.data.data.socialKB.count) {
                                                                                                                    clearInterval(intervalCollaborationSocialKB);
                                                                                                                    d3jsLineGraph(
                                                                                                                            response.data.data.socialKB,
                                                                                                                            "#collaborationSocialKB",
                                                                                                                            "Contribution ID",
                                                                                                                            "Social KB value");
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    // build
                                                                                                    // collaboration
                                                                                                    // voice graph
                                                                                                    $scope.voiceOverlapNodes = response.data.data.voiceOverlap;
                                                                                                    var intervalCollaborationVoiceOverlap = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.voiceOverlapNodes.count == response.data.data.voiceOverlap.count) {
                                                                                                                    clearInterval(intervalCollaborationVoiceOverlap);
                                                                                                                    d3jsLineGraph(
                                                                                                                            response.data.data.voiceOverlap,
                                                                                                                            "#collaborationVoiceOverlap",
                                                                                                                            "Contribution ID",
                                                                                                                            "Voice PMI");
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    // build cscl
                                                                                                    // indices
                                                                                                    $scope.showParticipantCsclIndices = true;
                                                                                                    $scope.csclIndices = response.data.data.csclIndices;
                                                                                                    var intervalCsclIndices = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.csclIndices.count == response.data.data.csclIndices.count) {
                                                                                                                    clearInterval(intervalCsclIndices);
                                                                                                                }
                                                                                                            }, 1000);

                                                                                                    // build cscl
                                                                                                    // indices
                                                                                                    // description
                                                                                                    $scope.csclIndicesDescription = response.data.data.csclIndicesDescription;
                                                                                                    var intervalCsclIndicesDescription = setInterval(
                                                                                                            function () {
                                                                                                                if ($scope.csclIndicesDescription.count == response.data.data.csclIndicesDescription.count) {
                                                                                                                    clearInterval(intervalCsclIndicesDescription);
                                                                                                                }
                                                                                                            }, 1000);
                                                                                                },
                                                                                                function (response) {

                                                                                                    $scope.loading = false;

                                                                                                    if (response.status == 0) {
                                                                                                        alert('Server error occured!');
                                                                                                    } else {
                                                                                                        alert(response.statusText);
                                                                                                    }

                                                                                                });
                                                                                break;
                                                                        }
                                                                    }

                                                                }])
                                                            .controller(
                                                                    'DemoCvcoverController',
                                                            [
                                                                '$scope',
                                                                '$http',
                                                                '$sce',
                                                                'Upload',
                                                                '$timeout',
                                                                function ($scope, $http, $sce, Upload, $timeout) {

                                                                    var params = {};
                                                                    var endpoint = 'fileUpload';
                                                                    $scope.uploadFile = function (type, file,
                                                                            errFiles, f, errFile, errorMsg) {
                                                                        $scope[f] = file;
                                                                        $scope[errFile] = errFiles && errFiles[0];
                                                                        if (file) {
                                                                            file.upload = Upload.upload({
                                                                                url: buildServerPath(endpoint,
                                                                                        params),
                                                                                data: {
                                                                                    file: file
                                                                                }
                                                                            });

                                                                            file.upload
                                                                                    .then(
                                                                                            function (response) {
                                                                                                $timeout(function () {
                                                                                                    file.result = response.data;
                                                                                                    switch (type) {
                                                                                                        case 'CV':
                                                                                                            $scope.formData.cv = file.result;
                                                                                                            break;
                                                                                                        case 'COVER':
                                                                                                            $scope.formData.cover = file.result;
                                                                                                            break;
                                                                                                    }
                                                                                                });
                                                                                            },
                                                                                            function (response) {
                                                                                                if (response.status > 0)
                                                                                                    $scope[errorMsg] = response.status
                                                                                                            + ': '
                                                                                                            + response.data;
                                                                                            },
                                                                                            function (evt) {
                                                                                                file.progress = Math
                                                                                                        .min(
                                                                                                                100,
                                                                                                                parseInt(100.0
                                                                                                                        * evt.loaded
                                                                                                                        / evt.total));
                                                                                                            });
                                                                                                }
                                                                                            }

                                                                                            // texts
                                                                                            $scope.title = DemoTexts.cvCover.title;

                                                                                            // options for selectable fields
                                                                                            $scope.advanced = false;
                                                                                            $scope.languages = DemoElements.languages;
                                                                                            $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                                                                                            $scope.dialogismOptions = DemoElements.dialogismOptions;

                                                                                            $scope
                                                                                                    .$watch(
                                                                                                            'formData.language',
                                                                                                            function () {
                                                                                                                $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                                                                                                                $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                                                                                                            });

                                                                                            $scope.formData = {
                                                                                                language: DemoTexts.cvCover.language,
                                                                                                lsa: DemoElements.defaultMetricOptions.lsa.French,
                                                                                                lda: DemoElements.defaultMetricOptions.lda.French,
                                                                                                posTagging: DemoElements.defaultPosTaggingOption,
                                                                                                dialogism: DemoElements.defaultDialogismOption,
                                                                                                threshold: DemoElements.defaultSemanticSimilarityThreshold
                                                                                            };

                                                                                            $scope.loading = false;

                                                                                            $scope.topics = null;
                                                                                            $scope.topicEdges = null;

                                                                                            $scope.buttonClick = function (req) {

                                                                                                $scope.showConceptMap = false;

                                                                                                var endpoint;
                                                                                                switch (req) {
                                                                                                    case 'CV_COVER':

                                                                                                        $scope.loading = true;

                                                                                                        endpoint = 'cvCoverProcessing';

                                                                                                        var data = {
                                                                                                            cvFile: $scope.formData.cv,
                                                                                                            coverFile: $scope.formData.cover,
                                                                                                            lang: $scope.formData.language.name,
                                                                                                            lsa: ServerSettings.configRoot + '/'
                                                                                                                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                                                                                                                    + $scope.formData.lsa.value,
                                                                                                            lda: ServerSettings.configRoot + '/'
                                                                                                                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                                                                                                                    + $scope.formData.lda.value,
                                                                                                            postagging: $scope.formData.posTagging.value,
                                                                                                            dialogism: $scope.formData.dialogism.value,
                                                                                                            threshold: $scope.formData.threshold
                                                                                                        };

                                                                                                        var params = {};

                                                                                                        $http
                                                                                                                .post(
                                                                                                                        buildServerPath(
                                                                                                                                endpoint,
                                                                                                                                params), data)
                                                                                                                .then(
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.data.success != true) {
                                                                                                                                alert('Server error occured!');
                                                                                                                                return;
                                                                                                                            }

                                                                                                                            // build concept map
                                                                                                                            $scope.showConceptMap = true;
                                                                                                                            // show sentiments
                                                                                                                            $scope.showSentiment = true;
                                                                                                                            if (typeof response.data.data.cv != 'undefined') {
                                                                                                                                $scope.cvTopics = response.data.data.cv.concepts.nodes;
                                                                                                                                $scope.cvTopicEdges = response.data.data.cv.concepts.links;
                                                                                                                                var intervalCvTopics = setInterval(
                                                                                                                                        function () {
                                                                                                                                            if ($scope.cvTopicEdges.count == response.data.data.cv.concepts.links.count) {
                                                                                                                                                clearInterval(intervalCvTopics);
                                                                                                                                                d3jsForTopics(
                                                                                                                                                        response.data.data.cv.concepts,
                                                                                                                                                        "#conceptMapCv",
                                                                                                                                                        false);
                                                                                                                                            }
                                                                                                                                        }, 1000);

                                                                                                                                $scope.cvSentiments = response.data.data.cv.sentiments;
                                                                                                                                var intervalCvSentiments = setInterval(
                                                                                                                                        function () {
                                                                                                                                            if ($scope.cvSentiments.count == response.data.data.cv.sentiments.count) {
                                                                                                                                                clearInterval(intervalCvSentiments);
                                                                                                                                                courseDescriptionToggle('#list-cv-sentiments');
                                                                                                                                            }
                                                                                                                                        }, 1000);
                                                                                                                            }
                                                                                                                            if (typeof response.data.data.cover != 'undefined') {
                                                                                                                                $scope.coverTopics = response.data.data.cover.concepts.nodes;
                                                                                                                                $scope.coverTopicEdges = response.data.data.cover.concepts.links;
                                                                                                                                var intervalCoverTopics = setInterval(
                                                                                                                                        function () {
                                                                                                                                            if ($scope.coverTopicEdges.count == response.data.data.cover.concepts.links.count) {
                                                                                                                                                clearInterval(intervalCoverTopics);
                                                                                                                                                d3jsForTopics(
                                                                                                                                                        response.data.data.cover.concepts,
                                                                                                                                                        "#conceptMapCover",
                                                                                                                                                        false);
                                                                                                                                            }
                                                                                                                                        }, 1000);

                                                                                                                                $scope.coverSentiments = response.data.data.cover.sentiments;
                                                                                                                                var intervalCoverSentiments = setInterval(
                                                                                                                                        function () {
                                                                                                                                            if ($scope.coverSentiments.count == response.data.data.cover.sentiments.count) {
                                                                                                                                                clearInterval(intervalCoverSentiments);
                                                                                                                                                courseDescriptionToggle('#list-cover-sentiments');
                                                                                                                                            }
                                                                                                                                        }, 1000);
                                                                                                                            }

                                                                                                                            $scope.showCommonWords = true;
                                                                                                                            $scope.commonWords = response.data.data.wordOccurences;
                                                                                                                            $scope.showSemanticSimilarity = true;
                                                                                                                            $scope.semanticSimilarity = response.data.data.similarity;

                                                                                                                        },
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.status == 0) {
                                                                                                                                alert('Server error occured!');
                                                                                                                            } else {
                                                                                                                                alert(response.statusText);
                                                                                                                            }

                                                                                                                        });
                                                                                                        break;
                                                                                                }
                                                                                            }

                                                                                        }])
                                                                                    .controller(
                                                                                            'DemoCvController',
                                                                                    [
                                                                                        '$scope',
                                                                                        '$http',
                                                                                        '$sce',
                                                                                        'Upload',
                                                                                        '$timeout',
                                                                                        function ($scope, $http, $sce, Upload, $timeout) {

                                                                                            var params = {};
                                                                                            var endpoint = 'fileUpload';
                                                                                            $scope.uploadFile = function (type, file,
                                                                                                    errFiles, f, errFile, errorMsg) {
                                                                                                $scope[f] = file;
                                                                                                $scope[errFile] = errFiles && errFiles[0];
                                                                                                if (file) {
                                                                                                    file.upload = Upload.upload({
                                                                                                        url: buildServerPath(endpoint,
                                                                                                                params),
                                                                                                        data: {
                                                                                                            file: file
                                                                                                        }
                                                                                                    });

                                                                                                    file.upload
                                                                                                            .then(
                                                                                                                    function (response) {
                                                                                                                        $timeout(function () {
                                                                                                                            file.result = response.data;
                                                                                                                            switch (type) {
                                                                                                                                case 'CV':
                                                                                                                                    $scope.formData.cv = file.result;
                                                                                                                                    break;
                                                                                                                                case 'COVER':
                                                                                                                                    $scope.formData.cover = file.result;
                                                                                                                                    break;
                                                                                                                            }
                                                                                                                        });
                                                                                                                    },
                                                                                                                    function (response) {
                                                                                                                        if (response.status > 0)
                                                                                                                            $scope[errorMsg] = response.status
                                                                                                                                    + ': '
                                                                                                                                    + response.data;
                                                                                                                    },
                                                                                                                    function (evt) {
                                                                                                                        file.progress = Math
                                                                                                                                .min(100, parseInt(100.0 * evt.loaded / evt.total));
                                                                                                                    });
                                                                                                }
                                                                                            }

                                                                                            // texts
                                                                                            $scope.title = DemoTexts.cv.title;

                                                                                            // options for selectable fields
                                                                                            $scope.advanced = false;
                                                                                            $scope.languages = DemoElements.languages;
                                                                                            $scope.posTaggingOptions = DemoElements.posTaggingOptions;
                                                                                            $scope.dialogismOptions = DemoElements.dialogismOptions;

                                                                                            $scope
                                                                                                    .$watch(
                                                                                                            'formData.language',
                                                                                                            function () {
                                                                                                                $scope.lsaOptions = DemoElements.metricOptions.lsa[$scope.formData.language.value];
                                                                                                                $scope.ldaOptions = DemoElements.metricOptions.lda[$scope.formData.language.value];
                                                                                                            });

                                                                                            $scope.formData = {
                                                                                                keywords: DemoTexts.cv.keywords,
                                                                                                ignore: DemoTexts.cv.ignore,
                                                                                                language: DemoTexts.cv.language,
                                                                                                lsa: DemoElements.defaultMetricOptions.lsa.French,
                                                                                                lda: DemoElements.defaultMetricOptions.lda.French,
                                                                                                posTagging: DemoElements.defaultPosTaggingOption,
                                                                                                dialogism: DemoElements.defaultDialogismOption,
                                                                                                threshold: DemoElements.defaultSemanticSimilarityThreshold
                                                                                            };

                                                                                            $scope.loading = false;

                                                                                            $scope.topics = null;
                                                                                            $scope.topicEdges = null;

                                                                                            $scope.buttonClick = function (req) {

                                                                                                $scope.showConceptMap = false;

                                                                                                var endpoint;
                                                                                                switch (req) {
                                                                                                    case 'CV_COVER':

                                                                                                        $scope.loading = true;

                                                                                                        endpoint = 'cvProcessing';

                                                                                                        var data = {
                                                                                                            cvFile: $scope.formData.cv,
                                                                                                            keywords: $scope.formData.keywords,
                                                                                                            lang: $scope.formData.language.name,
                                                                                                            lsa: ServerSettings.configRoot + '/'
                                                                                                                    + $scope.formData.language.value + '/' + 'LSA' + '/'
                                                                                                                    + $scope.formData.lsa.value,
                                                                                                            lda: ServerSettings.configRoot + '/'
                                                                                                                    + $scope.formData.language.value + '/' + 'LDA' + '/'
                                                                                                                    + $scope.formData.lda.value,
                                                                                                            postagging: $scope.formData.posTagging.value,
                                                                                                            dialogism: $scope.formData.dialogism.value,
                                                                                                            threshold: $scope.formData.threshold
                                                                                                        };

                                                                                                        var params = {};

                                                                                                        $http
                                                                                                                .post(
                                                                                                                        buildServerPath(
                                                                                                                                endpoint,
                                                                                                                                params), data)
                                                                                                                .then(
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.data.success != true) {
                                                                                                                                alert('Server error occured!');
                                                                                                                                return;
                                                                                                                            }

                                                                                                                            // build concept map
                                                                                                                            $scope.showConceptMap = true;
                                                                                                                            $scope.topics = response.data.data.concepts.nodes;
                                                                                                                            $scope.topicEdges = response.data.data.concepts.links;
                                                                                                                            var intervalCvTopics = setInterval(
                                                                                                                                    function () {
                                                                                                                                        if ($scope.topicEdges.count == response.data.data.concepts.links.count) {
                                                                                                                                            clearInterval(intervalCvTopics);
                                                                                                                                            d3jsForTopicsForvCop(
                                                                                                                                                    response.data.data.concepts,
                                                                                                                                                    "#conceptMapCv",
                                                                                                                                                    false);
                                                                                                                                        }
                                                                                                                                    }, 1000);

                                                                                                                            // show textual
                                                                                                                            // complexity
                                                                                                                            $scope.showComplexity = true;
                                                                                                                            $scope.complexity = response.data.data.textualComplexity;
                                                                                                                            var intervalComplexity = setInterval(
                                                                                                                                    function () {
                                                                                                                                        if ($scope.complexity.count == response.data.data.textualComplexity.count) {
                                                                                                                                            clearInterval(intervalComplexity);
                                                                                                                                            courseDescriptionToggle('#textual-complexity');
                                                                                                                                        }
                                                                                                                                    }, 1000);

                                                                                                                            $scope.showStats = true;
                                                                                                                            $scope.pages = response.data.data.pages;
                                                                                                                            $scope.paragraphs = response.data.data.paragraphs;
                                                                                                                            $scope.sentences = response.data.data.sentences;
                                                                                                                            $scope.words = response.data.data.words;
                                                                                                                            $scope.contentWords = response.data.data.contentWords;
                                                                                                                            $scope.colors = response.data.data.colors;
                                                                                                                            $scope.images = response.data.data.images;

                                                                                                                            $scope.showWords = true;
                                                                                                                            $scope.positiveWords = response.data.data.positiveWords;
                                                                                                                            $scope.negativeWords = response.data.data.negativeWords;

                                                                                                                            // show LIWC
                                                                                                                            // valences
                                                                                                                            $scope.showValences = true;
                                                                                                                            $scope.liwcEmotions = response.data.data.liwcEmotions;
                                                                                                                            var intervalLiwc = setInterval(
                                                                                                                                    function () {
                                                                                                                                        if ($scope.liwcEmotions.count == response.data.data.liwcEmotions.count) {
                                                                                                                                            clearInterval(intervalLiwc);
                                                                                                                                            courseDescriptionToggle('#liwc-sentiments');
                                                                                                                                        }
                                                                                                                                    }, 1000);

                                                                                                                            $scope.showSemanticRelevance = true;
                                                                                                                            // specific keywords
                                                                                                                            $scope.keywords = response.data.data.keywords;
                                                                                                                            // keywords document
                                                                                                                            // relevance
                                                                                                                            $scope.keywordsDocumentCoverage = response.data.data.keywordsDocumentRelevance;

                                                                                                                        },
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.status == 0) {
                                                                                                                                alert('Server error occured!');
                                                                                                                            } else {
                                                                                                                                alert(response.statusText);
                                                                                                                            }

                                                                                                                        });
                                                                                                        break;
                                                                                                }
                                                                                            }

                                                                                        }])
                                                                                    .controller(
                                                                                            'DemoVcopController',
                                                                                    [
                                                                                        '$scope',
                                                                                        '$http',
                                                                                        '$sce',
                                                                                        'Upload',
                                                                                        '$timeout',
                                                                                        function ($scope, $http, $sce, Upload, $timeout) {

                                                                                            // texts
                                                                                            $scope.title = DemoTexts.vcop.title;

                                                                                            // options for selectable fields
                                                                                            $scope.vcopCommunityOptions = DemoElements.vcopCommunityOptions;
                                                                                            $scope.textualComplexityOptions = DemoElements.textualComplexityOptions;

                                                                                            $scope.formData = {
                                                                                                community: DemoElements.defaultVcopCommunityOptions,
                                                                                                useTextualComplexity: DemoElements.defaulttextualComplexityOptions,
                                                                                                monthIncrement: DemoElements.defaultMonthIncrement,
                                                                                                dayIncrement: DemoElements.defaultDayIncrement
                                                                                            };

                                                                                            $scope.loading = false;

                                                                                            $scope.communityNodes = null;
                                                                                            $scope.communityEdges = null;

                                                                                            $scope.communityInTimeFrameNodes = null;
                                                                                            $scope.communityInTimeFrameEdges = null;

                                                                                            $scope.communityInTimeList = null;
                                                                                            $scope.communityInTimeNodes = null;
                                                                                            $scope.communityInTimeEdges = null;

                                                                                            $scope.buttonClick = function (req) {

                                                                                                $scope.showCommunityGraph = false;
                                                                                                $scope.showCommunityInATimeFrameGraph = false;
                                                                                                $scope.showCommunityInTimeGraph = false;

                                                                                                var endpoint;
                                                                                                switch (req) {
                                                                                                    case 'Community':

                                                                                                        $scope.loading = true;

                                                                                                        endpoint = 'vcop';

                                                                                                        var data = {
                                                                                                            community: $scope.formData.community.value,
                                                                                                            startDate: $scope.formData.startDate,
                                                                                                            endDate: $scope.formData.endDate,
                                                                                                            monthIncrement: $scope.formData.monthIncrement,
                                                                                                            dayIncrement: $scope.formData.dayIncrement,
                                                                                                            useTextualComplexity: $scope.formData.useTextualComplexity.value
                                                                                                        };

                                                                                                        var params = {};

                                                                                                        $http
                                                                                                                .post(
                                                                                                                        buildServerPath(
                                                                                                                                endpoint,
                                                                                                                                params), data)
                                                                                                                .then(
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.data.success != true) {
                                                                                                                                alert('Server error occured!');
                                                                                                                                return;
                                                                                                                            }

                                                                                                                            // build all the
                                                                                                                            // community
                                                                                                                            $scope.showCommunityGraph = true;
                                                                                                                            $scope.communityNodes = response.data.data.participantInteractionAllDocuments.nodes;
                                                                                                                            $scope.communityEdges = response.data.data.participantInteractionAllDocuments.links;

                                                                                                                            var intervalParticipantInteraction = setInterval(
                                                                                                                                    function () {
                                                                                                                                        if ($scope.communityEdges.count == response.data.data.participantInteractionAllDocuments.links.count) {
                                                                                                                                            clearInterval(intervalParticipantInteraction);
                                                                                                                                            d3jsForTopicsForvCop(
                                                                                                                                                    response.data.data.participantInteractionAllDocuments,
                                                                                                                                                    "#communityGraph",
                                                                                                                                                    false);
                                                                                                                                        }
                                                                                                                                    }, 1000);

                                                                                                                            // build community
                                                                                                                            // from start to end
                                                                                                                            $scope.showCommunityInATimeFrameGraph = true;
                                                                                                                            $scope.communityInTimeFrameNodes = response.data.data.participantInteractionStartEndDate.nodes;
                                                                                                                            $scope.communityInTimeFrameEdges = response.data.data.participantInteractionStartEndDate.links;
                                                                                                                            var intervalCommunityInTimeFrame = setInterval(
                                                                                                                                    function () {
                                                                                                                                        if ($scope.communityInTimeFrameEdges.count == response.data.data.participantInteractionStartEndDate.links.count) {
                                                                                                                                            clearInterval(intervalCommunityInTimeFrame);
                                                                                                                                            d3jsForTopicsForvCop(
                                                                                                                                                    response.data.data.participantInteractionStartEndDate,
                                                                                                                                                    "#communityInATimeFrameGraph",
                                                                                                                                                    false);
                                                                                                                                        }
                                                                                                                                    }, 1000);

                                                                                                                            // build community
                                                                                                                            // from start to end
                                                                                                                            $scope.showCommunityInTimeGraph = true;
                                                                                                                            $scope.communityInTimeList = response.data.data.participantInteractionInTimeList;

                                                                                                                            var i = 0;
                                                                                                                            $scope.communityParticipantInteractionInTimeEdges = null;
                                                                                                                            var intervalparticipantInteractionInTime = setInterval(
                                                                                                                                    function () {
                                                                                                                                        response.data.data.participantInteractionInTimeList
                                                                                                                                                .forEach(function (
                                                                                                                                                        participantInteractionInTime,
                                                                                                                                                        index) {
                                                                                                                                                    console
                                                                                                                                                            .log(participantInteractionInTime);
                                                                                                                                                    $scope.communityParticipantInteractionInTimeEdges = participantInteractionInTime.links;
                                                                                                                                                    if ($scope.communityParticipantInteractionInTimeEdges.count == response.data.data.participantInteractionInTimeList[index].links.count) {
                                                                                                                                                        clearInterval(intervalparticipantInteractionInTime);
                                                                                                                                                        d3jsForTopicsForvCoPSubcommunities(
                                                                                                                                                                participantInteractionInTime,
                                                                                                                                                                "#communityInTimeGraph"
                                                                                                                                                                + index,
                                                                                                                                                                false);

                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                    }, 1000);
                                                                                                                        },
                                                                                                                        function (response) {

                                                                                                                            $scope.loading = false;

                                                                                                                            if (response.status == 0) {
                                                                                                                                alert('Server error occured!');
                                                                                                                            } else {
                                                                                                                                alert(response.statusText);
                                                                                                                            }

                                                                                                                        });
                                                                                                        break;
                                                                                                }
                                                                                            }

                                                                                        }]).controller(
                                                                                    'ContactController',
                                                                            [
                                                                                '$scope',
                                                                                '$http',
                                                                                '$sce',
                                                                                function ($scope, $http, $sce) {

                                                                                    // texts
                                                                                    $scope.title = DemoTexts.contact.title;

                                                                                    $scope.loading = false;

                                                                                    $scope.formData = {
                                                                                        name: '',
                                                                                        email: '',
                                                                                        title: '',
                                                                                        message: ''
                                                                                    };

                                                                                    $scope.sendMessage = function () {

                                                                                        $scope.showResponse = false;

                                                                                        var endpoint;

                                                                                        $scope.loading = true;

                                                                                        endpoint = 'sendContactEmail';
                                                                                        var data = {
                                                                                            name: $scope.formData.name,
                                                                                            email: $scope.formData.email,
                                                                                            subject: $scope.formData.subject,
                                                                                            message: $scope.formData.message
                                                                                        };

                                                                                        var params = {};

                                                                                        $http.post(
                                                                                                buildServerPath(endpoint, params),
                                                                                                data).then(function (response) {

                                                                                            $scope.loading = false;
                                                                                            $scope.showResponse = true;

                                                                                            if (response.data.success != true) {
                                                                                                alert('Server error occured!');
                                                                                                return;
                                                                                            }

                                                                                            $scope.message = response.data.mailgun.message;
                                                                                            $scope.showSuccess = true;


                                                                                        }, function (response) {

                                                                                            $scope.loading = false;

                                                                                            if (response.status == 0) {
                                                                                                alert('Server error occured!');
                                                                                            } else {
                                                                                                alert(response.statusText);
                                                                                            }

                                                                                        });
                                                                                    }

                                                                                }]).controller('ProjectsController',
                                                                            ['$scope', function ($scope) {

                                                                                    $scope.projectsList = Projects;

                                                                                }])
                                                                        })();