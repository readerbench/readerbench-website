var FacetedPublications = {
    settings: {
        facets: {
            'year':     'Year',
            'category': 'Category',
            'type':     'Type'
        },
        resultSelector: '#publications-wrapper',
        facetSelector:  '#publications-facets-wrapper',
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
    }
};