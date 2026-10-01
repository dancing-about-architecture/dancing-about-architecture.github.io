# Podcast distribution and publication chronology

Research date: October 1, 2026.

## Recovered chronology

The [May 16, 2008 RSS capture](https://web.archive.org/web/20080516033836/http://www.hypercubism.com/RSS_feed.xml)
contains 57 episodes. Its publication dates run from Air (February 4, 2007)
to Frank Zappa (March 16, 2008), mostly weekly and mostly alphabetical by artist.
Bow Wow Wow is dated March 25, before David Bowie on April 1, despite their
opposite order in the XML. December 23 and 30 have no dated episodes.

[episode-publication-order.csv](episode-publication-order.csv) sorts these
episodes by the actual `pubDate`, retaining original URLs and GUIDs.
All 57 have corresponding local audio. The original feed calls the Toni Childs
file `Childs_pod.mp3`; the local counterpart is `Childs_podcast.mp3`.
`apology_pod.mp3` is the sole extra local audio file and is absent from this feed.

The [October 12, 2007 capture](https://web.archive.org/web/20071012040722/http://hypercubism.com:80/RSS_feed.xml)
contains 36 episodes with matching dates, ending with The Lucky Stars on
October 7. This supports the later feed's chronology.

These are feed publication dates, not necessarily first availability of the
recordings. The November 2006 feed already contains Lene Lovich, dated November
28, 2006; the January 2007 feed contains Joni Mitchell, dated December 22, 2006.
The later feed dates those episodes September 30 and November 4, 2007.
Also, the May 2007 podcast index already links many episodes with later RSS
dates. The dated 2007–2008 feed appears to reflect a scheduled feed release
or re-release, rather than the recordings' initial creation or web upload.

All 58 local MP3s were inspected with ffprobe. No usable creation, recording,
or publication dates were found. Most have title, artist, album, and iTunes
audio-processing tags. Five have `track=1` and `TYER=0`, which provide no useful
sequence or year. File modification dates belong to the 2026 recovery.
Full results: [mp3-metadata.json](mp3-metadata.json).

## RSS and Spotify

An RSS feed remains useful for a finished archive: it exposes episode titles,
descriptions, audio URLs, durations, artwork, and publication dates to podcast
apps. It can be a static file generated from the recovered catalogue.

Spotify accepts an externally hosted show through its RSS feed, using an email
address in the feed to verify ownership. Publishing an RSS link alone does not
create a Spotify listing: submission through Spotify for Creators is required.

Sources: [Adding a new show](https://support.spotify.com/rw/creators/article/adding-a-new-show/),
[Claiming a podcast](https://support.spotify.com/md-en/creators/article/claiming-your-podcast-on-spotify-for-creators/).

The recordings include third-party music. Spotify's music catalogue does not
automatically establish permission to redistribute recordings inside a podcast.
Spotify says permission, appropriate rights, or an applicable copyright
exception is required, and reviews can lead to removal. Eligibility cannot be
established from the RSS file or MP3 tags.
Source: [Spotify's copyright guidance](https://creators.spotify.com/resources/create/copyright-creator-education).

Suggested site copy, once a working feed exists:

> Listen in your podcast app. This completed series is preserved here in full.
> Add the RSS feed to your app to browse and download the episodes.

Add a Spotify listening link once a listing is actually available. Use the
historical feed dates with a clear explanation of their provenance. Modernize
the original feed's metadata and URLs rather than publishing it unchanged.

No live feed or Spotify submission was made during this research.
