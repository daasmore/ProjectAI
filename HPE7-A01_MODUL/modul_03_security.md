# MODUL 3: NETWORK SECURITY
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 3.1 Aruba ClearPass Overview

#### Arsitektur ClearPass
```
┌─────────────────────────────────────────────────────────┐
│                 ClearPass Policy Manager                  │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Policy   │  │ Device   │  │ Guest    │             │
│  │ Engine   │  │ Profiler │  │ Manager  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Onboard  │  │ Insight  │  │ API      │             │
│  │ (PKI)    │  │ (Reports)│  │ Services │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
         │                │                │
    ┌────┴────┐     ┌────┴────┐     ┌────┴────┐
    │  NAD    │     │  AD/LDAP│     │  MDM    │
    │(Switch/AP)│   │         │     │         │
    └─────────┘     └─────────┘     └─────────┘
```

#### Komponen ClearPass

| Komponen | Fungsi |
|----------|--------|
| Policy Server | Authentication, authorization, accounting |
| Device Profiler | Auto-discovery dan klasifikasi perangkat |
| Guest Manager | Self-registration dan sponsor approval |
| Onboard | Certificate provisioning untuk BYOD |
| Insight | Reporting dan monitoring |
| API Services | REST API untuk integrasi |

---

### 3.2 Authentication Methods

#### 802.1X (Port-Based NAC)
```
┌──────────┐     ┌──────────┐     ┌──────────┐
│Supplicant│     │Authenticator│   │  RADIUS  │
│ (Client) │     │ (Switch/AP) │   │ (ClearPass)│
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     │  EAPOL-Start   │                │
     │───────────────►│                │
     │  EAP-Identity  │                │
     │◄───────────────│                │
     │  Identity      │  Access-Request│
     │───────────────►│───────────────►│
     │                │  Access-Challenge│
     │  EAP-Request   │◄───────────────│
     │◄───────────────│                │
     │  EAP-Response  │  Access-Request│
     │───────────────►│───────────────►│
     │                │  Access-Accept │
     │  EAP-Success   │◄───────────────│
     │◄───────────────│                │
```

#### MAC Authentication Bypass (MAB)
- Untuk perangkat yang tidak support 802.1X (printer, IP camera)
- Menggunakan MAC address sebagai credential
- Less secure than 802.1X, but better than no authentication

#### Captive Portal
- Web-based authentication
- Untuk guest access dan BYOD onboarding
- Dapat dikombinasikan dengan sponsor approval

#### Multi-Factor Authentication (MFA)
- Certificate + Username/Password
- Certificate + MAC address
- Username/Password + OTP

---

### 3.3 EAP Methods Deep Dive

#### EAP-TLS (Most Secure)
```
Client                              Server
  │                                   │
  │──── ClientHello ─────────────────►│
  │◄─── ServerHello + Certificate ───│
  │──── Client Certificate ─────────►│
  │──── Key Exchange ───────────────►│
  │──── Finished ───────────────────►│
  │◄─── Finished ────────────────────│
  │                                   │
  │  Mutual certificate validation    │
  │  Strongest security               │
```

**Kebutuhan:**
- Client certificate
- Server certificate
- PKI infrastructure

#### PEAP (Most Common)
```
Client                              Server
  │                                   │
  │──── EAPOL-Start ────────────────►│
  │◄─── EAP-Request/Identity ────────│
  │──── EAP-Response/Identity ──────►│
  │◄─── PEAP Server Hello + Cert ───│
  │──── TLS Tunnel Established ─────►│
  │     (Inner EAP: MSCHAPv2)       │
  │◄─── MSCHAPv2 Challenge ─────────│
  │──── MSCHAPv2 Response ──────────►│
  │◄─── MSCHAPv2 Success ───────────│
  │◄─── EAP-Success ────────────────│
```

**Kebutuhan:**
- Server certificate
- Username/password (inner method: MSCHAPv2)

