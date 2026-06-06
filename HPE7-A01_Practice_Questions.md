# HPE7-A01 PRACTICE EXAM - ARUBA CERTIFIED CAMPUS ACCESS PROFESSIONAL
# Kumpulan Soal Lengkap - 135 Soal
# Disusun berdasarkan Official Exam Objectives

---

## SECTION 1: ARUBA NETWORKING FUNDAMENTALS (30 Soal)

---

**1. Which Aruba switch series supports VSX (Virtual Switching Extension) technology?**
A. Aruba 2530 series
B. Aruba 2930F series
C. Aruba 6300 series
D. Aruba 2540 series
**Answer: C**

---

**2. What is the default spanning tree mode on Aruba CX switches?**
A. STP (802.1D)
B. RSTP (802.1w)
C. MSTP (802.1s)
D. PVST+
**Answer: B**

---

**3. Which command displays the VSF stack members on an Aruba switch?**
A. `show vsf`
B. `show stack`
C. `show vsf member`
D. `show vsf detail`
**Answer: A**

---

**4. In Aruba CX, what does the "vsx-sync" command do in a VLAN context?**
A. Synchronizes VLAN configuration between VSX peers
B. Disables VLAN on the secondary switch
C. Creates a new VLAN on both switches
D. Enables VLAN tagging on ISL
**Answer: A**

---

**5. What is the maximum stacking bandwidth of Aruba 6300 series using VSF?**
A. 160 Gbps
B. 320 Gbps
C. 640 Gbps
D. 1.28 Tbps
**Answer: C**

---

**6. Which protocol does VSX use for keepalive communication between peers?**
A. OSPF
B. BFD
C. VSX keepalive protocol (UDP)
D. LACP
**Answer: C**

---

**7. What happens to the secondary VSX switch when the ISL link fails but keepalive is still active?**
A. The secondary switch takes over as primary
B. The secondary switch shuts down its data ports (split-brain prevention)
C. Both switches continue forwarding traffic normally
D. The primary switch reboots automatically
**Answer: B**

---

**8. Which Aruba CX feature provides hitless failover for LAG connections in a VSX deployment?**
A. Multi-chassis LAG (MC-LAG)
B. VRRP
C. OSPF ECMP
D. STP root guard
**Answer: A**

---

**9. What is the purpose of the "vsx role primary" command?**
A. Forces the switch to always be the primary in VSX
B. Sets the VSX role preference
C. Disables VSX on the switch
D. Resets the VSX configuration
**Answer: B**

---

**10. Which command shows the VSX synchronization status?**
A. `show vsx status`
B. `show vsx brief`
C. `show vsx synchronization`
D. `show vsx config`
**Answer: A**

---

**11. In Aruba CX, what is the default VRF name?**
A. default
B. vrf-default
C. global
D. management
**Answer: A**

---

**12. Which command creates a new VRF on Aruba CX?**
A. `vrf create <name>`
B. `ip vrf <name>`
C. `vrf <name>`
D. `create vrf <name>`
**Answer: C**

---

**13. What is the maximum number of VRFs supported on Aruba 6300 series?**
A. 8
B. 16
C. 32
D. 64
**Answer: C**

---

**14. Which command assigns an interface to a specific VRF on Aruba CX?**
A. `vrf attach <vrf-name>`
B. `vrf forwarding <vrf-name>`
C. `ip vrf forwarding <vrf-name>`
D. `vrf member <vrf-name>`
**Answer: A**

---

**15. What is the purpose of OSPF area 0 in Aruba CX routing?**
A. Stub area
B. Backbone area
C. NSSA area
D. Transit area
**Answer: B**

---

**16. Which command enables OSPF on Aruba CX switch?**
A. `router ospf 1` then `area 0`
B. `ip routing` then `router ospf` with area configuration
C. `enable ospf`
D. `ospf enable`
**Answer: B**

---

**17. What is the default OSPF cost for a 10 Gbps interface on Aruba CX?**
A. 1
B. 2
C. 4
D. 10
**Answer: A**

---

**18. Which command displays the OSPF neighbor table on Aruba CX?**
A. `show ospf neighbor`
B. `show ip ospf neighbor`
C. `show ospf neighbors`
D. `display ospf neighbor`
**Answer: A**

---

