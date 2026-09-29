# External link status

Every external link sitewide except amazon.com and youtube.com/youtu.be (those were already audited separately). Checked 2026-09-28.

- OK — loads fine, matches what it's supposed to be
- DEAD — 404, timeout, DNS failure, or parked "domain for sale" page
- HIJACKED/SPAM — domain squatted, now serves unrelated spam (gambling, financial, dating, ad content) — same pattern as the original school-house-rock.com find
- IDK — inconclusive (bot-blocking, empty response, flaky results) — needs a manual look

## HIJACKED/SPAM

- `http://www.school-house-rock.com/` — HIJACKED/SPAM — Indonesian gambling site ("Rajacuan") wrapped in fake Etsy branding
- `http://www.thenylons.com/default.asp` — HIJACKED/SPAM — redirects through just-cashflow.com to katakwin5.com, an Indonesian gambling/lottery site
- `http://www.alhirschfeld.com/` — HIJACKED/SPAM — Russian-language gambling/casino site (Pin Up)
- `http://www.aronsrecords.com/` — HIJACKED/SPAM — squatted, now a French creative-skills training site
- `http://www.michaeljackson.com/` — HIJACKED/SPAM — "How To Transfer 401(k) Into Gold IRA Rollover" financial spam
- `http://www.ministrymusic.org/news/` — HIJACKED/SPAM — redirects to unrelated blog spam ("Virtual Team Building Activities... Culinary Education")
- `http://www.clubspaceland.com/` — HIJACKED/SPAM — Japanese-language spam about Hermès Birkin handbags
- `http://www.onusound.co.uk/` — HIJACKED/SPAM — "Sound Reviews - Local Flirts & Flings" dating/spam page
- `http://www.repriserec.com/chrisisaak/` — HIJACKED/SPAM — redirects to americantv.com, a DIRECTV sales spam page
- `http://www.icehouse-iva.com/` — HIJACKED/SPAM — redirects to ennistradfestival.com, "401(k) to Gold IRA Rollover" investment spam
- `http://www.judemusic.com/` — HIJACKED/SPAM — generic AI-generated-looking gradient blog, unrelated to any real artist named Jude

## DEAD

