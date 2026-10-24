This repo is source code of my portfolio site.

# how tu build

## Require

- node.js (>= v22.17)
- pnpm (>= 10.14.0)

## Step

```
pnpm i
pnpm build
```

## Releases

Release Please manages versions, `CHANGELOG.md`, tags, and GitHub Releases,
starting from v0.3.4. Use Conventional Commit titles when merging changes:
`fix: ...` creates a patch release and `feat: ...` creates a minor release while
the version is below 1.0. Use squash merge to preserve that title in `main`.

1. Merge a releasable change into `main`. The Release workflow opens or updates
   a release PR with the next version and changelog.
2. Check the release PR. PRs created with `GITHUB_TOKEN` may not start CI
   automatically. In Actions, select **Pull Request CI → Run workflow** and
   select the release PR's branch to validate it.
3. Merge the release PR. The Release workflow creates the tag and GitHub Release,
   then checks out that tag, audits, lints, builds, and attaches `release.tar.gz`.

Do not create release tags manually. No personal access token is required.
GitHub Actions must be allowed to create pull requests in the repository's
**Settings → Actions → General → Workflow permissions**.
