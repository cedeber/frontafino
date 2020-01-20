# Contributing to the Eukolía library
:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable
behavior to design+code@cedeber.fr.

The following is a set of guidelines for contributing to Mountain Bikers Club.
These are just guidelines, not rules, use your best judgment and feel free to
propose changes to this document in a pull request.

## Report a security issue
Found a security issue? Please disclose it responsibly. You can send an email to
design+code@cedeber.fr.

## Contributing to the code
- The `master` branch is basically just a snapshot of the latest stable release.
  All development should be done in dedicated branches. **Do not submit PRs against
  the `master` branch.**
- Checkout a topic branch from the relevant branch, e.g. `develop`, and merge back
  against that branch.
- It's OK to have multiple small commits as you work on the Pull Request - we will
  let GitHub automatically squash it before merging.
- If adding new feature, provide convincing reason to add this feature. Ideally
  you should open a suggestion issue first and have it greenlighted before working on it.
- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxx[,#xxx])` (#xxx is the issue id)
    in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR.
  - Add appropriate test coverage if applicable.

### Project structure
[..]

##  Before Submitting A Bug Report
- Perform a cursory search to see if the problem has already been reported.
  If it has and the issue is still open, add a comment to the existing issue instead
  of opening a new one.
