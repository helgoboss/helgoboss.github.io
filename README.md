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