# MODUL 1: ARUBA NETWORKING FUNDAMENTALS
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 1.1 Aruba Product Portfolio

#### Aruba CX Switch Series

| Series | Layer | Fitur Utama | Use Case |
|--------|-------|-------------|----------|
| 6100 | L2+ | PoE+, VSF | Small branch, access layer |
| 6200 | L3 | VSX, VSF | Campus access, aggregation |
| 6300 | L3 | VSX, VSF, high-density | Campus core, data center |
| 6400 | L3 | VOQ fabric, modular | Data center, campus core |
| 8320 | L3 | High-performance leaf/spine | Data center |
| 8360 | L3 | Flexible leaf/spine | Data center, campus |

#### Aruba Access Point Series

| Series | Wi-Fi Standard | Use Case |
|--------|----------------|----------|
| 500 series | Wi-Fi 6 | Indoor, standard density |
| 510 series | Wi-Fi 6 | Indoor, high density |
| 530 series | Wi-Fi 6 | Outdoor |
| 550 series | Wi-Fi 6 | High-density indoor |
| 560 series | Wi-Fi 6E | Indoor, 6 GHz capable |
| 630 series | Wi-Fi 6E | High-performance indoor |

---

### 1.2 ArubaOS-CX Architecture

#### Key Components
- **ASIC:** Programmable chip for hardware-accelerated forwarding
- **VOQ (Virtual Output Queuing):** Eliminates head-of-line blocking
- **Unified OS:** Same OS across all CX switches
- **REST API:** Built-in programmability

#### Boot Process
1. Hardware initialization
2. Boot loader execution
3. ArubaOS-CX kernel load
4. Configuration loading from `/startup-config`

#### File System
```
/flash/
├── config/           # Configuration files
│   ├── primary/      # Primary config
│   └── secondary/    # Secondary config
├── firmware/         # OS images
└── certificates/     # Certificates
```

---

### 1.3 VSF (Virtual Switching Framework)

#### Konsep
VSF memungkinkan beberapa switch fisik digabung menjadi satu switch logis.

#### Karakteristik VSF
- **Max member:** 10 switch
- **Max bandwidth:** 640 Gbps (6300 series)
- **Uplink:** Any port can be VSF link
- **Resilience:** Sub-second failover

#### Konfigurasi VSF
```
! Configure VSF member
switch(config)# vsf member 1
switch(config)# vsf member 2

! Set VSF link
switch(config)# vsf link 1/1/49
switch(config)# vsf link 1/1/50

! Enable VSX
switch(config)# vsx
switch(config-vsx)# inter-switch-link lag 1
```

#### Perintah Show VSF
```
show vsf                    # VSF topology
show vsf detail             # Detailed info
show vsf member             # Member status
show vsf link               # Link status
```

---

### 1.4 VSX (Virtual Switching Extension)

#### Konsep
VSX memungkinkan dua switch fisik bertindak sebagai satu switch L2/L3 dengan redundansi penuh.

#### Arsitektur VSX
```
                    ┌─────────────────┐
                    │   MC-LAG to     │
                    │   Downstream    │
                    └────────┬────────┘
                             │ ISL + LAG
                    ┌────────┴────────┐
                    │                 │
              ┌─────┴─────┐   ┌─────┴─────┐
              │  Primary  │   │ Secondary │
              │   VSX     │ ISL│   VSX     │
              │  Switch   │◄──►│  Switch   │
              └─────┬─────┘   └─────┬─────┘
                    │               │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │  Upstream     │
                    │  (MC-LAG)     │
                    └───────────────┘
```

#### Komponen VSX
1. **ISL (Inter-Switch Link):** Menghubungkan VSX pair
2. **Keepalive:** Mendeteksi kegagalan peer
3. **vPC+ (Virtual Port Channel+):** Multi-chassis LAG