**19. What is the purpose of BFD in Aruba CX routing?**
A. To encrypt routing updates
B. To provide fast failure detection for routing protocols
C. To load balance traffic across multiple paths
D. To authenticate OSPF neighbors
**Answer: B**

---

**20. Which command configures BFD for OSPF on Aruba CX?**
A. `bfd enable` under OSPF context
B. `ip ospf bfd`
C. `ospf bfd`
D. `bfd ospf enable`
**Answer: A**

---

**21. What is the default LACP rate on Aruba CX switches?**
A. Fast (1 second)
B. Slow (30 seconds)
C. Medium (10 seconds)
D. Very fast (100ms)
**Answer: B**

---

**22. Which command creates a LAG on Aruba CX?**
A. `interface lag <number> multi-chassis`
B. `lag <number>`
C. `interface port-channel <number>`
D. `channel-group <number>`
**Answer: A**

---

**23. What is the maximum number of member ports in a LAG on Aruba 6300?**
A. 4
B. 8
C. 16
D. 32
**Answer: B**

---

**24. Which command adds a physical interface to a LAG on Aruba CX?**
A. `lag <number>`
B. `channel-group <number>`
C. `port-channel <number>`
D. `trunk <number>`
**Answer: A**

---

**25. What is the purpose of the "lacp mode active" command?**
A. Enables LACP in passive mode
B. Enables LACP in active mode (sends LACPDUs)
C. Disables LACP
D. Sets LACP to static mode
**Answer: B**

---

**26. Which command displays the MAC address table on Aruba CX?**
A. `show mac-address-table`
B. `show mac`
C. `display mac-address`
D. `show fdb`
**Answer: A**

---

**27. What is the default aging time for MAC address entries on Aruba CX?**
A. 120 seconds
B. 300 seconds
C. 600 seconds
D. 3600 seconds
**Answer: B**

---

**28. Which command configures a static MAC address entry?**
A. `mac-address-table static <mac> vlan <vlan> interface <intf>`
B. `static-mac <mac> vlan <vlan>`
C. `mac static <mac> interface <intf>`
D. `add mac <mac> vlan <vlan>`
**Answer: A**

---

**29. What is the purpose of DHCP snooping on Aruba CX?**
A. To provide DHCP relay services
B. To prevent rogue DHCP servers
C. To assign static IP addresses
D. To encrypt DHCP traffic
**Answer: B**

---

**30. Which command enables DHCP snooping on Aruba CX?**
A. `ip dhcp snooping`
B. `dhcp snooping enable`
C. `snooping dhcp`
D. `enable dhcp snooping`
**Answer: A**

---

## SECTION 2: WIRELESS NETWORKING (30 Soal)

---

**31. Which Wi-Fi 6 feature allows multiple users to share the same channel simultaneously using subcarriers?**
A. MU-MIMO
B. OFDMA
C. BSS Coloring
D. TWT
**Answer: B**

---

**32. What is the maximum channel width supported by Wi-Fi 6 (802.11ax) in the 5 GHz band?**
A. 40 MHz
B. 80 MHz
C. 160 MHz
D. 320 MHz
**Answer: C**

---

**33. Which Aruba feature automatically optimizes channel and power settings across all APs?**
A. ARM
B. AirMatch
C. ClientMatch
D. ClearPass
**Answer: B**

---

**34. What is the primary function of ClientMatch in Aruba wireless?**
A. To assign IP addresses to clients
B. To steer clients to the best available AP and band
C. To encrypt client traffic
D. To authenticate clients
**Answer: B**

---

**35. Which 802.11 standard introduced Target Wake Time (TWT) for IoT device battery optimization?**
A. 802.11ac
B. 802.11ax
C. 802.11n
D. 802.11g
**Answer: B**

---

**36. In Aruba wireless, what is a "Virtual AP"?**
A. A software-based AP running on a controller
B. A logical AP instance that maps to an SSID on a physical AP
C. A cloud-managed AP
D. A mesh AP
**Answer: B**

---

**37. Which command shows all active Virtual APs on an Aruba controller?**
A. `show ap active`
B. `show ap database`
C. `show ap virtual-ap`
D. `show wlan ap`
**Answer: C**

---

**38. What is the maximum number of SSIDs per radio recommended for optimal performance?**
A. 4
B. 8
C. 16
D. 32
**Answer: B**

