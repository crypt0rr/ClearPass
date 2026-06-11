# ClearPass

Client-side password generation without confusing characters.

ClearPass is a simple password generator that creates strong, readable passwords while avoiding characters that are easy to mix up, such as O and 0, or l, 1, and I.

All passwords are generated locally in the browser. Nothing is sent to a server, stored remotely, or logged.

## URLs

* [clearpass.offsec.nl](https://clearpass.offsec.nl/)
* [password.offsec.nl](https://password.offsec.nl/)
* [pw.offsec.nl](https://pw.offsec.nl/)

## Why ClearPass?

Typing or sharing generated passwords can be error-prone when they contain visually similar characters. ClearPass solves this by creating passwords that are both secure and easier for humans to read, copy, and type correctly.

## Features

* Client-side password generation
* Avoids ambiguous characters
* Uses `crypto.getRandomValues` for random password generation
* Adjustable password length and number of passwords
* Optional lowercase, uppercase, number, and symbol character groups
* Guarantees every selected character group appears at least once
* Shows an approximate entropy estimate for the current settings
* Per-password copy buttons
* No server-side processing
* No tracking, logging, or storage
* No build step or dependencies

## Character set

ClearPass only uses characters that are hard to confuse:

```text
abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ!?
```

The ambiguous characters `1`, `l`, `0`, `O`, and `I` are intentionally excluded.

## Run locally

Serve the `public` directory:

```sh
python3 -m http.server 8080 --directory public
```

No build step or dependencies are required.

## Deploy

Publish the `public` directory with Cloudflare Pages. It contains the static site, security headers, cache rules, `robots.txt`, `sitemap.xml`, and `security.txt`.
