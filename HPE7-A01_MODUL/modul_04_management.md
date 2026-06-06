# MODUL 4: NETWORK MANAGEMENT
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 4.1 Aruba Central Overview

#### Arsitektur Central
```
┌─────────────────────────────────────────────────────────┐
│                    Aruba Central (Cloud)                 │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Device   │  │ AI       │  │ Workflow │             │
│  │ Mgmt     │  │ Insights │  │ Automation│             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Monitor  │  │ Template │  │ Reports  │             │
│  │ & Health │  │ Groups   │  │ & Compliance│           │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                            │ HTTPS/REST API
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐         ┌────┴────┐
   │ Switches│         │   APs   │         │Gateways │
   │ (CX)    │         │         │         │         │
   └─────────┘         └─────────┘         └─────────┘
```

#### Fitur Utama Central
- **Unified Management:** Single pane of glass
- **AI Insights:** Anomaly detection, recommendations
- **Template Groups:** Mass configuration
- **Monitoring:** Real-time health and performance
- **Reporting:** Compliance and audit reports
- **Workflow Automation:** Zero-touch provisioning

---

### 4.2 Device Groups and Templates

#### Group Structure
```
All Devices
├── Campus-A
│   ├── Building-1
│   │   ├── Floor-1
│   │   └── Floor-2
│   └── Building-2
├── Campus-B
└── Branch-Offices
```

#### Template Configuration
```
Template Group: Campus-A-Switch
  Interfaces:
    - Uplink: LAG 1 (trunk)
    - Access: VLAN 10, 20, 30
  
  VLANs:
    - 10: Users
    - 20: Voice
    - 30: IoT
    - 99: Management
  
  Management:
    - NTP: pool.ntp.org
    - SNMP: community "readonly"
    - Syslog: 10.0.0.5
    - DNS: 10.0.0.2
```

---

### 4.3 AI Insights

#### Fitur AI Insights
- **Client Insights:** User experience scoring
- **Network Insights:** Anomaly detection
- **Security Insights:** Threat identification
- **Proactive Recommendations:** Optimization suggestions

#### AI-Powered Features
1. **AI Troubleshooting:** Automated root cause analysis
2. **AI Search:** Natural language search
3. **AI Driven RF:** AirMatch integration
4. **AI Client Match:** ClientMatch optimization

---

### 4.4 Firmware Management

#### Firmware Update Process
```
1. Upload firmware to Central
2. Create update policy
3. Schedule maintenance window
4. Staged rollout (test group first)
5. Monitor for issues
6. Rollback if needed
```

#### Best Practices
- Always test on non-critical devices first
- Use maintenance windows for production
- Have rollback plan
- Monitor after update

---

### 4.5 SNMP Configuration

#### SNMPv3 Configuration
```
! On Aruba CX
switch(config)# snmp-server user admin
switch(config-snmp-user)# auth sha AuthPass123
switch(config-snmp-user)# priv aes PrivPass123

switch(config)# snmp-server host 10.0.0.5 version 3 user admin

! SNMP Traps
switch(config)# snmp-server enable trap
switch(config)# snmp-server host 10.0.0.5 trap version 3 user admin
```

#### SNMPv3 Security Levels
- **noAuthNoPriv:** No authentication, no encryption
- **authNoPriv:** Authentication only
- **authPriv:** Authentication + encryption (recommended)

---

### 4.6 sFlow Configuration

#### Konsep
sFlow adalah teknologi sampling traffic untuk monitoring jaringan.

#### Konfigurasi sFlow
```
! Enable sFlow globally
switch(config)# sflow

! Configure collector
switch(config)# sflow collector 10.0.0.5

! Configure sampling rate
switch(config)# sflow sampling-rate 1000

! Configure polling interval
switch(config)# sflow polling-interval 30

! Apply to interface
switch(config)# interface 1/1/1
switch(config-if)# sflow enable
```

---

### 4.7 REST API