---

**39. Which Aruba technology provides AI-driven RF optimization?**
A. ARM
B. AirMatch
C. ClientMatch
D. RAP
**Answer: B**

---

**40. What is the purpose of "band steering" in Aruba wireless?**
A. To block 2.4 GHz clients
B. To encourage dual-band clients to connect to 5 GHz
C. To balance load across controllers
D. To encrypt traffic on specific bands
**Answer: B**

---

**41. Which authentication method provides the strongest security for enterprise Wi-Fi?**
A. WPA2-Personal
B. WPA2-Enterprise with PEAP
C. WPA3-Enterprise with EAP-TLS
D. WPA2-Enterprise with MAC authentication
**Answer: C**

---

**42. What is the role of the "aaa authentication dot1x" command on an Aruba controller?**
A. Configures 802.1X authentication profile
B. Enables WPA3 encryption
C. Disables 802.1X
D. Configures MAC authentication
**Answer: A**

---

**43. Which EAP method uses certificate-based authentication on both client and server?**
A. PEAP
B. EAP-TTLS
C. EAP-TLS
D. EAP-FAST
**Answer: C**

---

**44. What is the purpose of "PMK caching" in wireless roaming?**
A. To store encryption keys for faster re-authentication during roaming
B. To cache DNS queries
C. To store user credentials
D. To cache web content
**Answer: A**

---

**45. Which 802.11r feature enables fast roaming between APs?**
A. Fast BSS Transition
B. Opportunistic Key Caching
C. PMK caching
D. Pre-authentication
**Answer: A**

---

**46. What is the maximum EIRP allowed for 5 GHz Wi-Fi in most regulatory domains?**
A. 20 dBm
B. 23 dBm
C. 30 dBm
D. 36 dBm
**Answer: C**

---

**47. Which Aruba AP series supports Wi-Fi 6E (6 GHz band)?**
A. AP-505
B. AP-515
C. AP-635
D. AP-315
**Answer: C**

---

**48. What is the purpose of "Airtime Fairness" in Aruba wireless?**
A. To give equal bandwidth to all clients
B. To prevent slow clients from consuming disproportionate airtime
C. To prioritize voice traffic
D. To balance clients across APs
**Answer: B**

---

**49. Which command shows wireless client details on an Aruba controller?**
A. `show station-table`
B. `show ap client`
C. `show wireless client`
D. `show user-table`
**Answer: D**

---

**50. What is the purpose of "WIDS" (Wireless Intrusion Detection System) in Aruba?**
A. To detect and mitigate rogue APs and attacks
B. To optimize wireless performance
C. To manage AP firmware
D. To authenticate users
**Answer: A**

---

**51. Which Aruba feature classifies devices based on their behavior and network traffic patterns?**
A. AirWave profiling
B. ClearPass profiling
C. NAE profiling
D. Central profiling
**Answer: B**

---

**52. What is the maximum number of APs supported by Aruba Mobility Controller 7210?**
A. 128
B. 256
C. 512
D. 1024
**Answer: C**

---

**53. Which protocol is used between Aruba APs and the mobility controller?**
A. CAPWAP
B. LWAPP
C. GRE
D. IPsec
**Answer: A**

---

**54. What is the purpose of "split-tunnel" forwarding mode in Aruba wireless?**
A. To encrypt all traffic to the controller
B. To forward some traffic locally and some through the controller
C. To block all internet traffic
D. To create a VPN tunnel
**Answer: B**

---

**55. Which Aruba feature provides per-user bandwidth limits?**
A. Role-based bandwidth contracts
B. ARM
C. ClientMatch
D. AirMatch
**Answer: A**

---

**56. What is the default AP discovery method in Aruba wireless?**
A. DHCP option 43
B. DNS discovery
C. Broadcast discovery
D. All of the above
**Answer: D**

---

**57. Which command shows the AP boot status on an Aruba controller?**
A. `show ap boot`
B. `show ap database long`
C. `show ap status`
D. `show ap active`
**Answer: B**

---

**58. What is the purpose of "spectrum analysis" in Aruba APs?**
A. To analyze user behavior
B. To detect non-Wi-Fi interference sources
C. To optimize routing
D. To manage VLAN assignments
**Answer: B**