#### EAP-TTLS
- Similar to PEAP but more flexible
- Supports multiple inner methods
- Client certificate optional

#### EAP-FAST
- Cisco proprietary (now open)
- Uses PAC (Protected Access Credential)
- No server certificate required (optional)

---

### 3.4 ClearPass Policy Engine

#### Policy Components

1. **Authentication Sources**
   - Active Directory
   - LDAP
   - Internal Database
   - Certificate
   - Social Login

2. **Authentication Methods**
   - EAP-TLS, PEAP, EAP-TTLS, EAP-FAST
   - MAC Authentication
   - Captive Portal

3. **Enforcement Policies**
   - Conditions: Time, Location, Device Type, User Role
   - Actions: Allow, Deny, Role Assignment, VLAN, ACL

4. **Roles**
   - Employee
   - Contractor
   - Guest
   - IoT Device
   - Quarantine

#### Service Configuration
```
Service: 802.1X Wireless
  Conditions:
    - Connection: Wireless
    - Authentication: 802.1X
    - User Group: Employees
  Actions:
    - Role: Employee
    - VLAN: 10
    - ACL: Employee-ACL
    - Session Timeout: 8 hours
```

---

### 3.5 Device Profiling

#### Konsep
ClearPass Profiler mengidentifikasi dan mengklasifikasikan perangkat berdasarkan:
- MAC OUI (Organizationally Unique Identifier)
- DHCP fingerprint
- HTTP User-Agent
- SNMP data
- NMAP scan results

#### Profiling Methods
1. **MAC OUI Lookup:** Vendor identification
2. **DHCP Fingerprint:** OS and device type
3. **HTTP Analysis:** User-Agent string
4. **SNMP Query:** Device information
5. **NMAP Scan:** Port scanning

#### Profile Rules
```
Rule: IP Camera
  Condition: MAC OUI = "Axis" OR "Hikvision"
  OR DHCP Class = "axis"
  Action: Role = "IoT-Camera", VLAN = 30

Rule: Printer
  Condition: MAC OUI = "HP" AND Port = 9100
  Action: Role = "Printer", VLAN = 40
```

---

### 3.6 Dynamic Segmentation

#### Konsep
Dynamic segmentation memungkinkan enforcement policy yang mengikuti user/device, terlepas dari lokasi jaringan.

#### Implementasi
```
┌─────────────────────────────────────────────────────────┐
│                    Dynamic Segmentation                  │
│                                                         │
│  User Role: Employee                                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Policy: Allow access to:                        │   │
│  │   - Internal servers (VLAN 100)                 │   │
│  │   - Internet (via firewall)                     │   │
│  │ Deny access to:                                 │   │
│  │   - Guest network (VLAN 200)                    │   │
│  │   - IoT network (VLAN 300)                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Enforcement:                                           │
│  - Wired: User-role on switch port                      │
│  - Wireless: User-role on VAP                           │
│  - VPN: User-role on VPN tunnel                         │
└─────────────────────────────────────────────────────────┘
```

#### User-Role Configuration (Aruba CX)
```
! Create user role
switch(config)# role name employee
switch(config-role)# vlan 10
switch(config-role)# policy employee-policy
switch(config-role)# exit

! Apply role via 802.1X
switch(config)# aaa authentication dot1x
switch(config)# dot1x authenticator
switch(config)# dot1x authenticator port-auth-mode auto
```

---

### 3.7 Guest Management

#### Guest Access Methods

1. **Self-Registration**
   - Guest fills out registration form
   - Sponsor approval (optional)
   - Credentials via email/SMS

2. **Sponsor Portal**
   - Internal user creates guest account
   - Guest receives credentials
   - Time-limited access

3. **Social Login**
   - Login with Google, Facebook, etc.
   - Simplified registration
   - Limited access

