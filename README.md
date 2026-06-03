# HWID Unlocker

A small tool for generating unlock codes from a HWID and optional BootTick. It calls the same API as desbloqueo.sarmientoba.net, saves your HWIDs locally so you don't have to type them again, and comes with a bunch of color themes because why not.

Built with Next.js. Runs entirely in the browser after the first load -- no backend needed.

## How it works

You type in a HWID (12 hex characters, like `A1B2C3D4E5F6`), optionally a BootTick, hit generate, and it sends a POST to the remote API. The unlock code comes back and gets displayed right there. You can copy it, save it, or generate another one.

Saved HWIDs stick around in localStorage. Handy if you need to regenerate or look up an old code.

## Themes

There are 16 themes to choose from, plus a custom mode where you pick your own colors. Click the little gear icon in the bottom-right corner to open the theme panel. Most of them are dark because that's what you're here for. A few are light if that's your thing.

Themes included: Original, Light, Midnight, Paper, Cyberpunk, Retrowave, Forest, Ocean, Ume, Copper, Terminal, Organs, Lavender, GPT, Claude, Cute, and Custom.

## Running it

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Building

```bash
npm run build
npm start
```

## Why

The original page works fine but doesn't save anything. I got tired of copying HWIDs back and forth, so I made this. The themes are borrowed from Odysseus because the default dark theme looks good and I didn't want to come up with 16 color palettes from scratch.
