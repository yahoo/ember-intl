{{locale-switcher}}
# Format Relative

Formats dates relative to "now" using [<code>Intl.RelativeTimeFormat</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat), and returns the formatted string value.

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-relative-01-template.hbs'}}
    {{format-relative -1 unit="day"}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-relative-01-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-relative-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-relative-02-template.hbs'}}
    {{format-relative 1 unit="day"}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-relative-02-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-relative-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-relative-03-template.hbs'}}
    {{format-relative 0 unit="day"}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-relative-03-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-relative-controller.js'}}
{{/docs-demo}}

## Format Relative Options

`style`

> options for "best fit" ("yesterday") and "numeric" ("1 day ago") output.

`units`

> options for always rendering in a particular unit; e.g. "30 days ago",
> instead of "1 month ago".

# TODO: implement complete list

By default, the relative time is computed to the best fit unit, but you can explicitly call it to force units to be displayed in `"second"`, `"second-short"`, `"minute"`, `"minute-short"`, `"hour"`, `"hour-short"`, `"day"`, `"day-short"`, `"month"`, `"month-short"`, `"year"` or `"year-short"`
