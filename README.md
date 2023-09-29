Quick RFCs
==========

https://bifurcation.github.io/qrfc/

This repo is just a clone of the HTML files in the RFC index, so that they are
exposed via GitHub pages.  This has two major benefits relative to the hosting
on [rfc-editor.org](https://rfc-editor.org):

1. They can are accessible across origins (`Access-Control-Allow-Origin: *`)
2. They benefit from the GitHub Pages CDN

New RFCs are automatically sync'ed by a [GitHub Action](.github/workflows/rsync.yaml)
that runs every hour.
