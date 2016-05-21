var FacetedPublications = {
    settings: {
        facets: {
            'year':     'Year',
            'category': 'Category',
            'type':     'Type'
        },
        // The number of facets in the facets field. It is used to compute the width of a facet column.
        facetsCount: 3,
        resultSelector: '#publications-wrapper',
        facetSelector:  '#publications-facets-wrapper',
        countTemplate: '<div class=facettotalcount><%= count %> Publications match your criteria</div>',
        resultTemplate:
            '<div class="publication-wrapper" data-year="<%= obj.year %>" data-category="<%= obj.category %>" data-type="<%= obj.type %>">' +
            '   <div class="text-publication-wrapper">' +
            '       <div class="text-publication">' +
            '           <span><%= obj.authors + ". " + obj.description + "." %></span>' +
            '      </div>' +
            '   </div>' +
            '   <div class="year-publication-wrapper">' +
            '       <div class="year-publication">' +
            '           <span><%= obj.year %></span>' +
            '      </div>' +
            '       <div class="shape-publication-wrapper">' +
            '           <a href="<%= obj.link %>" download>' +
            '               <img class="publication-download-icon" src="images/ic_file_download_black_24dp_2x.png" />' +
            '           </a>' +
            '       </div>' +
            '   </div>' +
            '</div>',
        orderByOptions: {
            'year':     'Year',
            'category': 'Category',
            'type':     'Type'
        }
    },
    styleFacets: function() {
        // Makes facets lists of egual width
        $('#publications-facets-wrapper .facetsearch')
            .css('width', (100 / this.settings.facetsCount) + '%')
            .addClass('text-center');
        // Centers the total count element
        var centerTotalCount = function() {
            $('#publications-facets-wrapper .bottomline .facettotalcount')
                .addClass('text-center');
        };

        centerTotalCount();

        $(this.settings.resultSelector).bind('facetedsearchresultupdate', function() {
            centerTotalCount();
        });
    },
    addSorting: function() {
        var orderByElement = function(id, title) {
            return '<li class="orderbyitem" id="orderby_' + id + '">' + title + '</li>';
        };
        var orderByElementsContainer = $('#publications-facets-wrapper .bottomline .orderby ul');
        var publicationsNodeList = '#publications-wrapper>.publication-wrapper';
        var publicationsWrapper = $('#publications-wrapper');
        var order = {
            ascending: 'asc',
            descending: 'desc'
        };

        // Empties the container populated by facetedsearch library
        orderByElementsContainer.empty();

        // Iterate over the sort by categories and add them tot the previously emptied container
        _.each(this.settings.orderByOptions, function(title, id) {
            orderByElementsContainer
                .append(orderByElement(id, title));

            // Save the sorting order
            publicationsWrapper.data(id + '-order', order.ascending);

            // Attach an event listener for click to reorder elements when a button is pressed
            $('#orderby_' + id).on('click', function() {
                var orderData = id + '-order';

                // Save the new order
                if (publicationsWrapper.data(orderData) == order.ascending) {
                    publicationsWrapper.data(orderData, order.descending);
                } else if (publicationsWrapper.data(orderData) == order.descending) {
                    publicationsWrapper.data(orderData, order.ascending);
                }

                // And apply it to the publications list
                tinysort(publicationsNodeList, {
                    data: id,
                    order: publicationsWrapper.data(orderData)
                });
            });
        });

        // Force the publications to be sorted by year in descending order when the page is loaded
        $('#orderby_year').trigger('click');
    }
};