#### Konfigurasi Dasar VSX
```
! === Primary Switch ===
switch(config)# vsx
switch(config-vsx)# role primary
switch(config-vsx)# inter-switch-link lag 1
switch(config-vsx)# keepalive peer 10.0.0.2 source 10.0.0.1
switch(config-vsx)# vsx-sync aaa
switch(config-vsx)# vsx-sync acl

! === Secondary Switch ===
switch(config)# vsx
switch(config-vsx)# role secondary
switch(config-vsx)# inter-switch-link lag 1
switch(config-vsx)# keepalive peer 10.0.0.1 source 10.0.0.2
```

#### VSX Keepalive
- **Protocol:** UDP
- **Default interval:** 1 second
- **Hold timer:** 3 seconds
- **Purpose:** Split-brain prevention

#### VSX Sync
```
vsx-sync aaa                # Sync AAA config
vsx-sync acl                # Sync ACLs
vsx-sync dns                # Sync DNS
vsx-sync lldp               # Sync LLDP
vsx-sync mac-address-table  # Sync MAC table
vsx-sync sflow              # Sync sFlow
vsx-sync ssh                # Sync SSH keys
vsx-sync stp                # Sync STP
vsx-sync vlan               # Sync VLANs
vsx-sync vsx-global         # Sync global VSX config
```

#### Perintah Show VSX
```
show vsx status             # VSX operational status
show vsx config-consistency # Config sync status
show vsx statistics         # VSX statistics
```

---

### 1.5 VLAN Configuration

#### VLAN Types
- **Default VLAN:** VLAN 1 (cannot be deleted)
- **Management VLAN:** For switch management
- **Native VLAN:** Untagged traffic on trunk
- **Voice VLAN:** For VoIP devices
- **Guest VLAN:** For guest access

#### Konfigurasi VLAN
```
! Create VLAN
switch(config)# vlan 10
switch(config-vlan-10)# name "Engineering"
switch(config-vlan-10)# exit

switch(config)# vlan 20
switch(config-vlan-20)# name "Marketing"
switch(config-vlan-20)# exit

! Access port
switch(config)# interface 1/1/1
switch(config-if)# no routing
switch(config-if)# vlan access 10

! Trunk port
switch(config)# interface 1/1/48
switch(config-if)# no routing
switch(config-if)# vlan trunk allowed 10,20,30
switch(config-if)# vlan trunk native 1
```

#### Perintah Show VLAN
```
show vlan                   # All VLANs
show vlan 10                # Specific VLAN
show vlan port 1/1/1        # VLAN on port
show vlan trunk             # Trunk VLANs
```

---

### 1.6 Spanning Tree Protocol

#### STP Modes on Aruba CX
- **STP (802.1D):** Legacy, slow convergence
- **RSTP (802.1w):** Default, fast convergence
- **MSTP (802.1s):** Multiple spanning trees, recommended

#### Konfigurasi MSTP
```
switch(config)# spanning-tree mode mstp
switch(config)# spanning-tree mst configuration
switch(config-mst)# name "Campus-STP"
switch(config-mst)# revision 1
switch(config-mst)# instance 1 vlan 10,20,30
switch(config-mst)# instance 2 vlan 40,50,60
switch(config-mst)# exit

! Set root bridge priority
switch(config)# spanning-tree mst 1 priority 4096
```

#### STP Features
```
spanning-tree port-type edge        # PortFast equivalent
spanning-tree bpdu-guard           # BPDU Guard
spanning-tree root-guard            # Root Guard
spanning-tree loop-guard            # Loop Guard
spanning-tree tc-guard              # Topology Change Guard
```

---

### 1.7 Link Aggregation (LACP)

#### Konsep
LACP (Link Aggregation Control Protocol) menggabungkan beberapa link fisik menjadi satu link logis.

#### LACP Modes
- **Active:** Mengirim LACPDUs aktif
- **Passive:** Menunggu LACPDUs dari peer

