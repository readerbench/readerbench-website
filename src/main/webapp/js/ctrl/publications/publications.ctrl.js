"use strict";

angular.module('controllers').controller('PublicationsController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
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