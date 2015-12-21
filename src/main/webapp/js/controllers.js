"use strict";

(function(){
	angular.module('controllers', ['services'])
	.controller('AppController', ['$location', function($location){
			var vm = this;  // Use 'controller as' syntax.    
		   
		}])
		
	.controller('HeaderController', ['$scope', '$window', function($scope, $window){

			
			$scope.hamburgerMenu = false;
		
			
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
	.controller('ReaderMenuController', ['$scope', '$window', function($scope, $window){
		
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
		
	.controller('DemoController', ['$scope', '$http', function($scope, $http){
		
			$scope.q = DemoText;
			//$scope.tabDemo = 'TEXT_PROCESSING';
			$scope.tabDemo = 'SEMANTIC_ANNOTATION';
			
			// semantic annotation data
			$scope.useUri = false;
			$scope.semanticUrl = '';
			$scope.semanticFile = 'MS_training_SE_1999';
			$scope.semanticAbstract = 'This research examines the effectiveness of a training intervention program designed to improve strategies for learning from texts and to determine whether the success of this intervention depends on readers\' individual differences. Previous research has shown that readers who self-explain text aloud understand more from a text and construct better mental models of the content. However, some readers are poor self-explainers and gain little from the self-explanation process. This study examined the benefits of providing training in the use of self-explanation to undergraduate college students. Effects of prior knowledge, reading skill, and working memory capacity were also examined in relation to the benefits of self-explaining and self-explanation training. We found that comprehension and the benefits of self-explanation depended largely on prior knowledge. Training was more effective for low-knowledge readers, but only in terms of improving memory for the text. Training did not improve the low-knowledge readers\' understanding of the text at a conceptual level.';
			$scope.semanticKeywords = 'self explanation, reading strategy, comprehension prediction and performance';
			$scope.semanticLanguage = 'eng';
			$scope.semanticLSA = 'tasa_lak_en';
			$scope.semanticLDA = 'tasa_lak_en';
			$scope.semanticPosTagging = {id: '2', name: 'No', value: false};
			$scope.semanticPosTaggingOptions = [
				{id: '1', name: 'Yes', value: true},
	            {id: '2', name: 'No', value: false}
            ];
			$scope.semanticThreshold = 0.3;
			    
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
			$scope.uri = "MS_training_SE_1999";
		
			$scope.buttonClick = function(req) {
				$scope.showSentiment = false;
				$scope.showComplexity = false
				$scope.showConcept = false;
				$scope.showSearch = false;
				
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
								d3jsForTopics(response.data.data);
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
								d3jsForTopics(response.data.data);
							}
				        }, 1000);
					});
					break;
				case 'SEMANTIC_PROCESS':
					$scope.loading = true;
					endpoint = 'semanticProcess';
					//console.log('you clicked concept');
					$http.post($scope.buildPathSemanticProcess(endpoint), {
						q: encodeURIComponent($scope.uri).replace(/%0D/g,"%0A"), // TODO: check if file upload or url here
						abstract: $scope.semanticAbstract,
						keywords: $scope.semanticKeywords,
						lang: $scope.semanticLanguage, // TODO: check if language is ok eng
						lsa: 'resources/config/LSA/' + $scope.semanticLSA, 
						lda: 'resources/config/LDA/' + $scope.semanticLDA,
						postagging: false, // put pos value here
						threshold: $scope.semanticThreshold
					}).then(function(response) {
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
								d3jsForTopics(response.data.data);
							}
				        }, 1000);
						//console.log($scope.topics);
					});
					break;
				}
			}
		   
		}])
		
	.controller('ProjectsController', ['$scope', function($scope){

	 	 	$scope.projectsList = Projects;
		   
		}])
})();