"use strict";

(function(){
	angular.module('controllers', ['services'])
	.controller('AppController', ['$location', function($location){
			var vm = this;  // Use 'controller as' syntax.    
		   
		}])
		
	.controller('HeaderController', ['$scope', '$window', function($scope, $window){

			$scope.navItems = NavBarItems;
			$scope.hamburgerMenu = false;
			$scope.searchQuery = false;
			
			$scope.openSearch = function(){
				$scope.searchQuery = !$scope.searchQuery;
			}
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
		
	.controller('HomeController', ['$scope', function($scope){

		 	
		}])
		
	.controller('ContactController', ['$scope', function($scope){

		   
		}])
		
	.controller('PeopleController', ['$scope', function($scope){

	 	 	$scope.peopleList = People;
		   
		}])
		
	.controller('DemoController', ['$scope', '$http', function($scope, $http){
		
			$scope.q = DemoText;
			//$scope.tabDemo = 'TEXT_PROCESSING';
			$scope.tabDemo = 'SEMANTIC_ANNOTATION';
			
			$scope.tabSemanticAnnotation = 'SEMANTIC_CONCEPT';
			
			// Semantic Annotation Form Data
			$scope.semanticAnnotationFormData = {
				semanticUrl : 'https://linkededucation.files.wordpress.com/2013/03/lak-dataset-taibi.pdf',
				semanticFile : 'MS_training_SE_1999',
				semanticAbstract : 'This paper describes the Learning Analytics and Knowledge ' + 
					'(LAK) Dataset, an unprecedented collection of structured data ' +
					'created from a set of key research publications in the emerging ' +
					'field of learning analytics. The unstructured publications have ' +
					'been processed and exposed in a variety of formats, most notably ' +
					'according to Linked Data principles, in order to provide simplified ' +
					'access for researchers and practitioners. The aim of this dataset is ' +
					'to provide the opportunity to conduct investigations, for instance, ' +
					'about the evolution of the research field over time, correlations ' +
					'with other disciplines or to provide compelling applications which ' +
					'take advantage of the dataset in an innovative manner. In this ' +
					'paper, we describe the dataset, the design choices and rationale ' +
					'and provide an outlook on future investigations.',
				semanticKeywords : 'educational data mining, learning analytics, dataset',
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
					selfText : 'This paper describes the Learning Analytics and Knowledge ' + 
						'(LAK) Dataset, an unprecedented collection of structured data ' +
						'created from a set of key research publications in the emerging ' +
						'field of learning analytics. The unstructured publications have ' +
						'been processed and exposed in a variety of formats, most notably ' +
						'according to Linked Data principles, in order to provide simplified ' +
						'access for researchers and practitioners. The aim of this dataset is ' +
						'to provide the opportunity to conduct investigations, for instance, ' +
						'about the evolution of the research field over time, correlations ' +
						'with other disciplines or to provide compelling applications which ' +
						'take advantage of the dataset in an innovative manner. In this ' +
						'paper, we describe the dataset, the design choices and rationale ' +
						'and provide an outlook on future investigations.',
					selfLanguage: 'eng',
					selfLSA: 'tasa_lak_en',
					selfLDA: 'tasa_lak_en',
					selfPosTagging : {id: '2', name: 'No', value: false},
					selfPosTaggingOptions : [
	     				{id: '1', name: 'Yes', value: true},
	     	            {id: '2', name: 'No', value: false}
	                 ],
	                 selfThreshold: 0.3
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
			
			$scope.changeTabSemanticAnnotation = function(tabName) {
				$scope.tabSemanticAnnotation = tabName;
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
			
			$scope.loading = false;
			$scope.loadingpdf = false;
			$scope.showSentiment = false;
			$scope.showComplexity = false
			$scope.showConcept = false;
			$scope.showSearch = false;
			
			$scope.showSemanticConcept = false;
			
			$scope.sentiments = null;
			$scope.complexity = null;
			$scope.topics = null;
			$scope.topicEdges = null;
			$scope.search = null;
			$scope.uri = "";
		
			$scope.buttonClick = function(req) {
				$scope.showSentiment = false;
				$scope.showComplexity = false
				$scope.showConcept = false;
				$scope.showSearch = false;
				
				$scope.showSemanticConcept = false;
				$scope.showSemanticRelevance = false;
				$scope.showSemanticCategories = false;
				
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
						$scope.showConcept = true;
						$scope.topics = response.data.data.nodes;
						$scope.topicEdges = response.data.data.links;
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data, "#conceptMap");
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
						$scope.showConcept = true;
						$scope.topics = response.data.data.nodes;
						$scope.topicEdges = response.data.data.links;
						var interval = setInterval(function()
				        {
							if($scope.topicEdges.count == response.data.data.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data, "#conceptMap");
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
						
						$scope.showSemanticConcept = true;
						$scope.showSemanticRelevance = true;
						$scope.showSemanticCategories = true;
						
						$scope.semanticTopics = response.data.data.concepts.nodes;
						$scope.semanticTopicEdges = response.data.data.concepts.links;
						$scope.semanticAbstractDocumentSimilarity = response.data.data.abstractDocumentSimilarity;
						$scope.semanticKeywordsAbstractCoverage = response.data.data.keywordsAbstractCoverage;
						$scope.semanticKeywordsDocumentCoverage = response.data.data.keywordsDocumentCoverage;
						$scope.semanticKeywords = response.data.data.keywords;
						$scope.semanticCategories = response.data.data.categories;
						
						var interval = setInterval(function()
				        {
							if($scope.semanticTopicEdges.count == response.data.data.concepts.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data.concepts, "#semanticConceptMap");
							}
				        }, 1000);
						//console.log($scope.topics);
					});
					break;
				case 'SELF_EXPLANATION':
					$scope.loading = true;
					endpoint = 'selfExplanation';
					//console.log('you clicked concept');
					var data = {
						text: $scope.selfExplanationFormData.selfText,
						explanation: $scope.selfExplanationFormData.selfExplanation,
						lang: $scope.selfExplanationFormData.selfLanguage, // TODO: check if language is ok eng
						lsa: 'resources/config/LSA/' + $scope.selfExplanationFormData.selfLSA, 
						lda: 'resources/config/LDA/' + $scope.selfExplanationFormData.selfLDA,
						postagging: false, // put pos value here
						threshold: $scope.selfExplanationFormData.selfThreshold
					}
					// buildPathSemanticProcess is ok for buildPathSelfExplanation
					$http.post($scope.buildPathSemanticProcess(endpoint), data).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						
						$scope.showReadingStrategies = true;
						
						/*$scope.semanticTopics = response.data.data.concepts.nodes;
						$scope.semanticTopicEdges = response.data.data.concepts.links;
						$scope.semanticAbstractDocumentSimilarity = response.data.data.abstractDocumentSimilarity;
						$scope.semanticKeywordsAbstractCoverage = response.data.data.keywordsAbstractCoverage;
						$scope.semanticKeywordsDocumentCoverage = response.data.data.keywordsDocumentCoverage;
						$scope.semanticKeywords = response.data.data.keywords;
						$scope.semanticCategories = response.data.data.categories;
						
						var interval = setInterval(function()
				        {
							if($scope.semanticTopicEdges.count == response.data.data.concepts.links.count)
							{
								clearInterval(interval);
								d3jsForTopics(response.data.data.concepts, "#semanticConceptMap");
							}
				        }, 1000);
						//console.log($scope.topics);*/
					});
					break;
				}
			}
		   
		}])
		
	.controller('ProjectsController', ['$scope', function($scope){

	 	 	$scope.projectsList = Projects;
		   
		}])
})();