- `http://tipsy.org/` — DEAD — DNS resolution fails/times out
- `http://www.abbasite.com/start/` — DEAD — 404 (domain still ABBA-owned, this path is gone)
- `http://www.asphodel.com/` — DEAD — parked, just an ad-tracking stub
- `http://www.blondie.net/index.shtml` — DEAD — this path 404s (domain root still live)
- `http://www.boston.org/boston.html` — DEAD — this page 404s (domain root still live)
- `http://www.bowwowwow.org/` — DEAD — NXDOMAIN
- `http://www.clubdevo.com/index.htm` — DEAD — redirects to devo.com, page not found
- `http://www.crumbmuseum.com/` — DEAD — JS-redirects to `/lander`, domain-parking pattern
- `http://www.davidlynch.com/` — DEAD — loads but returns 404
- `http://www.dirty.org/` — DEAD — DNS resolution times out
- `http://www.disciplineglobalmobile.com/index.htm` — DEAD — redirects to dgmlive.com, 404
- `http://www.djshadow.com/landing.html` — DEAD — redirects to official Shopify site, this page 404s
- `http://www.emmylou.net/` — DEAD — manually checked
- `http://www.enniomorricone.it/` — DEAD — times out; manually checked but flagged unreliable (checker's own connection is bad, so this needs a re-check from elsewhere)
- `http://www.fatboyslim.net/start.htm` — DEAD — this page 404s (domain root still live)
- `http://www.fountainsofwayne.com/home/` — DEAD — this path 404s (domain root still live)
- `http://www.gemm.com/` — DEAD — domain for sale ($99,999, "we will NOT accept any offers lower")
- `http://www.hapa.com` — DEAD — DNS resolves, connection times out; manually confirmed, won't load
- `http://www.intairnet.org/` — DEAD — parked/lander page
- `http://www.jarre.net/` — DEAD — manually checked, redirects to Jean-Michel Jarre's Wikipedia page (not a hijack, but not the original site either)
- `http://www.jumptheshark.com/i/inthenews.htm` — DEAD — registrar parking placeholder page
- `http://www.orbison.com/` — DEAD — parked "Web Page Under Construction"
- `http://www.pierluigiandreoni.it/marco.html` — DEAD — DNS resolution failure (NXDOMAIN)
- `http://www.public.iastate.edu/%7espires/max.html` — DEAD — DNS resolution failure (NXDOMAIN)
- `http://www.sheeba.ca/` — DEAD — default blank WordPress install, no real content
- `http://www.sonymusic.fr/deepforest/` — DEAD — 404 (base domain alive)
- `http://www.subpop.com/bands/combustible/comed/` — DEAD — 404 (base domain alive)
- `http://www.tackhead.com/` — DEAD — connection fails/timeout; manually confirmed, won't load
- `http://www.theequasi.com/` — DEAD — DNS resolution failure
- `http://www.ufo-tokyo.com/` — DEAD — DNS resolution failure
- `http://www.vangelisworld.com/` — DEAD — parked Plesk default page, expired SSL
- `http://www.wbr.com/cibomatto/` — DEAD — redirects to warnerrecords.com/cibomatto/, 404
- `http://www.williamorbit.com/` — DEAD — resolves, empty reply/no response; manually confirmed, won't load
- `http://www.meryncadell.com/` — DEAD — TLS handshake fails, HTTP times out with zero bytes; manually confirmed, won't load

## IDK — needs manual check

- `http://www.juniorbrown.com/` — IDK — manually checked, still unclear: gets a geo-block page ("wrong country"), may just work fine from elsewhere

## OK

- `http://music.hyperreal.org/artists/brian_eno/`
- `http://music.hyperreal.org/labels/axiom/index.html`
- `http://synergy-emusic.com/`
- `http://thebeachboys.com/`
- `http://web.lanterna.tv/`
- `http://www.barryadamson.com/`
- `http://www.beatles.com/`
- `http://www.beck.com/`
- `http://www.bernieworrell.com/`
- `http://www.bobbymcferrin.com/`
- `http://www.bobmarley.com/`
- `http://www.cbgb.com/`
- `http://www.cgtrio.com/`
- `http://www.chairkickers.com/`
- `http://www.cocteautwins.com/`
- `http://www.crumbproducts.com/`
- `http://www.davidbowie.com/`
- `http://www.davidbyrne.com/`
- `http://www.daviddarling.com/`
- `http://www.davidsylvian.net/`
- `http://www.deadcandance.com/`
- `http://www.ebay.com/`
- `http://www.enya.com/`
- `http://www.foetus.org/`
- `http://www.georgewinston.com/`
- `http://www.gillianwelch.com/`
- `http://www.harmonicworld.com/`
- `http://www.herbalpert.com/`
- `http://www.hotelchelsea.com/`
- `http://www.interlochen.org/`
- `http://www.jenniferwarnes.com/`
- `http://www.joanarmatrading.com/`
- `http://www.joejackson.com/`
- `http://www.jonimitchell.com/`
- `http://www.jonnypolonsky.com/`
- `http://www.juleecruise.net/`
- `http://www.kcrw.com/`
- `http://www.kdlang.com/`
- `http://www.king-crimson.com/`
- `http://www.knittingfactory.com/`
- `http://www.kraftwerk.com/`
- `http://www.kroq.com/kroqnow/kroqnow.html`
- `http://www.leonredbone.com/`
- `http://www.malcolmmclaren.com/`
- `http://www.marthaandthemuffins.com/`
- `http://www.massiveattack.co.uk/`
- `http://www.muzak.com/muzak.html`
- `http://www.negativland.com/`
- `http://www.nettwerk.com/`
- `http://www.nin.com/`
- `http://www.ninjatune.net/coldcut/`
- `http://www.ninjatune.net/home/`
- `http://www.numan.co.uk/`
- `http://www.omd.uk.com/`
- `http://www.penguincafe.com/`
- `http://www.petergabriel.com/`
- `http://www.pinkfloyd.com`
- `http://www.plunderphonics.com/`
- `http://www.publicenemy.com/`
- `http://www.queenonline.com/`
- `http://www.radiohead.com/`
- `http://www.ramones.com/`
- `http://www.record-eagle.com/`
- `http://www.rindeeckert.com/`
- `http://www.roches.com/`
- `http://www.rogerdean.com/`
- `http://www.roxymusic.co.uk/`
- `http://www.schickele.com/`
- `http://www.sevcom.com/`
- `http://www.shaggs.com/`
- `http://www.stick.com/`
- `http://www.theluckystars.com/`
- `http://www.themillsbrothers.com/`
- `http://www.thislife.org/`
- `http://www.thomasdolby.com/`
- `http://www.tomato.co.uk/home.html`
- `http://www.tomtomclub.com/index.php`
- `http://www.uchicago.edu/`
- `http://www.uelsmann.net/`
- `http://www.ultravox.org.uk/`
- `http://www.waxtraxrecords.com/`
- `http://www.wayno.com/`
- `http://www.wendycarlos.com/`
- `http://www.wordjazz.com/`
- `http://www.workshirtmusic.com/`
- `http://www.xtcidearecords.co.uk/`
- `http://www.yello.com/`
- `http://www.zappa.com/`
- `http://www.zbigvision.com/`
- `http://ztt.com/main.html`
