// Vendor
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);

const TITLE_REGEX = /^# /;
const TABLE_OF_CONTENTS_REGEX = /^## table of contents\s*$/i;
const SECTION_REGEX = /^## /;
const TABLE_OF_CONTENTS_ITEM_REGEX = /^(\s*)[-*+]\s+\[(.+?)\]\(#(.+?)\)/;
const EXTERNAL_LINK_REGEX = /^https?:\/\//;

/**
 * Splits a README-like markdown file into:
 * - a table of contents, read from the "Table of contents" section
 * - the rendered html, without the main title and the table of contents section
 * @param {String} markdown
 * @param {{ copyLabel: String, copiedLabel: String }} labels Copy button labels
 * @returns {{ tableOfContents: Array<{ id: String, label: String, children: Array }>, html: String }}
 */
export default function parseDocumentation(markdown, labels = {}) {
    const lines = markdown.split('\n');

    // Remove main title, the page already has one
    const titleIndex = lines.findIndex(line => TITLE_REGEX.test(line));
    if (titleIndex !== -1) lines.splice(titleIndex, 1);

    // Extract table of contents section
    let tableOfContentsLines = [];
    const tableOfContentsStart = lines.findIndex(line => TABLE_OF_CONTENTS_REGEX.test(line));

    if (tableOfContentsStart !== -1) {
        let tableOfContentsEnd = lines.findIndex((line, index) => index > tableOfContentsStart && SECTION_REGEX.test(line));
        if (tableOfContentsEnd === -1) tableOfContentsEnd = lines.length;
        tableOfContentsLines = lines.splice(tableOfContentsStart, tableOfContentsEnd - tableOfContentsStart).slice(1);
    }

    return {
        tableOfContents: parseTableOfContents(tableOfContentsLines),
        html: marked.parse(lines.join('\n'), {
            renderer: createRenderer(labels),
            headerIds: true,
            headerPrefix: '',
            mangle: false,
        }),
    };
}

function parseTableOfContents(lines) {
    const items = [];

    for (const line of lines) {
        const match = line.match(TABLE_OF_CONTENTS_ITEM_REGEX);
        if (!match) continue;

        const [, indent, label, id] = match;
        const item = { id, label, children: [] };
        const parent = items[items.length - 1];

        if (indent.length > 0 && parent) parent.children.push(item);
        else items.push(item);
    }

    return items;
}

function createRenderer({ copyLabel = 'Copy', copiedLabel = 'Copied!' }) {
    const renderer = new marked.Renderer();
    const renderLink = renderer.link.bind(renderer);
    const renderTable = renderer.table.bind(renderer);

    // Open external links in a new tab
    renderer.link = (href, title, text) => {
        const html = renderLink(href, title, text);
        if (!EXTERNAL_LINK_REGEX.test(href)) return html;
        return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
    };

    // Make wide tables scrollable on small screens
    renderer.table = (header, body) => {
        return `<div class="table-container">${renderTable(header, body)}</div>`;
    };

    // Syntax highlighting and copy button
    renderer.code = (code, infostring) => {
        const language = (infostring || '').split(/\s/)[0];
        const isSupported = language && hljs.getLanguage(language);
        const html = isSupported ? hljs.highlight(code, { language }).value : escapeHtml(code);

        return `<div class="code-block">
            <pre><code class="hljs${isSupported ? ` language-${language}` : ''}">${html}</code></pre>
            <button type="button" class="button button-copy">
                <span class="label-container">
                    <span class="label">${copyLabel}</span>
                    <span class="label-copied">${copiedLabel}</span>
                </span>
            </button>
        </div>`;
    };

    return renderer;
}

function escapeHtml(string) {
    return string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
