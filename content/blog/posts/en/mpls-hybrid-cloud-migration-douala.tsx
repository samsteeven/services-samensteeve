import React from "react";

export default function MplsHybridCloudMigrationDouala() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Deploying cloud architectures in Europe or North America is one thing. Doing it in Central Africa, dealing with local connectivity realities, is a completely different challenge. Recently, I led a migration from an expensive MPLS network to a hybrid cloud infrastructure for an industrial group based in Douala, Cameroon. Here is our technical log and architectural decisions from the field.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Initial Constraint: The Illusion of Stable Fiber
      </h2>
      <p>
        Prior to the migration, the client relied on private MPLS links connecting their headquarters in Douala to 3 remote manufacturing plants. The monthly cost was high for a bandwidth capped at 4 Mbps per site, with high packet loss rates during the heavy rainy seasons. The goal was to migrate collaborative tools, Active Directory, and inventory systems to Microsoft Azure, while keeping heavy industrial software running on-premise.
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-5 font-mono text-xs text-ink/80">
        <span className="text-accent font-bold">📡 FIELD STATISTICS</span>
        <ul className="mt-3 space-y-1.5 text-ink-soft">
          <li>• Average latency to Azure West Europe (Dublin): 140ms</li>
          <li>• Local connectivity SLA: ~88% (with daily micro-outages)</li>
          <li>• MPLS Alternative: Cost cut by 85% by swapping to standard fiber links paired with dynamic SD-WAN failover</li>
        </ul>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        The Solution: Redundant IPSec VPNs with BGP Routing
      </h2>
      <p>
        To ensure high availability without paying for dedicated leased lines (like ExpressRoute), we deployed local Fortinet firewalls connected to an active-active Azure VPN Gateway.
      </p>
      <p>
        The key to success was setting up dual VPN tunnels: a primary tunnel via local fiber and a secondary backup tunnel routed through an industrial 4G/LTE antenna or satellite link in case of physical fiber cuts. Automated failover was managed using BGP (Border Gateway Protocol) routing.
      </p>

      <p>
        Here is the Terraform (IaC) configuration snippet used to provision the active-active gateway on Azure:
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`# Provisioning Azure VPN Gateway (Active-Active Double Tunnel)
resource "azurerm_virtual_network_gateway" "vpn_gw" {
  name                = "douala-azure-vpn-gw"
  location            = "westeurope"
  resource_group_name = "production-rg"

  type     = "Vpn"
  vpn_type = "RouteBased"
  sku      = "VpnGw1"
  active_active = true

  ip_configuration {
    name                          = "vnetGatewayConfig1"
    public_ip_address_id          = azurerm_public_ip.vpn_ip_1.id
    private_ip_address_allocation = "Dynamic"
    subnet_id                     = azurerm_subnet.gateway_subnet.id
  }

  ip_configuration {
    name                          = "vnetGatewayConfig2"
    public_ip_address_id          = azurerm_public_ip.vpn_ip_2.id
    private_ip_address_allocation = "Dynamic"
    subnet_id                     = azurerm_subnet.gateway_subnet.id
  }
}`}
      </pre>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Active Directory Compromise: Mandatory Hybrid Setup
      </h2>
      <p>
        Forcing local workstations in Douala to depend on Azure AD servers in Dublin with 140ms latency and high internet drop risks would have paralyzed operations during outages.
      </p>
      <p>
        <strong>Our decision:</strong> Maintain physical Domain Controllers (Active Directory) locally at the Douala HQ (replicated to a secondary local node) and use Azure AD Connect to sync identities to the cloud. If the internet connection drops, local domain authorization continues to work seamlessly.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        6-Month Outcome
      </h2>
      <p>
        By dropping traditional MPLS in favor of redundant broadband links coupled with a secure Azure VPN Gateway, the client slashed network operation costs by 75%. Failover time to the backup 4G/LTE link is under 5 seconds (transparent to users). This project proves that cloud architecture in Central Africa must be hybrid by default, treating network failures not as anomalies, but as a regular parameter of system design.
      </p>
    </article>
  );
}
