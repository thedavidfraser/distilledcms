# distilledcms

Rethinking how we build websites. Looking into ways of improving content and enforcing best-practices whilst making websites simpler to manage and maintain.

## tl;dr

* Strict JSON format to dictate content structure
* New Level structure concept (using arrays in JSON)
* Always produces semantic HTML markup
* See "Using Distilled CMS" below to get started

## The problem

### Most CMS require expert web copy writers 

Most website CMS systems including blogs (and markdown files) provide the tools for symantic markup but rely on the content editor to use them correctly.

### Repeating the same mistakes

Web developers spend a lot of time writing out HTML. Majority of projects have their own unique naming convention (if one at all). When templates are populated with dynamic content symantics get broken or become time consuming to maintain.

### The process leads to poor design

The standard web-development process divorces content editors from designers. Placing project managers and developers in the middle.

Hypothetical standard process:

1. Copywriters' requirements
2. "The Client"
3. Project Manager
4. Design
5. Bispoke-development
6. Copywriter (ongoing)

Proposed process:

1. "The Client"
2. Project Manager
3. Copywriters' requirements
4. Standardised-development
5. Design
6. Copywriter (ongoing)
7. Design treatment and bispoke development (ongoing)


In other words, wouldn't it be great if copywriters got the tools they needed and designers and developers could produce onging awesome work using real content.


## About Distilled CMS

At this stage Distilled CMS is looking at how we produce markup with an emphasis on automation, ease of use and strict adhesion to accessibility standards.

### Current focus

Current focus is on producing standards complient HTML5 markup from a strict JSON format. The markup will adhere to all best-practices and contain selectors required for optimised CSS markup.

The strict JSON format takes advantage of the limitations of arrays to ensure content is structured. Special [grammatical] characters and patterns are used to detect content types.

The hope is that HTML5 could be converted to JSON and vice-verser.

## Levels*

> *I'm not happy that the name Level communicates what I wish to express so it may change.

A Level is a concept central to Distilled CMS. It's what ensures markup is consistent and semantic. In HTML a level could be an `<article>`, `<section>` or `<div>`. In JSON it is an Array.

A Level has the following rules:

1. First line is always a heading
2. Its followed by none or more Lines (string) including paragraphs, lists and quotes but not headings.
3. A level can contain any number of nested levels.
4. No Lines can follow a nested level. Instead a new sibling level must be created.

Level JSON example:

```
[
    "Heading",
    "Optional text",
    "More optional text",
    [
        "Nested Heading - Fruit",
        [
            "Apples",
            "Apples are green..."
        ],
        [
            "Bananas",
            "Bananas are yellow..."
        ]
    ]
]
```        

The Level concept prevents the following common HTML mistakes:

1. Skipping headings. Nesting `<h3>` within `<h1>` without `<h2>`.
2. Content orphaned from it's descriptive heading. This happens when you have a sub section of content with a heading but then don't have a new heading when returning to the main article.
3. Not enough markup to style bodies of text. This leads to adding adhoc markup for styling purposes which is then inconsistent with the rest of the page or site.


## Lines

A Line is a string. They are always printed making up the text on a page. The type of line can be deduced from the first character.

(This of course needs a lot more consideration.)

### Line types currently available

* paragraph - default
* heading - always the first Line in a Level
* paragraph introduction - the second line of the first Level
* list item - starts with hyphen `-`
* block quote - starts with double quote `"`
* paragraph CTA (link) - starts with `[` and has the following format `[http://www.example.com] Example link`


### Line types proposed

* paragraph end - always the last Line of page content, would allow for [Tombstone](https://en.wikipedia.org/wiki/Tombstone_(typography)) and message to alert screen readers.
* item list type - starts with `1.`. Following line numbers could be ignored or `-` used.
* nested list items - (are nested lists clear to understand?)


## Inline markup

In addition to Line types text within a line can be marked up with useful syntax.

### Inline markup currently used

* Site name - all instances of site name have a `<span>`

### Inline markup proposed

* Email addresses (As links)
* Quotations

### Inline strong and emphasis

Strong and emphasis text is up for consideration but perhaps a more granular approach would be better. For example: strong is currently used for commands and warnings and emphasis is used for proper nouns and inflection. Although these would still use HTML strong and emphasis elements they should perhaps have their own Distilled markup.

## Level settings (proposed)

Each Level can have an optional settings object as part of the JSON array. This would always be the last item in the array. Keywords need to be defined but it could contain the following:

* Link paths and link text
* Acronym definitions
* Semi-perminent Level className (for CSS and JavaScript)
* Assigned level template (for CSS and JavaScript)
* Meaningful ID for content editors

It needs to be considered how converting between formats e.g. HTML to JSON handles this information to avoid ambiguity.

At the moment I think Level settings should be inherited by nested Levels. (If so how does resetting attributes work?)

Settings could also include flags that enable disable certain Distilled behaviour. For example always expand first instance of an acronym? true/false.

Level with settings JSON example

```
[
	"About content editing",
	"Use the CMS to edit content",
	{
		"acronymLookup": [
			{
				"acronym": "CMS",
				"definition": "Content Management System"
			}
		]
	}
]
```

## Using Distilled CMS

Requires `npm` and `bower`. Uses gulp and node.

To install dependences, run:

```
npm install
bower install
```

The first few lines of `Gulpfile.js` are configuarable depending on the JSON content, settings and assets you wish to use.

Currently only one .html page is created for each configuaration.

If you are happy with the configuration, run:

`gulp`

This then copies assets to the dist folder and generates `index.html` based on the JSON content and Distilled CMS rules.
			

## Proposed development

My to do list:

* Generate multiple pages
* Move configuration away from Gulp
* Level settings object
* Header, footer and navigation across multiple pages
* Improved HTML markup indenting
* User friendly content editor
* Plain text Distilled markup (a third format which complements HTML and JSON)

Also need to consider how Distilled CMS will work at scale, Mongo DB, user permissions, Node server, optimisation, caching, design tools.

Speculate on how a Distilled stylesheet could add best-practice UI (but no perceived branding) as a boilerplate for designers.