#### Konfigurasi LAG
```
! Create LAG
switch(config)# interface lag 1 multi-chassis
switch(config-lag-if)# no routing
switch(config-lag-if)# vlan trunk allowed 10,20,30
switch(config-lag-if)# lacp mode active
switch(config-lag-if)# lacp rate fast
switch(config-lag-if)# exit

! Add member ports
switch(config)# interface 1/1/1
switch(config-if)# lag 1

switch(config)# interface 1/1/2
switch(config-if)# lag 1
```

#### Perintah Show LAG
```
show lacp interfaces           # LACP status
show lag 1                     # LAG details
show interface lag 1           # LAG interface info
```

---

### 1.8 DHCP Snooping

#### Konsep
DHCP Snooping mencegah rogue DHCP server dengan memfilter DHCP messages.

#### Konfigurasi
```
! Enable DHCP snooping globally
switch(config)# ip dhcp snooping

! Enable on VLAN
switch(config)# ip dhcp snooping vlan 10

! Configure trusted port
switch(config)# interface 1/1/48
switch(config-if)# ip dhcp snooping trust
```

#### Fitur Terkait
- **Dynamic ARP Inspection (DAI):** Mencegah ARP spoofing
- **IP Source Guard:** Mencegah IP spoofing

---

### 1.9 Lab Exercise: Basic Switch Configuration

#### Topology
```
[PC-A] --- (1/1/1) [Switch-A] --- (1/1/48) [Switch-B] --- (1/1/1) [PC-B]
                         |                              |
                    VLAN 10                        VLAN 10
                    10.0.10.0/24                  10.0.10.0/24
```

#### Tasks
1. Configure hostname and management IP
2. Create VLANs (10, 20, 99)
3. Assign access ports
4. Configure trunk between switches
5. Configure LAG for redundancy
6. Enable DHCP snooping
7. Verify connectivity

#### Solution
```
! === Switch-A ===
switch(config)# hostname Switch-A
Switch-A(config)# interface 1/1/1
Switch-A(config-if)# no routing
Switch-A(config-if)# vlan access 10
Switch-A(config-if)# exit

Switch-A(config)# interface lag 1 multi-chassis
Switch-A(config-lag-if)# no routing
Switch-A(config-lag-if)# vlan trunk allowed 10,20,99
Switch-A(config-lag-if)# exit

Switch-A(config)# interface 1/1/48
Switch-A(config-if)# lag 1

Switch-A(config)# vlan 10
Switch-A(config-vlan-10)# name "Users"
Switch-A(config)# vlan 20
Switch-A(config-vlan-20)# name "Servers"
Switch-A(config)# vlan 99
Switch-A(config-vlan-99)# name "Management"

Switch-A(config)# interface vlan 99
Switch-A(config-if)# ip address 10.0.99.1/24
Switch-A(config-if)# exit

Switch-A(config)# ip route 0.0.0.0/0 10.0.99.254

Switch-A(config)# ip dhcp snooping
Switch-A(config)# ip dhcp snooping vlan 10
Switch-A(config)# interface lag 1
Switch-A(config-if)# ip dhcp snooping trust
```

---

### 1.10 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| Aruba CX Series | 6100-6400, VOQ, programmable ASIC |
| VSF | Stack up to 10 switches, single management |
| VSX | Active-active pair, ISL, keepalive, sync |
| VLAN | Access/trunk, native VLAN, voice VLAN |
| STP | MSTP recommended, BPDU guard, root guard |
| LACP | Active/passive, max 8 members per LAG |
| DHCP Snooping | Trust/untrusted ports, DAI, IP Source Guard |

---

### 1.11 Referensi

1. ArubaOS-CX 10.10 Fundamentals Guide
2. ArubaOS-CX 10.10 CLI Reference Guide
3. Aruba VSX Configuration Guide
4. Aruba VSF Configuration Guide
5. HPE7-A01 Exam Preparation Guide
