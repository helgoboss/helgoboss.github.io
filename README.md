# Helgobox Docs website

This is the source of the website https://docs.helgoboss.org. It uses the documentation site generator [Antora](https://antora.org/).

## Prepare

```shell
npm install
bundle
```

The `bundle` command installs Ruby gems in the `Gemfile`. This is important for PDF creation (Antora Assembler).

## Build automatically

The website is built automatically when pushing or starting [this GitHub Actions workflow](https://github.com/helgoboss/helgoboss.github.io/actions/workflows/publish.yml) manually.

## Build locally

The final build command after installing all required dependencies is:

```shell
npx antora --fetch antora-playbook.yml
```

Consider temporarily switching the content URL to a local path in [antora-playbook.yml]().

## Develop

The UI is an extended [Antora Default UI](https://gitlab.com/antora/antora-ui-default/-/tree/master). The extension files can be found in
the `supplemental-ui` folder.

To help with debugging, there's a Handlebars `inspect` helper which you can use like this to add the contents of a JavaScript object to the output:

```hbs
<pre>
    {{ inspect page }}
</pre>
```