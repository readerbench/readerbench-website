
// IMPORTANT: the graphs folder is mapped into assets
// the path for spec.json and data.json should be relative to the assets folder

// After adding a spec or data file you should restart the server, so dist folder is recreated
// Names should not include numbers or special chars (like -)
export let IntellitData = {
    'componentTitle': 'DGLR & CVLR Visualizations',
    'sections': [
        {
            "type": "section",
            "name": "All Authors",
            "graphs": [
                {
                    "type": "spec",
                    "title": "Years of birth",
                    "description": "This visualisation represents the birth years of the authors presented in the DGLR. In the early days of Romanian literature, the number of writers is small, as they were born at a distance of 5-10 years. As we advance to the 19th century, this distance reduces, up to the peak point of 43 writers born in 1939 and 1940. In the communist regime the number of writers decreases.",
                    "schema": "assets/author-birthyears/spec.json"
                },
                {
                    "type": "component",
                    "title": "Birth locations",
                    "description": "This visualisation represents the birth locations of the authors presented in the DGLR.",
                    "schema": "author-birth-locations"
                },
                {
                    "type": "spec",
                    "title": "Age evolution through time",
                    "description": "This visualisation represents the age evolution of the authors presented in the DGLR.",
                    "schema": "assets/author-age-time/spec.json"
                },
                {
                    "type": "spec",
                    "title": "Publications and active authors",
                    "description": "This visualisation represents the active authors versus the published works.",
                    "schema": "assets/publications-active-authors/spec.json"
                }
            ]
        },
        {
            "type": "section",
            "name": "Canonical Authors",
            "graphs": [
                {
                    "type": "component",
                    "title": "Travels",
                    "description": "This visualisation represents the places the canonical authors travelled to.",
                    "schema": "author-travels"
                },
                {
                    "type": "component",
                    "title": "Timeline",
                    "description": "This is an experimental timeline and represents the publications of George Coșbuc through his entire life.",
                    "schema": "authors-timeline"
                },
                {
                    "type": "spec",
                    "title": "Publications",
                    "description": "This visualisation represents the years of the first and last publications of the canonical authors.",
                    "schema": "assets/canonical-first-last-publication/spec.json"
                }
            ]
        },
        {
            "type": "section",
            "name": "Publications",
            "graphs": [
                {
                    "type": "spec",
                    "title": "Publish years",
                    "description": "This visualisation represents the number of publications per year.",
                    "schema": "assets/publication-years/spec.json"
                },
                {
                    "type": "spec",
                    "title": "Active journals",
                    "description": "This visualization represents the number of active publications (journals, magazines etc.) after 1830.",
                    "schema": "assets/publication-per-year/spec.json"
                },
            ]
        }
    ]
};
