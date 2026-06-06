# MODUL 5: ROUTING AND SWITCHING
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 5.1 OSPF Fundamentals

#### Konsep OSPF
- **Type:** Link-state routing protocol
- **Algorithm:** SPF (Shortest Path First) / Dijkstra
- **Metric:** Cost (based on interface bandwidth)
- **Areas:** Hierarchical design with backbone area 0

#### OSPF Packet Types
| Type | Name | Purpose |
|------|------|---------|
| 1 | Hello | Neighbor discovery and keepalive |
| 2 | Database Description (DBD) | LSDB summary exchange |
| 3 | Link-State Request (LSR) | Request specific LSAs |
| 4 | Link-State Update (LSU) | Send LSAs |
| 5 | Link-State Acknowledgment (LSAck) | Confirm receipt |

#### OSPF Neighbor States
```
Down → Init → 2-Way → ExStart → Exchange → Loading → Full
```

#### OSPF Network Types
- **Broadcast:** Default for Ethernet, DR/BDR election
- **Point-to-Point:** No DR/BDR, faster convergence
- **NBMA:** Non-broadcast multi-access
- **Point-to-Multipoint:** Manual neighbor config

---

### 5.2 OSPF Configuration on Aruba CX

#### Basic OSPF Configuration
```
! Enable IP routing
switch(config)# ip routing

! Configure OSPF
switch(config)# router ospf 1
switch(config-ospf)# router-id 1.1.1.1
switch(config-ospf)# area 0
switch(config-ospf-area)# exit

! Assign interface to area
switch(config)# interface vlan 10
switch(config-if)# ip address 10.0.10.1/24
switch(config-if)# ip ospf 1 area 0
switch(config-if)# ip ospf priority 100

! Point-to-point link
switch(config)# interface 1/1/48
switch(config-if)# ip ospf 1 area 0
switch(config-if)# ip ospf network point-to-point
```

#### OSPF Cost Configuration
```
! Default cost calculation: 100 Mbps / interface bandwidth
! 1 Gbps = cost 1
! 10 Gbps = cost 1 (with reference-bandwidth 10G)

! Change reference bandwidth
switch(config-ospf)# reference-bandwidth 10000

! Manual cost
switch(config)# interface 1/1/1
switch(config-if)# ip ospf cost 10
```

#### OSPF Authentication
```
! Simple password authentication
switch(config-ospf-area)# authentication
switch(config)# interface vlan 10
switch(config-if)# ip ospf authentication-key MyPassword

! MD5 authentication
switch(config-ospf-area)# authentication message-digest
switch(config)# interface vlan 10
switch-config-if)# ip ospf message-digest-key 1 md5 MySecret
```

#### OSPF Timers
```
! Hello and dead intervals
switch(config)# interface vlan 10
switch(config-if)# ip ospf hello-interval 10
switch(config-if)# ip ospf dead-interval 40
```

#### OSPF Show Commands
```
show ospf                      # OSPF process info
show ospf neighbor             # Neighbor table
show ospf database             # LSDB
show ospf interface            # Interface OSPF info
show ospf statistics           # OSPF statistics
show ip route oSPF             # OSPF routes
```

---

### 5.3 BFD (Bidirectional Forwarding Detection)

#### Konsep
BFD menyediakan fast failure detection untuk routing protocols.

#### Konfigurasi BFD
```
! Enable BFD for OSPF
switch(config)# router ospf 1
switch(config-ospf)# bfd
switch(config-ospf)# exit

! Interface-level BFD
switch(config)# interface vlan 10
switch(config-if)# ip ospf bfd
```

#### BFD Parameters
- **Minimum TX interval:** 300ms (default)
- **Minimum RX interval:** 300ms (default)
- **Multiplier:** 3 (default)
- **Detection time:** 900ms

---

### 5.4 VRRP (Virtual Router Redundancy Protocol)

#### Konsep
VRRP menyediakan gateway redundancy untuk hosts.

#### Arsitektur VRRP
```
┌─────────────────────────────────────────────────────────┐
│                    Virtual Router                        │
│                    VIP: 10.0.10.1                        │
│                                                         │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │   VRRP Primary  │    │  VRRP Secondary │            │
│  │   Priority 120  │    │  Priority 100   │            │
│  │   RIP: 10.0.10.2│    │  RIP: 10.0.10.3 │            │
│  └─────────────────┘    └─────────────────┘            │
│         ▲                                               │
│         │ Advertisement every 1 second                  │
└─────────────────────────────────────────────────────────┘
```