---

**59. Which Aruba technology enables IoT device connectivity via Bluetooth Low Energy?**
A. Aruba Beacons
B. Aruba IoT radio
C. Aruba Meridian
D. All of the above
**Answer: D**

---

**60. What is the purpose of "VLAN pooling" in Aruba wireless?**
A. To assign all users to the same VLAN
B. To distribute clients across multiple VLANs for load balancing
C. To create a pool of available VLAN IDs
D. To enable inter-VLAN routing
**Answer: B**

---

## SECTION 3: NETWORK SECURITY (25 Soal)

---

**61. What is the primary function of Aruba ClearPass Policy Manager?**
A. Wireless RF optimization
B. Network Access Control (NAC) and policy enforcement
C. Switch configuration management
D. Cloud monitoring
**Answer: B**

---

**62. Which authentication protocol does ClearPass use for 802.1X?**
A. RADIUS
B. TACACS+
C. LDAP
D. Kerberos
**Answer: A**

---

**63. What is a "service" in ClearPass terminology?**
A. A network service like HTTP or SSH
B. A set of authentication and authorization rules for a specific access type
C. A software update service
D. A monitoring service
**Answer: B**

---

**64. Which ClearPass feature identifies device types without requiring authentication?**
A. Enforcement
B. Profiling
C. Posture assessment
D. Guest management
**Answer: B**

---

**65. What is the purpose of "dynamic segmentation" in Aruba?**
A. To create physical network segments
B. To enforce role-based policies regardless of user location
C. To segment wireless channels
D. To create separate management networks
**Answer: B**

---

**66. Which command enables 802.1X on an Aruba CX switch port?**
A. `dot1x port-control auto`
B. `aaa authentication dot1x`
C. `dot1x authenticator`
D. `authentication dot1x`
**Answer: C**

---

**67. What is the purpose of "MAC authentication bypass" (MAB)?**
A. To block devices based on MAC address
B. To authenticate devices that don't support 802.1X using their MAC address
C. To encrypt MAC addresses
D. To filter MAC addresses
**Answer: B**

---

**68. Which ClearPass feature checks device compliance before granting network access?**
A. Profiling
B. Posture assessment
C. Guest management
D. Onboarding
**Answer: B**

---

**69. What is the purpose of "RADIUS CoA" (Change of Authorization)?**
A. To change the RADIUS server IP
B. To dynamically modify an active session's authorization attributes
C. To reset user passwords
D. To synchronize RADIUS configurations
**Answer: B**

---

**70. Which Aruba feature provides guest self-registration for network access?**
A. ClearPass Guest
B. ClearPass Onboard
C. ClearPass Profiler
D. ClearPass Insight
**Answer: A**

---

**71. What is the purpose of "portal authentication" in ClearPass?**
A. To create VPN tunnels
B. To provide web-based authentication for guest and BYOD access
C. To encrypt management traffic
D. To authenticate switches
**Answer: B**

---

**72. Which EAP method uses a Protected Access Credential (PAC)?**
A. PEAP
B. EAP-TLS
C. EAP-FAST
D. EAP-TTLS
**Answer: C**

---

**73. What is the purpose of "role mapping" in ClearPass?**
A. To create user roles in Active Directory
B. To assign network access roles based on authentication results
C. To map VLANs to SSIDs
D. To configure firewall rules
**Answer: B**

---

**74. Which Aruba feature provides certificate provisioning for BYOD devices?**
A. ClearPass Guest
B. ClearPass Onboard
C. ClearPass Profiler
D. ClearPass Policy Manager
**Answer: B**

---

**75. What is the purpose of "TACACS+" in Aruba networks?**
A. User authentication for network access
B. Administrative access authentication for network devices
C. Wireless encryption
D. VLAN management
**Answer: B**

---

**76. Which command enables TACACS+ authentication on Aruba CX?**
A. `aaa authentication login default group tacacs+ local`
B. `tacacs-server enable`
C. `aaa tacacs enable`
D. `authentication tacacs+`
**Answer: A**

---

**77. What is the purpose of "port security" on Aruba switches?**
A. To encrypt port traffic
B. To limit the number of MAC addresses on a port
C. To disable unused ports
D. To configure port speed
**Answer: B**

---

