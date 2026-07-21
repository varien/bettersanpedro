# Security Policy

BetterIndang is a **community portal** — not an official government system. It does not handle authentication, payments, or sensitive personal data.

> Version history and release notes live in [`CHANGELOG.md`](./CHANGELOG.md).

## Reporting a Vulnerability

If you discover a security issue (e.g., XSS, exposed credentials, dependency vulnerability), please report it by:

1. **Opening a GitHub issue** at [michaustriaqa/betterindang](https://github.com/michaustriaqa/betterindang) with the label `security`
2. Or **emailing the maintainer** directly (contact via the GitHub profile)

Please do not publicly disclose the vulnerability until it has been reviewed and addressed.

## Scope

| Area                                          | In Scope                      |
| --------------------------------------------- | ----------------------------- |
| XSS via markdown rendering                    | Yes                           |
| Exposed API keys or `.env` values in the repo | Yes                           |
| Dependency vulnerabilities (npm audit)        | Yes                           |
| Phishing / social engineering                 | No                            |
| The official LGU Indang government systems    | No — contact the LGU directly |

## Supported Versions

Only the latest release on the `main` branch is actively maintained.
