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
            '<div class="publication-wrapper">' +
                '<div class="shape-publication-wrapper">' +
                '    <div class="shape-publication"></div>' +
                '</div>' +
                '<div class="text-publication-wrapper">' +
                '    <div class="text-publication">' +
                '        <span><%= obj.description %></span>' +
                '    </div>' +
                '</div>' +
                '<div class="year-publication-wrapper">' +
                '    <div class="year-publication">' +
                '        <span><%= obj.year %></span>' +
                '    </div>' +
                '</div>' +
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
};