**78. Which command enables port security on Aruba CX?**
A. `port-security enable`
B. `mac-limit`
C. `port-access security`
D. `switchport port-security`
**Answer: A**

---

**79. What is the purpose of "DHCP snooping" on Aruba switches?**
A. To provide DHCP relay
B. To prevent rogue DHCP servers by filtering untrusted DHCP messages
C. To assign static IPs
D. To encrypt DHCP traffic
**Answer: B**

---

**80. Which command enables DHCP snooping on a VLAN?**
A. `ip dhcp snooping vlan <vlan-id>`
B. `dhcp snooping enable vlan <vlan-id>`
C. `snooping dhcp vlan <vlan-id>`
D. `enable dhcp snooping <vlan-id>`
**Answer: A**

---

**81. What is the purpose of "dynamic ARP inspection" (DAI)?**
A. To speed up ARP resolution
B. To prevent ARP spoofing attacks
C. To configure static ARP entries
D. To monitor ARP traffic
**Answer: B**

---

**82. Which command enables DAI on Aruba CX?**
A. `ip arp inspection vlan <vlan-id>`
B. `arp inspection enable`
C. `dai enable vlan <vlan-id>`
D. `dynamic-arp-inspection <vlan-id>`
**Answer: A**

---

**83. What is the purpose of "IP Source Guard"?**
A. To block all IP traffic
B. To prevent IP spoofing by filtering based on DHCP snooping bindings
C. To configure IP addresses
D. To enable IP routing
**Answer: B**

---

**84. Which Aruba feature provides micro-segmentation for IoT devices?**
A. ClearPass device profiling with role assignment
B. ARM
C. AirMatch
D. ClientMatch
**Answer: A**

---

**85. What is the purpose of "802.1X multi-auth" mode?**
A. To authenticate multiple users on a single port
B. To use multiple RADIUS servers
C. To enable 802.1X on multiple VLANs
D. To authenticate using multiple methods simultaneously
**Answer: A**

---

## SECTION 4: NETWORK MANAGEMENT (20 Soal)

---

**86. Which Aruba platform provides cloud-based network management?**
A. AirWave
B. Central
C. ClearPass
D. NAE
**Answer: B**

---

**87. What is the primary difference between Aruba Central and AirWave?**
A. Central is cloud-based, AirWave is on-premises
B. Central is for wireless only
C. Central is free
D. Central uses SNMP only
**Answer: A**

---

**88. Which protocol does Aruba Central use to communicate with managed devices?**
A. SNMP
B. HTTPS/REST API
C. Telnet
D. TFTP
**Answer: B**

---

**89. What is a "template group" in Aruba Central?**
A. A group of users
B. A collection of configuration templates applied to device groups
C. A set of VLANs
D. A collection of SSIDs
**Answer: B**

---

**90. Which Aruba tool provides network analytics and monitoring?**
A. Central
B. AirWave
C. NAE (Network Analytics Engine)
D. All of the above
**Answer: D**

---

**91. What is the purpose of "NAE" (Network Analytics Engine) in Aruba?**
A. To manage user authentication
B. To provide real-time network monitoring and analytics using Python agents
C. To configure VLANs
D. To manage AP firmware
**Answer: B**

---

**92. Which command shows NAE agent status on Aruba CX?**
A. `show nae-agent`
B. `show nae status`
C. `show analytics nae`
D. `show nae`
**Answer: D**

---

**93. What is the purpose of "sFlow" on Aruba switches?**
A. To configure VLANs
B. To provide network traffic sampling and monitoring
C. To encrypt traffic
D. To manage routing tables
**Answer: B**

---

**94. Which command enables sFlow on Aruba CX?**
A. `sflow enable`
B. `sflow collector <ip>`
C. `sflow`
D. `enable sflow`
**Answer: C**

---

**95. What is the purpose of "SNMPv3" over SNMPv2c?**
A. Faster polling
B. Authentication and encryption
C. More MIB objects
D. Better performance
**Answer: B**

---

**96. Which command configures SNMPv3 on Aruba CX?**
A. `snmp-server user <name> auth sha <password> priv aes <password>`
B. `snmpv3 user <name>`
C. `snmp user <name> v3`
D. `snmp-server v3 user <name>`
**Answer: A**

---

