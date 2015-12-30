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
		
			$scope.q = DemoText;
			//$scope.tabDemo = 'TEXT_PROCESSING';
			//$scope.tabDemo = 'SEMANTIC_ANNOTATION';
			$scope.tabDemo = 'SELF_EXPLANATION';
			$scope.lsaOptions = '';
			$scope.ldaOptions = '';
			
			$scope.tabSemanticAnnotation = 'SEMANTIC_CONCEPT';
			
			$scope.languages = [
 				{id: '1', name: 'English', value: 'eng'},
 	            {id: '2', name: 'French', value: 'fr'}
             ];
			
			$scope.lsaOptionsByLanguage = {
				eng: [
				    {id: '1', name: '', value: ''},
	 				{id: '2', name: 'tasa_en', value: 'tasa_en'},
	 	            {id: '3', name: 'tasa_lak_en', value: 'tasa_lak_en'},
	 	            {id: '4', name: 'financial_en', value: 'financial_en'}
	             ],
	             fr: [
	 				{id: '1', name: '', value: ''},
	 	            {id: '2', name: 'lemonde_fr', value: 'lemonde_fr'},
	 	            {id: '3', name: 'textenfants_fr', value: 'textenfants_fr'}
	             ],
	             it: [
	                {id: '1', name: '', value: ''}
	             ],
	             es: [
	                {id: '1', name: '', value: ''},
	                {id: '2', name: 'joseantonio_es', value: 'joseantonio_es'}
	             ]
			}
			
			$scope.ldaOptionsByLanguage = {
				eng: [
				    {id: '1', name: '', value: ''},
	 				{id: '2', name: 'tasa_en', value: 'tasa_en'},
	 	            {id: '3', name: 'tasa_lak_en', value: 'tasa_lak_en'},
	 	            {id: '4', name: 'tasa_smart_cities_en', value: 'tasa_smart_cities_en'}
	             ],
	             fr: [
	 				{id: '1', name: '', value: ''},
	 	            {id: '2', name: 'lemonde_fr', value: 'lemonde_fr'},
	 	            {id: '3', name: 'textenfants_fr', value: 'textenfants_fr'},
	 	            {id: '4', name: 'philosophy_fr', value: 'philosophy_fr'}
	             ],
	             it: [
	                {id: '1', name: '', value: ''},
	                {id: '2', name: 'paisa_it', value: 'paisa_it'}
	             ],	             
	             es: [
	                {id: '1', name: '', value: ''},
	                {id: '2', name: 'joseantonio_es', value: 'joseantonio_es'}
	             ]
			}
			
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
				selfText : 'Ce soir-là, la famille de Matilda dînait comme d’habitude devant la télévision, ' + 
					'quand ils entendirent une voix forte venant du salon dire : « salut, salut, salut ». ' + 

					'La mère devint toute blanche. Elle dit à son mari « il y a quelqu’un dans la  ' + 

					'maison ». Ils arrêtèrent tous de manger. Ils étaient tous sur le qui-vive. La voix  ' +  

					'reprit « salut, salut, salut ». Le frère se mit à crier « ça recommence ! ». Matilda se  ' + 

					'leva et alla éteindre la télévision.  '  + String.fromCharCode(13) +

					'La mère, paniquée, dit à son mari : « Henri, des voleurs, ils sont dans le salon, tu  ' + 

					'devrais y aller ». Le père, raide sur sa chaise ne bougea pas. Il n’avait pas envie de  ' + 

					'jouer au héros.  ' +  String.fromCharCode(13) +

					'Sa femme lui dit : « Alors, tu te décides ? Ils doivent être en train de faucher  ' + 

					'l’argenterie ! ».  ' + String.fromCharCode(13) +

					'Monsieur Verdebois s’essuya nerveusement les lèvres avec sa serviette et  ' + 

					'proposa d’aller voir tous ensemble. La mère attrapa un tisonnier au coin de la  ' + 

					'cheminée. Le père s’arma d’une canne de golf posée dans un coin. Le frère attrapa  ' + 

					'un tabouret. Matilda prit le couteau avec lequel elle mangeait. Puis ils se  ' + 

					'dirigèrent tous les quatre vers la porte du salon en marchant sur la pointe des  ' + 

					'pieds. '  + String.fromCharCode(13) +

					'À ce moment-là, ils entendirent à nouveau la voix. Matilda fit alors irruption dans  ' + 

					'la pièce en brandissant son couteau et cria « haut les mains, vous êtes pris ! ». Les  ' + 

					'autres la suivirent en agitant leurs armes. Puis, ils s’arrêtèrent pour regarder  ' + 

					'autour d’eux. Ils ne virent personne. Le père fut soulagé et dit « il n’y a pas de  ' + 

					'voleur ici ». Sa femme lui répondit d’une voix tremblante « mais Henri, je l’ai  ' + 

					'entendu, et toi aussi ». Matilda appuya la réponse de sa mère en ajoutant « je suis  ' + 

					'sûre de l’avoir entendu, il est ici quelque part ».'  + String.fromCharCode(13) + 
					
					'C’est alors que la voix s’éleva à nouveau. Ils sursautèrent tous, y compris Matilda  ' + 

					'qui jouait très bien la comédie. Ils inspectèrent la grande pièce. Ils ne trouvèrent   ' + 

					'toujours personne. Matilda dit alors que c’était un fantôme : « Le salon est hanté,   ' + 

					'je croyais que vous le saviez. Je sais que c’est le fantôme, je l’ai déjà entendu ici ».   ' + 

					'Les parents, très pâles, sortirent du salon suivis par les enfants.   ' + String.fromCharCode(13) +

					'Plus tard, suivie de son frère, Matilda retourna dans la pièce. C’est alors qu’elle  ' +  

					'sortit du manteau de la cheminée le perroquet de leur copain Arthur. Ils   ' + 

					'éclatèrent alors de rire. Ils passèrent par la porte de derrière en emmenant   ' + 

					'l’animal avec eux. Matilda rendit son perroquet à Arthur et lui raconta la soirée. Il  ' +  

					'n’y eut plus jamais de fantôme chez les Verdebois.' + 
					
					'j’ ai l’ impression' + 
					
					'j’ me souviens'
					,
				selfExplanation: 'y a la famille de Matilda ben ils sont en train de manger et soudain y a quelqu\'un qui entre en disant salut salut salut. Après ils croient que c\'étaient des voleurs alors ils prennent des armes et ils vont vers le voleur. Y en a qui croient que c\'est des voleurs mais le père il croit pas. Et la femme et Matilda ils croient elles croient que c\'est des voleurs. Et après Matilda elle dit que c\'est un fantôme et qu\'il hante la salle. Et après ils sortent tous du salon.',
				selfLanguage: {id: '2', name: 'French', value: 'fr'},
				selfLSA: '',
				selfLDA: '',
				selfPosTagging : {id: '2', name: 'No', value: false},
				selfPosTaggingOptions : [
     				{id: '1', name: 'Yes', value: true},
     	            {id: '2', name: 'No', value: false}
                ]
			};
			
			$scope.$watch('selfExplanationFormData.selfLanguage', function() {
				$scope.lsaOptions = $scope.lsaOptionsByLanguage[$scope.selfExplanationFormData.selfLanguage.value];
				$scope.ldaOptions = $scope.ldaOptionsByLanguage[$scope.selfExplanationFormData.selfLanguage.value];
			});
	
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
				
				$scope.showReadingStrategies = false;
				
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
						lang: $scope.selfExplanationFormData.selfLanguage.value,
						lsa: 'resources/config/LSA/' + $scope.selfExplanationFormData.selfLSA.value, 
						lda: 'resources/config/LDA/' + $scope.selfExplanationFormData.selfLDA.value,
						postagging: false, // put pos value here
					}
					// buildPathSemanticProcess is ok for buildPathSelfExplanation
					$http.post($scope.buildPathSemanticProcess(endpoint), data).then(function(response) {
						$scope.loading = false;
						if (response.data.success != true) {
							alert('Server error occured!');
							return;
						}
						$scope.showReadingStrategies = true;
						$scope.initialTextColored = $sce.trustAsHtml(response.data.data.initialTextColored);
						$scopr.alternateText = $sce.trustAsHtml(response.data.data.alternateText);
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
				}
			}
		   
		}])
		
	.controller('ProjectsController', ['$scope', function($scope){

	 	 	$scope.projectsList = Projects;
		   
		}])
})();