#### ArubaOS-CX REST API
```
! Enable REST API
switch(config)# https-server rest

! Access REST API
GET https://<switch-ip>/rest/v10.08/system
GET https://<switch-ip>/rest/v10.08/interfaces
GET https://<switch-ip>/rest/v10.08/vlans
GET https://<switch-ip>/rest/v10.08/ip-routes
```

#### API Authentication
```
! Create API user
switch(config)# user admin group administrators password
switch(config)# https-server rest access-mode read-write
```

#### Contoh API Calls
```bash
# Get system info
curl -k -u admin:password \
  https://10.0.99.1/rest/v10.08/system

# Get interfaces
curl -k -u admin:password \
  https://10.0.99.1/rest/v10.08/interfaces

# Get VLANs
curl -k -u admin:password \
  https://10.0.99.1/rest/v10.08/vlans
```

---

### 4.8 Aruba Network Analytics Engine (NAE)

#### Konsep
NAE adalah framework untuk real-time network monitoring dan analytics menggunakan Python agents.

#### Arsitektur NAE
```
┌─────────────────────────────────────────────────────────┐
│                    NAE Framework                         │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Python   │  │ Sensor   │  │ Alert    │             │
│  │ Agents   │  │ Database │  │ Engine   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
│  ┌──────────┐  ┌──────────┐                            │
│  │ REST     │  │ CLI      │                            │
│  │ API      │  │ Interface│                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
```

#### NAE Agent Example
```python
# Monitor interface utilization
from nae import Agent, Sensor, Alert

class InterfaceMonitor(Agent):
    def __init__(self):
        super().__init__("interface-monitor")
        self.sensor = Sensor("interface-stats")
    
    def run(self):
        stats = self.get_interface_stats("1/1/1")
        utilization = (stats.rx_bytes + stats.tx_bytes) / stats.capacity
        self.sensor.set("utilization", utilization)
        
        if utilization > 0.8:
            self.alert("High utilization on 1/1/1", severity="warning")
```

---

### 4.9 LLDP and LLDP-MED

#### LLDP Configuration
```
! Enable LLDP globally
switch(config)# lldp enable

! Configure LLDP on interface
switch(config)# interface 1/1/1
switch(config-if)# lldp transmit
switch(config-if)# lldp receive

! LLDP-MED for IP phones
switch(config-if)# lldp med
switch(config-if)# lldp med network-policy voice vlan 20
```

#### LLDP Information
```
switch# show lldp neighbors
switch# show lldp neighbors interface 1/1/1
switch# show lldp statistics
```

---

### 4.10 NTP Configuration

#### Konfigurasi NTP
```
! Configure NTP servers
switch(config)# ntp server 10.0.0.2
switch(config)# ntp server pool.ntp.org

! Configure timezone
switch(config)# clock timezone Asia/Jakarta +7

! Verify NTP
switch# show ntp status
switch# show ntp associations
```

---

### 4.11 Lab Exercise: Central Deployment

#### Scenario
Deploy Aruba Central for:
- 50 CX switches
- 100 APs
- 2 gateways

#### Tasks
1. Set up Central account
2. Create device groups
3. Configure template groups
4. Onboard devices
5. Set up monitoring
6. Configure AI Insights
7. Deploy firmware updates

---

### 4.12 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| Aruba Central | Cloud management, unified dashboard |
| Template Groups | Mass configuration |
| AI Insights | Anomaly detection, recommendations |
| Firmware Mgmt | Staged rollout, rollback plan |
| SNMPv3 | Auth + encryption |
| sFlow | Traffic sampling |
| REST API | Programmability, automation |
| NAE | Real-time monitoring, Python agents |
| LLDP | Device discovery, LLDP-MED for phones |
| NTP | Time synchronization |

---

### 4.13 Referensi

1. Aruba Central User Guide
2. ArubaOS-CX REST API Reference
3. Aruba NAE Configuration Guide
4. Aruba SNMP Configuration Guide
5. Aruba sFlow Configuration Guide
6. HPE7-A01 Exam Preparation Guide
