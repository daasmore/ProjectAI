# MODUL 2: WIRELESS NETWORKING
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 2.1 Wi-Fi Standards Overview

#### 802.11 Standards Comparison

| Standard | Year | Frequency | Max Rate | Key Features |
|----------|------|-----------|----------|--------------|
| 802.11a | 1999 | 5 GHz | 54 Mbps | OFDM |
| 802.11b | 1999 | 2.4 GHz | 11 Mbps | DSSS |
| 802.11g | 2003 | 2.4 GHz | 54 Mbps | OFDM |
| 802.11n (Wi-Fi 4) | 2009 | 2.4/5 GHz | 600 Mbps | MIMO, 40 MHz |
| 802.11ac (Wi-Fi 5) | 2013 | 5 GHz | 6.9 Gbps | MU-MIMO, 160 MHz |
| 802.11ax (Wi-Fi 6) | 2019 | 2.4/5 GHz | 9.6 Gbps | OFDMA, TWT, BSS Coloring |
| 802.11ax (Wi-Fi 6E) | 2020 | 2.4/5/6 GHz | 9.6 Gbps | 6 GHz band |
| 802.11be (Wi-Fi 7) | 2024 | 2.4/5/6 GHz | 46 Gbps | MLO, 320 MHz |

#### Wi-Fi 6 Key Technologies

1. **OFDMA (Orthogonal Frequency Division Multiple Access)**
   - Membagi channel menjadi Resource Units (RUs)
   - Memungkinkan multi-user simultaneous transmission
   - Efisien untuk small packets (IoT, voice)

2. **MU-MIMO (Multi-User MIMO)**
   - Downlink MU-MIMO (Wi-Fi 5)
   - Uplink + Downlink MU-MIMO (Wi-Fi 6)
   - Max 8 spatial streams

3. **BSS Coloring**
   - Tag pada frame untuk identifikasi BSS
   - Memungkinkan spatial reuse pada channel yang sama
   - Mengurangi co-channel interference

4. **TWT (Target Wake Time)**
   - Schedule wake/sleep untuk IoT devices
   - Menghemat battery
   - Mengurangi contention

---

### 2.2 Aruba Wireless Architecture

#### Controller-Based Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Aruba Mobility Controller             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  WLAN    │  │  ARM     │  │  AAA     │  │ Firewall│ │
│  │  Config  │  │  Engine  │  │  Profile │  │  Roles  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
                            │ CAPWAP Tunnel
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
   │  AP-1   │         │  AP-2   │         │  AP-3   │
   └─────────┘         └─────────┘         └─────────┘
```

#### Controllerless (Instant) Architecture
```
┌─────────────────────────────────────────────────────────┐
│                   Aruba Instant AP Cluster               │
│                                                         │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐            │
│  │  IAP-1  │◄──►│  IAP-2  │◄──►│  IAP-3  │            │
│  │ (Master)│    │ (Member)│    │ (Member)│            │
│  └─────────┘    └─────────┘    └─────────┘            │
│       │                                                 │
│       └── Virtual Controller (built into master AP)     │
└─────────────────────────────────────────────────────────┘
```

#### Cloud-Managed Architecture (Aruba Central)
```
┌─────────────────────────────────────────────────────────┐
│                    Aruba Central (Cloud)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  WLAN    │  │  Device  │  │  AI      │             │
│  │  Config  │  │  Mgmt    │  │  Insights│             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                            │ HTTPS/REST API
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
   │ Gateway │         │   AP    │         │   AP    │
   └─────────┘         └─────────┘         └─────────┘
```

---

### 2.3 Aruba AP Boot Process

#### Discovery Methods
1. **DHCP Option 43:** Controller IP in DHCP response
2. **DNS Discovery:** `aruba-master` DNS record
3. **Broadcast:** Layer 2 broadcast discovery
4. **Static:** Pre-configured controller IP
5. **Aruba Activate:** Cloud-based provisioning

#### Boot Sequence
1. AP boots and gets IP via DHCP
2. AP discovers controller (methods above)
3. AP establishes CAPWAP tunnel with controller
4. AP downloads configuration from controller
5. AP starts broadcasting SSIDs

#### CAPWAP Protocol
- **Control Tunnel (UDP 5246):** Management traffic
- **Data Tunnel (UDP 5247):** User traffic (optional local breakout)
- **DTLS:** Encryption for control tunnel

---

### 2.4 ARM (Adaptive Radio Management)

#### Fungsi ARM
- **Channel Assignment:** Automatic channel selection
- **Power Control:** Automatic transmit power adjustment
- **Coverage Hole Detection:** Identify weak coverage areas
- **Band Steering:** Encourage 5 GHz usage

#### ARM Configuration
```
! On Aruba Controller
wlan arm
  assignment disable
  scanning
  wide-bands 5ghz
  80mhz-support
  min-tx-power 9
  max-tx-power 18
  client-aware
  rogue-ap-aware
  rogue-ap-aware