#### Guest Policy
```
Guest Role:
  - VLAN: 200 (Guest)
  - ACL: Internet-only
  - Bandwidth: 5 Mbps down / 1 Mbps up
  - Session Timeout: 8 hours
  - Daily Limit: 2 hours
```

---

### 3.8 BYOD Onboarding

#### Onboarding Flow
```
1. Device connects to onboarding SSID
2. Redirected to captive portal
3. User authenticates with corporate credentials
4. ClearPass Onboard provisions certificate
5. Device configured with corporate SSID profile
6. Device reconnects to corporate SSID with certificate
```

#### Certificate Provisioning
```
ClearPass Onboard:
  1. Generate CSR (Certificate Signing Request)
  2. Sign with internal CA
  3. Install certificate on device
  4. Configure Wi-Fi profile (SSID + EAP-TLS)
  5. Configure VPN profile (optional)
```

---

### 3.9 RADIUS CoA (Change of Authorization)

#### Konsep
CoA memungkinkan perubahan authorization secara real-time tanpa disconnect user.

#### Use Cases
- **Quarantine:** Move user to quarantine VLAN
- **Bandwidth Change:** Adjust bandwidth limits
- **Session Termination:** Force disconnect
- **Role Change:** Update user role

#### CoA Flow
```
ClearPass                    Switch/AP
    │                           │
    │──── CoA-Request ─────────►│
    │     (Session-Timeout=0)   │
    │                           │
    │◄─── CoA-ACK ─────────────│
    │                           │
    │     User disconnected     │
    │     or role changed       │
```

---

### 3.10 802.1X on Aruba CX

#### Konfigurasi 802.1X
```
! Enable 802.1X globally
switch(config)# aaa authentication dot1x
switch(config)# dot1x authenticator

! Configure RADIUS server
switch(config)# radius-server host 10.0.0.10 key "secret"
switch(config)# radius-server host 10.0.0.11 key "secret"

! Configure 802.1X on port
switch(config)# interface 1/1/1
switch(config-if)# dot1x authenticator
switch(config-if)# dot1x authenticator port-auth-mode auto
switch(config-if)# dot1x authenticator guest-vlan 999
switch(config-if)# dot1x authenticator auth-fail-vlan 998
switch(config-if)# dot1x authenticator host-mode multi-auth
```

#### 802.1X Host Modes
- **Single-auth:** One device per port
- **Multi-auth:** Multiple devices per port
- **Multi-domain:** One data + one voice device

#### MAB Configuration
```
switch(config)# interface 1/1/1
switch(config-if)# mab
switch(config-if)# dot1x authenticator
switch(config-if)# authentication order mab dot1x
switch(config-if)# authentication priority dot1x mab
```

---

### 3.11 Lab Exercise: ClearPass Deployment

#### Scenario
Deploy ClearPass for:
- 500 employees (802.1X with PEAP)
- 100 guest users (captive portal)
- 50 IoT devices (MAB + profiling)

#### Tasks
1. Configure ClearPass server
2. Set up AD integration
3. Create authentication sources
4. Configure enforcement policies
5. Set up device profiling
6. Configure guest self-registration
7. Test authentication flows

---

### 3.12 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| ClearPass | Policy engine, profiler, guest manager |
| 802.1X | Supplicant, authenticator, RADIUS server |
| EAP Methods | TLS (most secure), PEAP (most common) |
| Profiling | MAC OUI, DHCP fingerprint, HTTP analysis |
| Dynamic Segmentation | Role-based policies, follows user |
| Guest Access | Self-registration, sponsor portal |
| BYOD | Onboarding, certificate provisioning |
| CoA | Real-time authorization changes |
| MAB | For non-802.1X devices |

---

### 3.13 Referensi

1. ClearPass Policy Manager User Guide
2. ClearPass Device Profiler Configuration Guide
3. ClearPass Guest Configuration Guide
4. ClearPass Onboard Configuration Guide
5. 802.1X Authentication Best Practices
6. HPE7-A01 Exam Preparation Guide
