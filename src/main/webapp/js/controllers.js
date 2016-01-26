"use strict";

(function(){
	angular.module('controllers', ['services'])
	.controller('AppController', ['$location', function($location){
			var vm = this;  // Use 'controller as' syntax.    
		   
		}])
		
	.controller('HeaderController', ['$scope', '$window', function($scope, $window){

			$scope.hamburgerMenu = true;
			
			$scope.openMenu = function(){
				$scope.hamburgerMenu = !$scope.hamburgerMenu;
				
			}  
			
//			angular.element($window).bind("scroll", function() {
//				console.log("in scroll")
//				 if (this.pageYOffset >= 70) {
//	                 $scope.isFixed = false;
//	                 console.log( $scope.isFixed)
//	             } else {
//	                 $scope.isFixed = true;
//	                 console.log( $scope.isFixed)
//	             }
//				 return $scope.isFixed;
//			 })
		 	
		}])
	.controller('ReaderMenuController', ['$scope', function($scope){
	
		$scope.navItems = NavBarItems;
		 	
	}])
	.controller('HomeController', ['$scope', function($scope){
		$scope.browseSections = BrowseItems;
		$scope.aboutSections = AboutSections; 	
		}])
		
	.controller('ContactController', ['$scope', function($scope){

		   
		}])
	.controller('PublicationsController', ['$scope', function($scope){
		$scope.publications = Publications;
		   
		}])
	.controller('PeopleController', ['$scope', function($scope){

			$scope.peopleListUPB = PeopleUPB;
	 	 	$scope.peopleListLSE = PeopleLSE;
	 	 	$scope.peopleListLMU = PeopleLMU;
	 	 	$scope.peopleListUSA = PeopleUSA;
		   
		}])
		
	.controller('DemoController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
		
			$scope.q = DemoTexts.textProcessing.text;
			//$scope.tabDemo = 'TEXT_PROCESSING';
			//$scope.tabDemo = 'SEMANTIC_ANNOTATION';
			//$scope.tabDemo = 'SELF_EXPLANATION';
			$scope.tabDemo = 'CSCL';
			$scope.lsaOptions = '';
			$scope.ldaOptions = '';
			
			$scope.languages = [
 				{id: '1', name: 'English', value: 'eng'},
 	            {id: '2', name: 'French', value: 'fr'}
             ];
			
			$scope.posTaggingOptions = [
 				{id: '1', name: 'Yes', value: true},
 	            {id: '2', name: 'No', value: false}
            ];
			
			$scope.lsaOptionsByLanguage = {
				eng: [
	 				{id: '1', name: 'tasa_en', value: 'tasa_en'},
	 	            {id: '2', name: 'tasa_lak_en', value: 'tasa_lak_en'},
	 	            {id: '3', name: 'financial_en', value: 'financial_en'},
	 	            {id: '4', name: '', value: ''}
	             ],
	             fr: [
	 	            {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
	 	            {id: '2', name: 'textenfants_fr', value: 'textenfants_fr'},
	 	            {id: '3', name: '', value: ''}
	             ],
	             it: [
	                {id: '1', name: '', value: ''}
	             ],
	             es: [
	                {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'},
	                {id: '2', name: '', value: ''}
	             ]
			}
			
			$scope.ldaOptionsByLanguage = {
				eng: [
	 				{id: '1', name: 'tasa_en', value: 'tasa_en'},
	 	            {id: '2', name: 'tasa_lak_en', value: 'tasa_lak_en'},
	 	            {id: '3', name: 'tasa_smart_cities_en', value: 'tasa_smart_cities_en'},
	 	            {id: '4', name: '', value: ''}
	             ],
	             fr: [
	 	            {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
	 	            {id: '2', name: 'textenfants_fr', value: 'textenfants_fr'},
	 	            {id: '3', name: 'philosophy_fr', value: 'philosophy_fr'},
	 	            {id: '4', name: '', value: ''}
	             ],
	             it: [
	                {id: '1', name: 'paisa_it', value: 'paisa_it'},
	                {id: '2', name: '', value: ''}
	             ],	             
	             es: [
	                {id: '1', name: 'joseantonio_es', value: 'joseantonio_es'},
	                {id: '2', name: '', value: ''}
	             ]
			}
			
			// Semantic Annotation Form Data
			$scope.semanticAnnotationFormData = {
				semanticUrl : 'https://linkededucation.files.wordpress.com/2013/03/lak-dataset-taibi.pdf',
				semanticFile : 'MS_training_SE_1999',
				semanticAbstract : DemoTexts.semanticAnnotation.abstractText,
				semanticKeywords : DemoTexts.semanticAnnotation.keywods,
				semanticLanguage: 'eng',
				semanticLSA: 'tasa_lak_en',
				semanticLDA: 'tasa_lak_en',
				semanticPosTagging : {id: '2', name: 'No', value: false},
				semanticPosTaggingOptions : [
     				{id: '1', name: 'Yes', value: true},
     	            {id: '2', name: 'No', value: false}
                ],
                semanticThreshold: 0.3
			};
			
			$scope.selfExplanationFormData = {
				text: DemoTexts.selfExplanation.text,
				explanation: DemoTexts.selfExplanation.explanation,
				language: {id: '2', name: 'French', value: 'fr'},
				lsa: {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
				lda: {id: '1', name: 'lemonde_fr', value: 'lemonde_fr'},
				posTagging : {id: '1', name: 'Yes', value: true}
			};
			
			$scope.$watch('selfExplanationFormData.language', function() {
				$scope.lsaOptions = $scope.lsaOptionsByLanguage[$scope.selfExplanationFormData.language.value];
				$scope.ldaOptions = $scope.ldaOptionsByLanguage[$scope.selfExplanationFormData.language.value];
			});
			
			$scope.$watch('csclFormData.language', function() {
				$scope.lsaOptions = $scope.lsaOptionsByLanguage[$scope.csclFormData.language.value];
				$scope.ldaOptions = $scope.ldaOptionsByLanguage[$scope.csclFormData.language.value];
			});
			
			$scope.csclFormData = {
					conversation: DemoTexts.csclProcessing.conversation,
					language: {id: '1', name: 'English', value: 'eng'},
					lsa: {id: '1', name: 'tasa_en', value: 'tasa_en'},
					lda: {id: '1', name: 'tasa_en', value: 'tasa_en'},
					posTagging: {id: '1', name: 'Yes', value: true},
					threshold: 0.3
				};
	
			$scope.useUri = false;
			$scope.semanticTopics = null;
			$scope.semanticTopicEdges = null;
			$scope.semanticAbstractDocumentSimilarity = -1;
			$scope.semanticKeywordsAbstractCoverage = -1;
			$scope.semanticKeywordsDocumentCoverage = -1;
			$scope.semanticKeywords = null;
			$scope.semanticCategories = null;
			    
			$scope.SERVER_DELIM = '/';
			$scope.SERVER_SEMICOLON = ':';
			$scope.SERVER_PROTOCOL = 'http';
			//$scope.SERVER_IP = '141.85.227.48';
			$scope.SERVER_IP = window.location.hostname;
			$scope.SERVER_PORT = '8080';
			
			$scope.SERVER_URL = 
				$scope.SERVER_PROTOCOL + $scope.SERVER_SEMICOLON + $scope.SERVER_DELIM + $scope.SERVER_DELIM + 
				$scope.SERVER_IP + $scope.SERVER_SEMICOLON + 
				$scope.SERVER_PORT + $scope.SERVER_DELIM;
			
			$scope.changeDocumentUseUri = function(useUri) {
				$scope.useUri = useUri;
			}
			
			$scope.changeTab = function(tabName) {
				$scope.tabDemo = tabName;
			}
			
			$scope.buildPath = function(path) {
				return $scope.SERVER_URL + path + '?q=' + encodeURIComponent($scope.q).replace(/%0D/g,"%0A") + 
				'&lsa=resources/config/LSA/tasa_en&lda=resources/config/LDA/tasa_en&lang=en&postagging=false';
			}
			
			$scope.buildPathTopics = function(path) {
				return $scope.SERVER_URL + path + '?q=' + encodeURIComponent($scope.q).replace(/%0D/g,"%0A") + 
				'&lsa=resources/config/LSA/tasa_en&lda=resources/config/LDA/tasa_en&lang=en&postagging=false&threshold=0.3';
			}
			
			$scope.buildPathSearch = function(path) {
				return $scope.SERVER_URL + path + '?q=' + encodeURIComponent($scope.q).replace(/%0D/g,"%0A") + 
				'&path=tasa_search_en';
			}
			
			$scope.buildPathTopicsPdf = function(path) {
				return $scope.SERVER_URL + path + '?uri=' + encodeURIComponent($scope.uri).replace(/%0D/g,"%0A") + 
				'&lsa=resources/config/LSA/tasa_en&lda=resources/config/LDA/tasa_en&lang=en&postagging=false&threshold=0.3';
			}
			
			$scope.buildPathSemanticProcess = function(path) {
				return $scope.SERVER_URL + path;
			}
			
			$scope.conceptMapTitle = "";
			
			$scope.loading = false;
			$scope.loadingpdf = false;
			$scope.showSentiment = false;
			$scope.showComplexity = false
			$scope.showConcept = false;
			$scope.showSearch = false;
			
			$scope.sentiments = null;
			$scope.complexity = null;
			$scope.topics = null;
			$scope.topicEdges = null;
			$scope.search = null;
			$scope.uri = "";
			
			$scope.collaborationSocialKBNodes = null;
			$scope.collaborationVoiceOverlapNodes = null;
		
			$scope.buttonClick = function(req) {
				$scope.showSentiment = false;
				$scope.showComplexity = false
				$scope.showConcept = false;
				$scope.showSearch = false;
				
				$scope.showSemanticRelevance = false;
				$scope.showSemanticCategories = false;
				
				$scope.showReadingStrategies = false;
				
				$scope.showParticipantInteractionMap = false;
				$scope.showParticipantEvolutionGraph = false;
				$scope.showCollaborationGraphs = false;
				$scope.showParticipantCsclIndices = false;
				
				
				var endpoint;
				switch(req) {
				case 'SENTIMENT':
					$scope.loading = true;
					endpoint = 'getSentiment';
					//console.log('you clicked sentiment');
					$http.get($scope.buildPath(endpoint)).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.showSentiment = true;
						$scope.sentiments = response.data.data;
						var interval = setInterval(function()
				        {
							if($scope.sentiments.count == response.data.data.count)
							{
								clearInterval(interval);
								courseDescriptionToggle();
							}
				        }, 1000);
					});
					break;
				case 'COMPLEXITY':
					$scope.loading = true;
					endpoint = 'getComplexity';
					$http.get($scope.buildPath(endpoint)).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.showComplexity = true;
						$scope.complexity = response.data.data;
						var interval = setInterval(function()
				        {
							if($scope.complexity.count == response.data.data.count)
							{
								clearInterval(interval);
								courseDescriptionToggle();
							}
				        }, 1000);
					});
					break;
				case 'CONCEPT':
					$scope.loading = true;
					endpoint = 'getTopics';
					//console.log('you clicked concept');
					$http.get($scope.buildPathTopics(endpoint)).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.conceptMapTitle = DemoTexts.textProcessing.conceptMapTitle;
						$scope.showConcept = true;
						$scope.topics = response.data.data.nodes;
						$scope.topicEdges = response.data.data.links;
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data, "#conceptMap", true);
							}
				        }, 1000);
						//console.log($scope.topics);
					});
					break;
				case 'SEARCH':
					$scope.loading = true;
					endpoint = 'search';
					$http.get($scope.buildPathSearch(endpoint)).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.showSearch = true;
						$scope.search = response.data.data;
						var interval = setInterval(function()
				        {
							if($scope.search.count == response.data.data.count)
							{
								clearInterval(interval);
								courseDescriptionToggle();
							}
				        }, 1000);
					});
					break;
				case 'CONCEPT_PDF':
					// reads text from PDF document
					$scope.loading = true;
					endpoint = 'getTopicsFromPdf';
					$http.get($scope.buildPathTopicsPdf(endpoint)).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.conceptMapTitle = DemoTexts.textProcessing.conceptMapTitle;
						$scope.showConcept = true;
						$scope.topics = response.data.data.nodes;
						$scope.topicEdges = response.data.data.links;
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data, "#conceptMap", true);
							}
				        }, 1000);
					});
					break;
				case 'SEMANTIC_PROCESS':
					$scope.loading = true;
					endpoint = 'semanticProcess';
					//console.log('you clicked concept');
					var data = {
						uri: "",
						abstract: $scope.semanticAnnotationFormData.semanticAbstract,
						keywords: $scope.semanticAnnotationFormData.semanticKeywords,
						lang: $scope.semanticAnnotationFormData.semanticLanguage, // TODO: check if language is ok eng
						lsa: 'resources/config/LSA/' + $scope.semanticAnnotationFormData.semanticLSA, 
						lda: 'resources/config/LDA/' + $scope.semanticAnnotationFormData.semanticLDA,
						postagging: false, // put pos value here
						threshold: $scope.semanticAnnotationFormData.semanticThreshold
					}
					if ($scope.useUri == true) {
						data.uri = encodeURIComponent($scope.semanticAnnotationFormData.semanticFile).replace(/%0D/g,"%0A");
					}
					else {
						//data.uri = encodeURIComponent($scope.semanticAnnotationFormData.semanticUrl).replace(/%0D/g,"%0A");
						data.uri = $scope.semanticAnnotationFormData.semanticUrl;
					}
					//console.log(data.uri);
					$http.post($scope.buildPathSemanticProcess(endpoint), data).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						
						$scope.conceptMapTitle = DemoTexts.textProcessing.conceptMapTitle;
						$scope.showConcept = true;
						$scope.showSemanticRelevance = true;
						$scope.showSemanticCategories = true;
						
						$scope.topics = response.data.data.concepts.nodes;
						$scope.topicEdges = response.data.data.concepts.links;
						$scope.semanticAbstractDocumentSimilarity = response.data.data.abstractDocumentSimilarity;
						$scope.semanticKeywordsAbstractCoverage = response.data.data.keywordsAbstractCoverage;
						$scope.semanticKeywordsDocumentCoverage = response.data.data.keywordsDocumentCoverage;
						$scope.semanticKeywords = response.data.data.keywords;
						$scope.semanticCategories = response.data.data.categories;
						
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.concepts.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data.concepts, "#conceptMap", true);
							}
				        }, 1000);
						//console.log($scope.topics);
					});
					break;
				case 'SELF_EXPLANATION':
					$scope.loading = true;
					endpoint = 'selfExplanation';
					var data = {
						text: $scope.selfExplanationFormData.text,
						explanation: $scope.selfExplanationFormData.explanation,
						lang: $scope.selfExplanationFormData.language.value,
						lsa: 'resources/config/LSA/' + $scope.selfExplanationFormData.lsa.value, 
						lda: 'resources/config/LDA/' + $scope.selfExplanationFormData.lda.value,
						postagging: $scope.selfExplanationFormData.posTagging.value,
					}
					// buildPathSemanticProcess is ok for buildPathSelfExplanation
					$http.post($scope.buildPathSemanticProcess(endpoint), data).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.showReadingStrategies = true;
						$scope.selfExplanationColored = $sce.trustAsHtml(response.data.data.selfExplanationColored);
						$scope.strategies = response.data.data.strategies;
						var interval = setInterval(function()
				        {
							if($scope.strategies.count == response.data.data.strategies.count)
							{
								clearInterval(interval);
								courseDescriptionToggle();
							}
				        }, 1000);
					});
					break;
				case 'CSCL':
					$scope.loading = true;
					endpoint = 'csclProcessing';
					var data = {
						conversation: $scope.csclFormData.conversation,
						lang: $scope.csclFormData.language.value,
						lsa: 'resources/config/LSA/' + $scope.csclFormData.lsa.value, 
						lda: 'resources/config/LDA/' + $scope.csclFormData.lda.value,
						postagging: $scope.csclFormData.posTagging.value,
						threshold: $scope.csclFormData.threshold
					}
					// buildPathSemanticProcess is ok for buildPathCsclProcessing
					$http.post($scope.buildPathSemanticProcess(endpoint), data).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						
						// build concept map
						$scope.conceptMapTitle = "Concept Map";
						$scope.showConcept = true;
						$scope.topics = response.data.data.concepts.nodes;
						$scope.topicEdges = response.data.data.concepts.links;
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.concepts.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data.concepts, "#conceptMap", true);
							}
				        }, 1000);
						
						// build participant interaction concept map
						$scope.showParticipantInteractionMap = true;
						$scope.participants = response.data.data.participantInteraction.nodes;
						$scope.participantEdges = response.data.data.participantInteraction.links;
						var intervalParticipantInteraction = setInterval(function()
				        {
							if($scope.participantEdges.count == response.data.data.participantInteraction.links.count)
							{
								clearInterval(intervalParticipantInteraction);
								d3jsForTopics(response.data.data.participantInteraction, "#participantInteractionMap", false);
							}
				        }, 1000);
						
						// build participant evolution graph
						$scope.showParticipantEvolutionGraph = true;
						$scope.participantEvolution = response.data.data.participantEvolution;
						var intervalParticipantEvolution = setInterval(function()
				        {
							if($scope.participantEvolution.count == response.data.data.participantEvolution.count)
							{
								clearInterval(intervalParticipantEvolution);
								d3jsMultipleLinesGraph(response.data.data.participantEvolution, "#participantEvolution", "Contribution ID", "value");
							}
				        }, 1000);
						
						$scope.showCollaborationGraphs = true;
						
						// build collaboration kb graph
						// wait for nodes to be loaded
						$scope.collaborationSocialKBNodes = response.data.data.socialKB;
						var intervalCollaborationSocialKB = setInterval(function()
				        {
							if($scope.collaborationSocialKBNodes.count == response.data.data.socialKB.count)
							{
								clearInterval(intervalCollaborationSocialKB);
								d3jsLineGraph(response.data.data.socialKB, "#collaborationSocialKB", "Contribution ID", "Social KB value");
							}
				        }, 1000);
										
						// build collaboration voice graph
						// wait for nodes to be loaded
						$scope.voiceOverlapNodes = response.data.data.voiceOverlap;
						var intervalCollaborationVoiceOverlap = setInterval(function()
				        {
							if($scope.voiceOverlapNodes.count == response.data.data.voiceOverlap.count)
							{
								clearInterval(intervalCollaborationVoiceOverlap);
								d3jsLineGraph(response.data.data.voiceOverlap, "#collaborationVoiceOverlap", "Contribution ID", "Voice PMI");
							}
				        }, 1000);
						
						console.log('test');
						// build cscl indices
						$scope.showParticipantCsclIndices = true;
						console.log('tes2');
						$scope.csclIndices = response.data.data.csclIndices;
						console.log($scope.csclIndices);
						var intervalCsclIndices = setInterval(function()
				        {
							if($scope.csclIndices.count == response.data.data.csclIndices.count)
							{
								clearInterval(intervalCsclIndices);
							}
				        }, 1000);
					});
					break;
				}
			}
		   
		}])
		
	.controller('ProjectsController', ['$scope', function($scope){

	 	 	$scope.projectsList = Projects;
		   
		}])
})();