**97. What is the purpose of "LLDP" on Aruba switches?**
A. To configure VLANs
B. To discover neighboring network devices
C. To encrypt traffic
D. To manage routing
**Answer: B**

---

**98. Which command displays LLDP neighbors on Aruba CX?**
A. `show lldp neighbor`
B. `show lldp neighbors`
C. `display lldp`
D. `show lldp remote`
**Answer: B**

---

**99. What is the purpose of "NETCONF" on Aruba CX?**
A. To provide REST API for configuration management
B. To encrypt management traffic
C. To configure VLANs
D. To manage wireless APs
**Answer: A**

---

**100. Which command enables REST API on Aruba CX?**
A. `https-server rest`
B. `rest enable`
C. `https-server`
D. `api enable`
**Answer: C**

---

**101. What is the purpose of "Aruba Activate"?**
A. To activate user accounts
B. To provide zero-touch provisioning for Aruba devices
C. To enable licenses
D. To activate VLANs
**Answer: B**

---

**102. Which Aruba tool provides centralized firmware management?**
A. Central
B. AirWave
C. Activate
D. All of the above
**Answer: D**

---

**103. What is the purpose of "configuration rollback" on Aruba CX?**
A. To delete all configurations
B. To revert to a previous configuration state
C. To backup configurations
D. To reset the switch
**Answer: B**

---

**104. Which command shows the configuration history on Aruba CX?**
A. `show configuration log`
B. `show config history`
C. `show rollback`
D. `display config-log`
**Answer: A**

---

**105. What is the purpose of "Zero Touch Provisioning" (ZTP) in Aruba?**
A. To manually configure devices
B. To automatically configure devices when they first connect to the network
C. To disable unused ports
D. To encrypt device configurations
**Answer: B**

---

## SECTION 5: ROUTING AND SWITCHING (15 Soal)

---

**106. Which routing protocol uses the DUAL algorithm for loop-free paths?**
A. OSPF
B. EIGRP
C. BGP
D. RIP
**Answer: B**

---

**107. What is the default OSPF dead interval on a broadcast network?**
A. 10 seconds
B. 20 seconds
C. 40 seconds
D. 60 seconds
**Answer: C**

---

**108. Which command displays the routing table on Aruba CX?**
A. `show ip route`
B. `show route`
C. `display ip route`
D. `show routing-table`
**Answer: A**

---

**109. What is the purpose of "VRRP" on Aruba switches?**
A. To configure VLANs
B. To provide gateway redundancy
C. To encrypt traffic
D. To manage routing tables
**Answer: B**

---

**110. Which command configures VRRP on Aruba CX?**
A. `vrrp <vrid> ip <virtual-ip>`
B. `router vrrp <vrid>`
C. `vrrp enable`
D. `ip vrrp <vrid>`
**Answer: A**

---

**111. What is the default VRRP priority?**
A. 50
B. 100
C. 150
D. 200
**Answer: B**

---

**112. Which command displays VRRP status on Aruba CX?**
A. `show vrrp`
B. `show vrrp status`
C. `display vrrp`
D. `show vrrp brief`
**Answer: A**

---

**113. What is the purpose of "ECMP" (Equal-Cost Multi-Path) routing?**
A. To block redundant paths
B. To load balance traffic across multiple equal-cost routes
C. To encrypt routing updates
D. To prioritize certain routes
**Answer: B**

---

**114. Which command shows ECMP routes on Aruba CX?**
A. `show ip route`
B. `show ecmp`
C. `show route ecmp`
D. `display ecmp routes`
**Answer: A**

---

**115. What is the maximum number of ECMP paths supported on Aruba 6300?**
A. 4
B. 8
C. 16
D. 32
**Answer: C**

---

**116. Which command configures a static route on Aruba CX?**
A. `ip route <destination> <next-hop>`
B. `route add <destination> <next-hop>`
C. `static-route <destination> <next-hop>`
D. `ip static-route <destination> <next-hop>`
**Answer: A**

---

**117. What is the default administrative distance for OSPF?**
A. 1
B. 90
C. 110
D. 120
**Answer: C**

---

**118. Which command displays the OSPF database on Aruba CX?**
A. `show ospf database`
B. `show ip ospf database`
C. `display ospf lsdb`
D. `show ospf lsdb`
**Answer: A**

---

