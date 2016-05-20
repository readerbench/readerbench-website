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
        countTemplate: '<div class=facettotalcount><%= count %> Publications</div>',
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
        $('#publications-facets-wrapper .facetsearch')
            .css('width', (100 / this.settings.facetsCount) + '%')
            .addClass('text-center');
        $('#publications-facets-wrapper .bottomline .facettotalcount')
            .addClass('text-center');

        $(this.settings.resultSelector).bind('facetedsearchresultupdate', function() {
            $('#publications-facets-wrapper .bottomline .facettotalcount')
                .addClass('text-center');
        });

        $(this.settings.facetSelector).bind('facetedsearchorderby', function(event, orderByElementId) {
            $('#publications-facets-wrapper .bottomline .orderby .orderbyitem')
                .removeClass('selected-order');
            $('#publications-facets-wrapper .bottomline .orderby #orderby_' + orderByElementId)
                .addClass('selected-order');
        });
    },
    addSorting: function() {
        var orderByElement = function(id, title) {
            return '<li class="orderbyitem" id="orderby_' + id + '">' + title + '</li>';
        };
        var orderByElementsContainer = $('#publications-facets-wrapper .bottomline .orderby ul');
        var publicationsNodeList = '#publications-wrapper>.publication-wrapper';
        var publicationsWrapper = $('#publications-wrapper');

        orderByElementsContainer.empty();

        _.each(this.settings.orderByOptions, function(title, id) {
            orderByElementsContainer
                .append(orderByElement(id, title));

            publicationsWrapper.data(id + '-order', 'asc');

            $('#orderby_' + id).on('click', function() {
                tinysort(publicationsNodeList, {
                    data: id,
                    order: 'asc'
                });
            });
        });
    }
};