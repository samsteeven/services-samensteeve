import React from "react";

export default function MigrationMplsCloudDouala() {
  return (
    <article className="prose dark:prose-invert max-w-none text-ink-soft leading-relaxed font-sans text-sm md:text-base space-y-6">
      <p className="text-lg text-ink font-medium leading-relaxed">
        Déployer des architectures cloud en Europe est une chose. Le faire en Afrique centrale, avec les réalités de connectivité locale, en est une autre. Récemment, j'ai piloté la migration d'un réseau MPLS onéreux vers une infrastructure cloud hybride pour un groupe industriel basé à Douala, au Cameroun. Voici notre journal de bord technique et les décisions d'architecture prises sur le terrain.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La contrainte initiale : l'illusion de la fibre stable
      </h2>
      <p>
        Avant la migration, le client disposait de liaisons MPLS privées liant son siège à Douala à 3 usines excentrées. Le coût mensuel était prohibitif pour un débit limité à 4 Mbps par site, avec un taux de perte de paquets élevé lors des saisons des pluies. L'objectif était de basculer les outils collaboratifs, l'Active Directory et le système de gestion de stocks sur Microsoft Azure, tout en maintenant les applications industrielles lourdes en local.
      </p>

      <div className="border border-line rounded-xl bg-paper/60 p-5 font-mono text-xs text-ink/80">
        <span className="text-accent font-bold">📡 LES CHIFFRES DU TERRAIN</span>
        <ul className="mt-3 space-y-1.5 text-ink-soft">
          <li>• Latence moyenne vers Azure West Europe : 140ms</li>
          <li>• SLA moyen de la connectivité locale : 88% (micro-coupures quotidiennes)</li>
          <li>• Alternative MPLS : Coût divisé par 6 en utilisant des liens internet grand public avec failover SD-WAN</li>
        </ul>
      </div>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        La solution : VPN IPSec redondants avec routage dynamique BGP
      </h2>
      <p>
        Pour garantir la haute disponibilité sans payer de lignes dédiées (comme ExpressRoute), nous avons déployé des pare-feu Fortinet locaux connectés à une passerelle VPN Azure (Azure VPN Gateway).
      </p>
      <p>
        La clé du succès a été la mise en place d'un tunnel VPN double : un tunnel primaire via la fibre locale et un tunnel de secours via une antenne 4G/LTE industrielle ou une liaison satellite en cas de rupture de fibre. Le basculement automatique est géré via BGP (Border Gateway Protocol).
      </p>

      <p>
        Voici un extrait de la configuration réseau modélisée avec Terraform (IaC) pour provisionner la passerelle sur Azure :
      </p>

      <pre className="p-4 rounded-xl border border-line bg-paper-raised/80 font-mono text-xs text-ink-soft overflow-x-auto">
{`# Provisionnement de la passerelle VPN Azure (Double Tunnel actif-actif)
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
        Le compromis sur l'Active Directory : Le mode hybride obligatoire
      </h2>
      <p>
        Faire dépendre l'authentification Windows de chaque poste à Douala d'un serveur situé dans un datacenter à Dublin (Azure AD) avec 140ms de latence et des risques de coupure internet aurait paralysé l'usine au moindre incident.
      </p>
      <p>
        <strong>Notre décision :</strong> Maintenir un contrôleur de domaine Active Directory physique au siège à Douala (avec réplication locale sur un serveur secondaire) et utiliser Azure AD Connect pour synchroniser les identités à sens unique vers Azure. En cas de coupure de la liaison internet, l'authentification locale continue de fonctionner normalement.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mt-8">
        Bilan après 6 mois
      </h2>
      <p>
        En abandonnant le MPLS classique pour des liaisons internet redondantes couplées à un VPN Azure sécurisé, l'entreprise a réduit ses coûts de réseau de 75%. Le temps de basculement vers la 4G/LTE de secours est inférieur à 5 secondes (transparent pour les utilisateurs). Cet exercice prouve que l'architecture cloud en Afrique doit être hybride par défaut, intégrant la panne réseau non pas comme une exception, mais comme un paramètre régulier du système.
      </p>
    </article>
  );
}