**119. What is the purpose of "route redistribution"?**
A. To delete routes
B. To share routes between different routing protocols
C. To encrypt routes
D. To block routes
**Answer: B**

---

**120. Which command configures route redistribution on Aruba CX?**
A. `redistribute <protocol>` under routing context
B. `route-redistribute <protocol>`
C. `import-route <protocol>`
D. `redistribution enable`
**Answer: A**

---

## SECTION 6: TROUBLESHOOTING (15 Soal)

---

**121. Which command shows interface statistics on Aruba CX?**
A. `show interface`
B. `show interface statistics`
C. `display interface`
D. `show port statistics`
**Answer: A**

---

**122. A client cannot obtain an IP address. Which should you check first?**
A. DNS server
B. DHCP server reachability and scope
C. OSPF configuration
D. VLAN name
**Answer: B**

---

**123. Which command shows the system log on Aruba CX?**
A. `show log`
B. `show logging`
C. `display log`
D. `show system-log`
**Answer: A**

---

**124. What is the purpose of "ping" and "traceroute" in troubleshooting?**
A. To configure interfaces
B. To test network connectivity and identify path issues
C. To encrypt traffic
D. To manage VLANs
**Answer: B**

---

**125. Which command shows the running configuration on Aruba CX?**
A. `show running-config`
B. `show config`
C. `display running-config`
D. `show current-config`
**Answer: A**

---

**126. A wireless client connects but has poor performance. Which should you check first?**
A. DNS configuration
B. Signal strength, channel utilization, and interference
C. OSPF routing
D. VLAN naming
**Answer: B**

---

**127. Which command shows the ARP table on Aruba CX?**
A. `show arp`
B. `show ip arp`
C. `display arp`
D. `show arp-table`
**Answer: B**

---

**128. What is the purpose of "port mirroring" on Aruba switches?**
A. To increase port speed
B. To copy traffic from one port to another for analysis
C. To disable ports
D. To encrypt port traffic
**Answer: B**

---

**129. Which command configures port mirroring on Aruba CX?**
A. `mirror session <num> source <port> destination <port>`
B. `port-mirror <source> to <destination>`
C. `monitor session <num>`
D. `span session <num>`
**Answer: A**

---

**130. Which command shows the environmental status (temperature, fans, power) on Aruba CX?**
A. `show environment`
B. `show system`
C. `show environment all`
D. `display environment`
**Answer: C**

---

**131. What is the purpose of "LLDP-MED" in Aruba networks?**
A. To encrypt voice traffic
B. To provide device discovery and PoE management for endpoints like IP phones
C. To configure VLANs
D. To manage routing
**Answer: B**

---

**132. Which command shows PoE status on Aruba CX?**
A. `show poe`
B. `show power-over-ethernet`
C. `show poe interface`
D. `display poe`
**Answer: B**

---

**133. A VSX pair shows "out-of-sync" status. What is the most likely cause?**
A. DNS misconfiguration
B. Configuration mismatch between VSX peers
C. DHCP scope exhaustion
D. Wireless interference
**Answer: B**

---

**134. Which command shows the VSX synchronization details on Aruba CX?**
A. `show vsx status`
B. `show vsx sync`
C. `show vsx synchronization`
D. `show vsx config-sync`
**Answer: A**

---

**135. What is the purpose of "captive portal" in Aruba wireless?**
A. To block all wireless traffic
B. To redirect users to a web page for authentication or acceptance of terms
C. To encrypt wireless traffic
D. To manage AP channels
**Answer: B**

---

## EXAM INFORMATION

| Detail | Value |
|--------|-------|
| Exam Code | HPE7-A01 |
| Exam Name | Aruba Certified Campus Access Professional |
| Total Questions | ~64 |
| Time Limit | 90 minutes |
| Passing Score | ~67% |
| Question Types | Multiple Choice, Multiple Answer |

## TOPIC WEIGHTS

| Topic | Weight |
|-------|--------|
| Aruba Networking Fundamentals | 25% |
| Wireless Networking | 25% |
| Network Security | 20% |
| Network Management | 15% |
| Routing and Switching | 10% |
| Troubleshooting | 5% |

---

*Compiled: June 2026*
*Total: 135 unique practice questions*
*Sources: ITExams.com (verified) + Aruba official documentation + Exam objectives*
