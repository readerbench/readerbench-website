import { DefaultInputData } from '../demo.component.data';

export let SemanticAnnotationData = {
    'serviceName': 'semanticAnnotation',
    'title': 'Semantic Annotation',
    'abstractText': 'Interactive virtual environments (IVEs) are now seen as an '
        + 'engaging new way by which children learn experimental sciences and '
        + 'other disciplines. These environments are populated by synthetic characters '
        + 'that guide and stimulate the children activities. In order to build '
        + 'such environments, one needs to address the problem of how achieve believable '
        + 'lievable and empathic characters that act autonomously. Inspired by the '
        + 'work of traditional character animators, this paper proposes an architectural '
        + 'model to build autonomous characters where the agent\'s reasoning '
        + 'and behaviour is influenced by its emotional state and personality. We '
        + 'performed a small case evaluation in order to determine if the characters '
        + 'evoked empathic reactions in the users with positive results.',
    'keywords': 'interactive virtual environment, emotional characters, empathic reactions',
    'defaultLanguage': function () {
        return DefaultInputData.languages[0]; // en
    }
};
