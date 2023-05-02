# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Modify env variables for prisma to use sqlite during development
- Animations using Framer or formkit/auto-animate
- Drag and sort habit list items, and remember their order
- Custom masonry layout
- Add ability to change the colour of habit groups
- Add day view and functionality to mark completion
- Add group repeat frequency
- Script to initialize database at midnight using Netlify functions
- Possibly need to store local times for users for above
- Add GitHub commit style chart to show progress over time
- Some sort of dopaminergic feedback (exp? lvl ups?)
- Search bar in header and by keyboard shortcut (ctrl + K)

### Fixed

- Long habit content gets cut off (overflow hidden in the text box)
- Delete buttons fade in and out on hover of the group card. Should appear on hover of the list item