```

#### ARM Scanning
- APs scan channels during idle periods
- Collects neighbor information
- Reports to controller for optimization
- Controller makes channel/power decisions

---

### 2.5 AirMatch

#### Konsep
AirMatch adalah AI-powered RF optimization engine yang menggantikan ARM di deployment modern.

#### Fitur AirMatch
- **Automated RF optimization:** Machine learning-based
- **Event-driven optimization:** Triggered by network changes
- **AirMatch AP:** Dedicated AP for continuous scanning
- **Dynamic channel width:** Adjusts based on density

#### Perbedaan ARM vs AirMatch

| Feature | ARM | AirMatch |
|---------|-----|----------|
| Algorithm | Rule-based | AI/ML-based |
| Scanning | Periodic | Continuous |
| Optimization | Reactive | Proactive |
| Channel width | Fixed | Dynamic |
| Deployment | All APs | Dedicated APs |

---

### 2.6 ClientMatch

#### Konsep
ClientMatch adalah teknologi untuk steering client ke AP dan band yang optimal.

#### Fitur ClientMatch
- **Sticky client prevention:** Mencegah client "terlalu lama" di AP lemah
- **Band steering:** Mendorong ke 5 GHz
- **Load balancing:** Distribusi client across APs
- **802.11v BSS Transition:** Assisted roaming

#### Konfigurasi ClientMatch
```
wlan client-match
  sticky-client
  sticky-client-check-interval 5
  sticky-client-threshold 20
  band-steering
  load-balancing
```

---

### 2.7 Wireless Security

#### Security Standards

| Standard | Encryption | Authentication | Status |
|----------|------------|----------------|--------|
| WEP | RC4 | Open/Shared | Deprecated |
| WPA | TKIP | PSK/802.1X | Deprecated |
| WPA2 | AES-CCMP | PSK/802.1X | Current |
| WPA3 | AES-GCMP-256 | SAE/802.1X | Recommended |

#### WPA3 Features
- **SAE (Simultaneous Authentication of Equals):** Replaces PSK
- **Forward Secrecy:** Session keys not derived from master key
- **Protected Management Frames (PMF):** Mandatory
- **192-bit Security Suite:** Enterprise mode

#### EAP Methods Comparison

| Method | Client Cert | Server Cert | Security | Complexity |
|--------|-------------|-------------|----------|------------|
| PEAP | No | Yes | High | Medium |
| EAP-TLS | Yes | Yes | Highest | High |
| EAP-TTLS | Optional | Yes | High | Medium |
| EAP-FAST | Optional | No | High | Medium |

#### 802.1X Authentication Flow
```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │     │    AP    │     │  RADIUS  │
│(Supplicant)│   │(Authenticator)│ │  Server  │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     │  EAPOL-Start   │                │
     │───────────────►│                │
     │  EAP-Identity  │                │
     │◄───────────────│                │
     │  Identity      │  RADIUS        │
     │───────────────►│───────────────►│
     │                │  RADIUS        │
     │  EAP-Challenge │◄───────────────│
     │◄───────────────│                │
     │  EAP-Response  │  RADIUS        │
     │───────────────►│───────────────►│
     │                │  RADIUS        │
     │  EAP-Success   │◄───────────────│
     │◄───────────────│                │
     │  4-Way Handshake│               │
     │◄──────────────►│                │
