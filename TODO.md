## TODO

Getting Site Working Well / Technical
======================================

- [x] Audit for problems/weirdness
    - [x] Site-breaking things
    - [x] Things that aren't used or useful
    - [x] Things that are inconsistent
    - [x] Things that could be improved
    - [x] Things like d a n c i n g xxa b o u t xxa r c h i t e c t u r e which work fine but there's a better way of doing it
- [x] Resolve duplicate/orphaned homepages — deleted `index2.html`, `home.html`, and root `wtf.html` (the abandoned Bodoni-style redesign chain, never linked from the live site); `index.html` confirmed as the one real homepage
- [x] Resolve duplicate "start" page — deleted the orphaned no-space `pages/start.html`, renamed `pages/ start.html` (leading space) to `pages/start.html`, and updated all 324 references sitewide
- [x] Checked all 146 YouTube links sitewide (oEmbed check) — 3 came back dead/unauthorized: Tom Tom Club (`dMKsaj69G7E`, works fine for me, false positive), Wendy Carlos (`dqyg9xAsdkk`, used on both `carlos.html`/`carlos2.html` — she's notorious for taking her stuff down everywhere), Buggles (`M5IrzSRZ2KA`). All other 143 links are fine.
- [x] Trimmed `A-Z 128/` from 150 mp3s down to a 7-file "keep" list as a guide for what still needs a real fix (everything else deleted): the 4 song pages that only ever linked to mp3 instead of YouTube (Cole, Eckert, Wilbrandt, Lonesome Pie — the last across `lonesome.html`+`lonesome2`–`10.html`), plus the 3 pages with dead/broken YouTube links (Tom Tom Club, Wendy Carlos, Buggles)
- [x] Lonesome Pie "High" — the site owner uploaded their dad's own song to YouTube (`https://youtu.be/F9ZCOu3NKgQ`); re-linked all 10 pages (`lonesome.html`+`lonesome2`–`10.html`) to it and deleted the mp3, same as everything else. (No copyright issue either way since it's the owner's own family's music — this was just for consistency with the rest of the site, not a legal necessity.)
- [x] BJ Cole "Claire de Lune" — wired up to `https://www.youtube.com/watch?v=GMb3O-FYx80` and deleted the mp3
- [x] Rinde Eckert "Ellen Walting" — wired up to `https://youtube.com/shorts/Y8hG3iURgZo` and deleted the mp3
- [x] Buggles "Elstree" — wired up to `https://www.youtube.com/watch?v=B6SnJya67Aw` and deleted the mp3
- [x] Wendy Carlos "Pompous Circumstances" — no legal way to listen online found anywhere (not on Spotify/Apple Music/Bandcamp, no audio on her own site either — just an Amazon purchase link). Deleted the mp3 and pointed `carlos.html`/`carlos2.html`'s speaker icon at a new small notice page, `A-Z 128/carlos-notice.html`, explaining that and linking to the Amazon purchase page instead
- [x] Tom Tom Club "On the Line Again" — re-linked to `https://www.youtube.com/watch?v=2a707tnNCnE` and deleted the mp3
- [x] Wilbrandt "Close Encounter" — wired up to `https://youtu.be/J_nLzkobgYQ` and deleted the mp3
- [x] Fixed sitewide deadnaming — all "Walter Carlos" mentions (A-Z dropdown labels/options across every page, page `<title>`s, the `threads/interlochen.html` list) changed to "Wendy Carlos", except the deliberate historical/transition narrative in `carlos.html`/`carlos2.html`'s own bio prose and the "back when he had all his original equipment" joke aside in `pages/electric.html` — those intentionally keep "Walter"
- [x] Made the Wendy Carlos notice a real popup window (`window.open` with fixed size) instead of a plain new-tab link, and trimmed the notice page itself down (dropped the site logo/nav chrome, added a close link) so it reads well at popup size
- [x] Remove all mp3s of copyrighted music ... illegal :( — `A-Z 128/` now has zero mp3 files and nothing on the site links to one; every song page moved to YouTube (or, for Wendy Carlos, the notice page) one at a time above
    - (this was specifically the music-copyright issue — the site's own ~55 podcast episodes in `threads/podcasts.html` are original spoken-word content and were never a problem either way, same as Lonesome Pie)
- [x] Audit all external links sitewide — checked all non-Amazon/non-YouTube external links (see `DEADLINKS.md`); 11 had been domain-squatted into spam (gambling, financial, dating) and 34 were dead, all fixed by pointing to the closest Wayback Machine snapshot to Nov 1, 2005, or (for the 2 with no snapshot available) a popup notice page
    - also covers cleanup of stray `?v=glance&s=music` query strings accidentally copy-pasted onto local paths (86 pages on an image path, 8 pages on a link)
- [ ] Restructure Site??
    - the vast majority of pages (305–326 of 329) still rely on `<spacer>`, `<font>`, and `<table>`-based layout from the original Adobe GoLive export — `<spacer>` in particular hasn't rendered in any browser for ~20 years, so a lot of original spacing is already silently gone
- [ ] FIX NAME ARTIST ORDER!

Wish List
=========
- [ ] Make podcast compatible with modern podcast stuff
    - [ ] Make/build/fix metadata
    - [ ] Transcriptions (?)
        - [ ] Review existing transcriptions and compare to written version of podcast

- [ ] FORMATTING
    - [ ] Standardize typography — confirmed only one design system remains sitewide now that the orphaned Bodoni redesign is deleted
    - [ ] Make CSS work well on mobile — no page (0 of 329) has a `<meta name="viewport">` tag; this is likely the single highest-leverage fix here
    - [ ] Check Resolution of everything to make sure it works 2x
    - [ ] Build custom scrollbars?
    - [ ] Add custom cursor icons? 
    - [ ] Do cool good typography for apostrophes and quotation marks
    - [ ] Add favicon — confirmed 0 of 329 pages reference one
    - [ ] d a n c i n g xxa b o u t xxa r c h i t e c t u r e ... as much as I love this -> properly implement it everywhere
        - currently hand-baked into ~300 pages individually via a same-color-as-background font-color trick instead of CSS `letter-spacing`

- [ ] Add metadata to ALL the pages!
    - [ ] the social media stuff
    - [ ] other useful things?

Archiving
=========
- [ ] Rewrite about/WTF page to explain that I've taken it over?
