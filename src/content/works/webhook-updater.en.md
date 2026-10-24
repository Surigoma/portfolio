## Overview

A Python service that receives GitHub webhooks and automatically updates files on a server. It supports updating Git repositories and downloading and extracting GitHub Release assets.

This portfolio site also uses the service to apply GitHub updates to its VPS. Combined with builds in GitHub Actions, it automates the flow from creating release assets to placing them on the public server.

## Main features

- Webhook reception through FastAPI
- HMAC-SHA256 webhook signature verification
- Conditions based on repository name, event type, and action
- Repository updates using `git pull --ff-only`
- Downloading a named release asset and extracting tar.gz archives
- YAML configuration for multiple update targets and deployment paths
- Webhook-triggered self-updates and restarts

## Benefits and design choices

### Deploy without storing a server SSH private key on GitHub

GitHub sends an update notification through a webhook, and the server retrieves the required files from GitHub. This removes the need to store an SSH private key for logging in to the public server in GitHub Actions secrets. Automatic deployment can therefore run without granting the CI environment server login access.

Webhook signature verification uses a shared secret. Credentials needed to fetch private repositories or other restricted resources are managed on the server.

### Keep deployment settings on the server

Each target's repository, event conditions, release asset, update method, and destination are managed together in YAML on the server. For example, changing only the destination directory requires a server configuration change without editing the GitHub Actions workflow.

One service can manage multiple projects, with each target configured either to update files directly through Git or to download and extract prebuilt release assets.

### Separate builds from serving the site

For this site, GitHub Actions handles the build, while the public server receives a webhook and downloads and extracts the required assets. The public server does not need Node.js or the site's build dependencies, reducing the dependencies maintained on the server and avoiding build workloads there.

This reduces manual file placement while making use of an existing VPS.

### Validate incoming notifications

The service verifies the webhook signature with a shared secret and checks the configured event conditions and repository name before performing an update. Signature comparisons use `hmac.compare_digest`.

### Update the service itself

For a self-update notification, the service updates its Git checkout, sends a response, and shuts down the server. A supervisor synchronizes dependencies with `uv sync --locked` and starts the updated server.

If the Git update fails, the server keeps running and returns an error. If dependency synchronization fails, the service stops and logs the error so the checkout can be fixed or reverted before restarting. Restarts briefly interrupt service.

## Technology and operation

- Python / FastAPI / Uvicorn
- Requests / PyYAML / JSON Schema
- GitHub Webhooks / GitHub Releases
- uv / Linux / systemd

The service starts with `uv run main.py`, with systemd service operation intended for Linux hosts.

## Support status

The repository also implements ZIP extraction, webhook forwarding, and API token configuration for private repositories. The README explicitly identifies these features as untested.