```

---

### 2.8 Fast Roaming

#### Roaming Standards

| Standard | Feature | Description |
|----------|---------|-------------|
| 802.11r | Fast BSS Transition | Pre-authentication for fast roaming |
| 802.11k | Radio Resource Management | Neighbor reports for faster AP selection |
| 802.11v | BSS Transition Management | AP-assisted roaming decisions |
| 802.11u | Interworking | Network discovery and selection |

#### PMK Caching
- **OKC (Opportunistic Key Caching):** Standard PMK caching
- **Proprietary:** Vendor-specific implementations
- **Sticky PMK:** PMK cached per AP

#### Roaming Optimization
```
! On Aruba Controller
wlan dot11r
wlan dot11k
wlan dot11v
wlan dot11u
```

---

### 2.9 Wireless QoS

#### WMM (Wi-Fi Multimedia)
- **Voice (AC_VO):** Highest priority
- **Video (AC_VI):** High priority
- **Best Effort (AC_BE):** Normal priority
- **Background (AC_BK):** Lowest priority

#### QoS Mapping
```
WMM Access Category → DSCP → Queue
AC_VO (Voice)      → DSCP 46 → Queue 7
AC_VI (Video)      → DSCP 34 → Queue 5
AC_BE (Best Effort)→ DSCP 0  → Queue 0
AC_BK (Background) → DSCP 8  → Queue 1
```

#### Airtime Fairness
- Mencegah slow client "monopoli" airtime
- Memastikan fair access untuk semua client
- Berguna di lingkungan mixed-client

---

### 2.10 Wireless Troubleshooting

#### Common Issues

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| No connectivity | DHCP failure | Check DHCP server, VLAN |
| Poor performance | Interference | Check channel utilization |
| Roaming issues | Sticky client | Enable ClientMatch |
| Authentication failure | RADIUS issue | Check RADIUS server |
| Slow speeds | Low data rate | Check signal strength |

#### Troubleshooting Commands
```
! On Aruba Controller
show ap database              # AP status
show ap active               # Active APs
show ap radio-database       # Radio info
show station-table           # Connected clients
show user-table              # User sessions
show wlan virtual-ap         # Virtual AP status
show log all                 # System logs
show log security            # Security logs
```

#### Client Troubleshooting
```
show station mac <mac>       # Client details
show user mac <mac>          # User details
show ap client-stats <mac>   # Client statistics
show ap radio-stats <ap>     # Radio statistics
```

---

### 2.11 Lab Exercise: Wireless Deployment

#### Scenario
Deploy wireless network for a campus with:
- 50 APs (Aruba 515)
- 3 SSIDs: Corporate, Guest, IoT
- WPA2-Enterprise for Corporate
- Captive portal for Guest
- WPA2-PSK for IoT

#### Tasks
1. Configure WLAN profiles
2. Set up 802.1X authentication
3. Configure guest captive portal
4. Enable ARM/AirMatch
5. Configure ClientMatch
6. Test connectivity and roaming

#### Solution Outline
```
! === WLAN Profile: Corporate ===
wlan ssid-profile "Corporate"
  essid "Corporate"
  opmode wpa2-aes
  auth-server "ClearPass"
  vlan 10

wlan virtual-ap "Corporate-VAP"
  ssid-profile "Corporate"
  vlan 10
  aaa-profile "Corporate-AAA"
  forward-mode tunnel

! === AAA Profile ===
aaa profile "Corporate-AAA"
  authentication-dot1x "default"
  dot1x-default-role "authenticated"
  radius-accounting "ClearPass"

! === Guest WLAN ===
wlan ssid-profile "Guest"
  essid "Guest"
  opmode none
  vlan 20

wlan virtual-ap "Guest-VAP"
  ssid-profile "Guest"
  vlan 20
  aaa-profile "Guest-AAA"
  forward-mode tunnel

aaa profile "Guest-AAA"
  initial-role "guest-logon"
  captive-portal "guest-portal"
```

---

### 2.12 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| Wi-Fi 6 | OFDMA, MU-MIMO, BSS Coloring, TWT |
| Architecture | Controller, Instant, Cloud (Central) |
| AP Boot | DHCP 43, DNS, Broadcast, CAPWAP |
| ARM | Channel/power optimization |
| AirMatch | AI-powered RF optimization |
| ClientMatch | Client steering, band steering |
| Security | WPA3, 802.1X, EAP methods |
| Fast Roaming | 802.11r/k/v, PMK caching |
| QoS | WMM, Airtime Fairness |
| Troubleshooting | show commands, client debug |

---

### 2.13 Referensi

1. Aruba Mobility Controller User Guide
2. ArubaOS 8.x User Guide
3. Aruba Wireless Configuration Guide
4. 802.11ax (Wi-Fi 6) Technical Overview
5. HPE7-A01 Exam Preparation Guide
