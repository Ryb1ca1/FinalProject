// components/cards/ArticleCard/helperFunction.js
const parseXmlText = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const extractText = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent?.trim() || '';
        }

        let text = '';
        for (const childNode of node.childNodes) {
            text += ' ' + extractText(childNode);
        }
        return text;
    };

    let result = extractText(xmlDoc)
        .replace(/\s+/g, ' ')
        .replace(/\(\s*повтор\s*\)/gi, '')
        .trim();

    result = result
        .replace(/\s*([,.!?;:])\s*/g, '$1 ')
        .replace(/\s{2,}/g, ' ');

    const entities = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&apos;': "'"
    };

    const improvedTagRegex = /<\/?[\w][^>]*>/g;

    for (const [entity, char] of Object.entries(entities)) {
        result = result.replace(new RegExp(entity, 'g'), char)
            .replace(improvedTagRegex, '');
    }

    return result;
};

const countWordsAccurate = (text) => {
    const wordRegex = /[a-zA-Zа-яА-ЯёЁ0-9\-']+/g;
    const matches = text.match(wordRegex);
    return matches ? matches.length : 0;
};

export { parseXmlText, countWordsAccurate };
