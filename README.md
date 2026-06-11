# ClearPass

Client-side password generation without confusing characters.

ClearPass is a simple password generator that creates strong, readable passwords while avoiding characters that are easy to mix up, such as O and 0, or l, 1, and I.

All passwords are generated locally in the browser. Nothing is sent to a server, stored remotely, or logged.

## Why ClearPass?

Typing or sharing generated passwords can be error-prone when they contain visually similar characters. ClearPass solves this by creating passwords that are both secure and easier for humans to read, copy, and type correctly.

## Features

* Client-side password generation
* Avoids ambiguous characters
* Uses `crypto.getRandomValues` for random password generation
* Adjustable password length and number of passwords
* Optional lowercase, uppercase, number, and symbol character groups
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

Open `index.html` in your browser. No build step, dependencies, or server are required.

For the deployable version, serve the `public` directory:

```sh
python3 -m http.server 8080 --directory public
```

## Hosting

The `public` directory contains the static site and security headers for hosting on:

* `clearpass.offsec.nl`
* `password.offsec.nl`
* `pw.offsec.nl`