#### Konfigurasi VRRP
```
! Primary switch
switch(config)# interface vlan 10
switch(config-if)# ip address 10.0.10.2/24
switch(config-if)# vrrp 10 ip 10.0.10.1
switch(config-if)# vrrv 10 priority 120
switch(config-if)# vrrp 10 preempt
switch(config-if)# vrrp 10 advertise 1

! Secondary switch
switch(config)# interface vlan 10
switch(config-if)# ip address 10.0.10.3/24
switch(config-if)# vrrp 10 ip 10.0.10.1
switch(config-if)# vrrp 10 priority 100
switch(config-if)# vrrp 10 preempt
```

#### VRRP Show Commands
```
show vrrp                       # VRRP status
show vrrp interface vlan 10     # VRRP on interface
show vrrp statistics            # VRRP statistics
```

---

### 5.5 Static Routing

#### Konfigurasi Static Route
```
! Next-hop route
switch(config)# ip route 10.0.20.0/24 10.0.10.1

! Interface route
switch(config)# ip route 10.0.30.0/24 null0

! Default route
switch(config)# ip route 0.0.0.0/0 10.0.10.254

! Floating static route (backup)
switch(config)# ip route 10.0.20.0/24 10.0.10.2 200
```

#### Administrative Distance
| Route Type | Distance |
|------------|----------|
| Connected | 0 |
| Static | 1 |
| OSPF | 110 |
| BGP (eBGP) | 20 |

---

### 5.6 Route Redistribution

#### Konsep
Route redistribution memungkinkan sharing routes antar routing protocols.

#### Konfigurasi
```
! Redistribute static into OSPF
switch(config)# router ospf 1
switch(config-ospf)# redistribute static

! Redistribute connected
switch(config-ospf)# redistribute connected

! Redistribute with route-map
switch(config-ospf)# redistribute static route-map STATIC-TO-OSPF
```

---

### 5.7 ECMP (Equal-Cost Multi-Path)

#### Konsep
ECMP memungkinkan load balancing traffic across multiple equal-cost routes.

#### ECMP on Aruba CX
```
! Maximum ECMP paths
switch(config)# ip ecmp 16

! Verify ECMP
switch# show ip route 10.0.20.0
```

---

### 5.8 IP Routing Show Commands

#### Essential Show Commands
```
show ip route                   # Full routing table
show ip route 10.0.20.0        # Specific route
show ip route summary          # Route summary
show ip route ospf             # OSPF routes only
show ip route static           # Static routes only
show ip route next-hop         # Next-hop info
show ip arp                    # ARP table
show interface vlan 10         # Interface status
```

---

### 5.9 Lab Exercise: OSPF with VRRP

#### Topology
```
         [Internet]
             │
        [Firewall]
             │
     ┌───────┴───────┐
     │               │
[Switch-A]────VRRP────[Switch-B]
(Primary)   (Secondary)
     │               │
     └───────┬───────┘
             │
     [Access Switches]
             │
        [PCs]
```

#### Objectives
1. Configure OSPF between switches and firewall
2. Configure VRRP for gateway redundancy
3. Configure BFD for fast failover
4. Test failover scenarios

#### Configuration
```
! === Switch-A (Primary) ===
switch(config)# ip routing
switch(config)# router ospf 1
switch(config-ospf)# router-id 1.1.1.1
switch(config-ospf)# area 0
switch(config-ospf)# redistribute connected
switch(config-ospf)# bfd
switch(config-ospf)# exit

switch(config)# interface vlan 10
switch(config-if)# ip address 10.0.10.2/24
switch(config-if)# ip ospf 1 area 0
switch(config-if)# vrrp 10 ip 10.0.10.1
switch(config-if)# vrrp 10 priority 120
switch(config-if)# vrrp 10 preempt

! === Switch-B (Secondary) ===
switch(config)# ip routing
switch(config)# router ospf 1
switch(config-ospf)# router-id 1.1.1.2
switch(config-ospf)# area 0
switch(config-ospf)# redistribute connected
switch(config-ospf)# bfd
switch(config-ospf)# exit

switch(config)# interface vlan 10
switch(config-if)# ip address 10.0.10.3/24
switch(config-if)# ip ospf 1 area 0
switch(config-if)# vrrp 10 ip 10.0.10.1
switch(config-if)# vrrp 10 priority 100
```

---

### 5.10 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| OSPF | Link-state, SPF algorithm, areas |
| OSPF Config | router ospf, area, interface assignment |
| BFD | Fast failure detection |
| VRRP | Gateway redundancy, VIP, priority |
| Static Routes | Next-hop, default, floating |
| Route Redistribution | Between protocols |
| ECMP | Load balancing across equal-cost paths |
| Show Commands | show ip route, show ospf, show vrrp |

---

### 5.11 Referensi

1. ArubaOS-CX Routing Configuration Guide
2. OSPF Configuration Best Practices
3. VRRP Configuration Guide
4. BFD Configuration Guide
5. HPE7-A01 Exam Preparation Guide
