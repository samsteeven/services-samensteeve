import React from "react";

export default function SsrfWebhookInternalGateway() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Allowing users to configure custom webhooks (callback URLs triggered by system events) is a standard feature for any SaaS platform. However, if your server-side handler executes a raw <code>POST</code> request to the provided URL without proper validation, you have just opened a critical vulnerability: Server-Side Request Forgery (SSRF). Here is the technical breakdown.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Vulnerability: Bypassing Firewalls from the Inside
      </h2>
      <p>
        Since the outbound HTTP request originates from your own server (which resides within your private cloud network or VPN), an attacker can register webhook endpoints pointing to local IP addresses that are not exposed to the public internet.
      </p>
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 font-mono text-xs text-rose-600 dark:text-rose-400">
        • Attacker-configured URL: http://127.0.0.1:8500/v1/agent/self (Consul UI)
        <br />• Cloud Metadata Endpoint: http://169.254.169.254/latest/meta-data/ (Exposes IAM server keys!)
        <br />• Internal DB Service: http://192.168.1.50:6379/
      </div>
      <p className="mt-4">
        Your web server processes the request, passes through external firewall rules (since it's outbound traffic), queries the private service, and returns the response payload or headers to the attacker, leaking network design details.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Why Blacklists Fail
      </h2>
      <p>
        Blocking strings like <code>"localhost"</code> or <code>"127.0.0.1"</code> is easily bypassed. Attackers can use alternative representations (e.g. decimal <code>http://2130706433</code>), register custom DNS hostnames that resolve to local loopback addresses (e.g. <code>spoof.attacker.com</code>), or execute 302 HTTP redirects from their own external servers.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Robust Solution: DNS Resolution & IP Range Filtering (RFC 1918)
      </h2>
      <p>
        The only secure approach is to resolve the domain to its underlying IP address inside your application layer before making the HTTP call, then validate that the resolved IP does not fall into private (RFC 1918) or reserved address ranges.
      </p>
      <p>
        Here is the validation algorithm implemented in Node.js / TypeScript:
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`import dns from "dns/promises";
import ipaddr from "ipaddr.js";

async function isSafeUrl(inputUrl: string): Promise<boolean> {
  try {
    const parsed = new URL(inputUrl);
    // 1. Force DNS resolution to obtain underlying IPs
    const addresses = await dns.resolve(parsed.hostname);
    
    for (const addr of addresses) {
      const ip = ipaddr.parse(addr);
      
      // 2. Assert resolved IP is not within a private or reserved range
      const range = ip.range();
      if (
        range === "private" ||     // 10.x.x.x, 172.16.x.x, 192.168.x.x ranges
        range === "loopback" ||    // 127.0.0.1 loopback
        range === "linklocal" ||   // 169.254.x.x (Link-local metadata endpoint)
        range === "unspecified"
      ) {
        // Unsafe range detected, reject the request
        return false;
      }
    }
    return true; // Resolved IP is safe to query
  } catch (err) {
    return false; // Reject on DNS lookup failures
  }
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Additional Webhook Safety Guidelines
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Disable Redirect Following:</strong> Force your HTTP client (e.g. Axios instance) to reject redirect hops (<code>maxRedirects: 0</code>) to prevent 302 redirect-bypass tactics.</li>
        <li><strong>Network Isolation (DMZ):</strong> Run the webhook-dispatcher workers in an isolated subnet (VPC) with zero access to your primary database or Redis nodes.</li>
        <li><strong>Strict Timeouts:</strong> Enforce short connection timeouts (e.g. 2 seconds maximum) to prevent resources from being tied up by malicious slow-responding hosts.</li>
      </ul>
    </article>
  );
}
