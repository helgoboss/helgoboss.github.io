'use strict'

const {parse: parseHTML} = require('node-html-parser')

module.exports.register = function () {
    const relativize = this.require('@antora/asciidoc-loader/util/compute-relative-url-path')
    this.once('documentsConverted', ({contentCatalog}) => {
        contentCatalog.getComponents().forEach(({versions}) => {
            versions.forEach(({name: component, version, url}) => {
                const index = {}
                const pages = contentCatalog.findBy({component, version, family: 'page'})
                    .sort((a, b) => a.title.localeCompare(b.title))
                for (const page of pages) {
                    const articleDom = parseHTML(`<article>${page.contents}</article>`)
                    const nodesWithId = articleDom.querySelectorAll("[id]")
                    for (const node of nodesWithId) {
                        const id = node.getAttribute("id");
                        if (id === undefined || id.startsWith("_")) {
                            continue;
                        }
                        index[id] = `${relativize(url, page.pub.url)}#${id}`;
                    }
                }
                // Ideally, the fallback page would be set to the start page from the component
                // config, but no idea how this works.
                const fallbackPage = "introduction.html";
                const html = generateHtml(index, relativize(url, fallbackPage));
                const pageListFile = contentCatalog.addFile({
                    contents: Buffer.from(html),
                    src: {
                        component,
                        version,
                        module: 'ROOT',
                        family: 'page',
                        relative: 'goto.html'
                    },
                })
                pageListFile.asciidoc = {doctitle: 'All Pages', attributes: { 'page-layout': 'raw' } }
            })
        })
    })
}

function generateHtml(index, fallbackUrl) {
    const indexAsJson = JSON.stringify(index);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <script>
    function getUrl(id) {
        if (!id) {
            return null;
        }
        const index = ${indexAsJson};
        return index[id];
    }
    const id = window.location.hash.substring(1);
    const url = getUrl(id);
    window.location.href = url ? url : "${fallbackUrl}";
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;
}