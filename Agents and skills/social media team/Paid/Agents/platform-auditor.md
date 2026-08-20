# social-media-platform-auditor

**Definition:** `.claude/agents/social-media-platform-auditor.md`

Produces the **Platform Audit** deliverable only. Checks profile completeness, posting cadence, content mix, engagement rate, highlights/pinned content, and gaps — for 1 platform (Basic), 2 (Standard), or up to 5 (Premium).

Uses real Page/IG Insights if an access token + Page ID has been supplied by the operator; otherwise works from public profile data. Never generates or requests a token itself.

Output: a findings table (platform → working → broken → fix priority).

Tools: `Read, Grep, Glob, Write, WebSearch, WebFetch`
