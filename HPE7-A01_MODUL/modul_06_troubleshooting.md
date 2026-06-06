# MODUL 6: TROUBLESHOOTING
## Aruba Certified Campus Access Professional (HPE7-A01)

---

### 6.1 Troubleshooting Methodology

#### Systematic Approach
```
1. DEFINE    → Identify the problem
2. GATHER    → Collect information
3. ANALYZE   → Analyze the data
4. SOLVE     → Implement solution
5. VERIFY    → Confirm resolution
6. DOCUMENT  → Record findings
```

#### OSI Model Troubleshooting
```
Layer 7: Application    → HTTP, DNS, DHCP issues
Layer 6: Presentation   → Encryption, format issues
Layer 5: Session        → Session establishment
Layer 4: Transport      → TCP/UDP port issues
Layer 3: Network        → IP addressing, routing
Layer 2: Data Link      → VLAN, MAC, STP
Layer 1: Physical       → Cables, ports, power
```

---

### 6.2 Physical Layer Troubleshooting

#### Common Physical Issues
- Cable faults (broken, bent, wrong type)
- SFP/SFP+ compatibility
- PoE power budget exceeded
- Port disabled or error-disabled

#### Physical Troubleshooting Commands
```
show interface                    # Interface status
show interface brief              # Quick interface overview
show interface transceiver        # SFP information
show interface counters           # Error counters
show power-over-ethernet          # PoE status
show environment all              # Temperature, fans, power
```

#### Interface Status Interpretation
```
Status: up/up                    → Working
Status: up/down                  → Line protocol issue
Status: down/down                → Physical issue
Status: err-disabled             → Security violation
```

---

### 6.3 Data Link Layer Troubleshooting

#### VLAN Issues
```
show vlan                         # VLAN configuration
show vlan port 1/1/1              # VLAN on specific port
show mac-address-table            # MAC address table
show mac-address-table vlan 10    # MAC in specific VLAN
```

#### STP Issues
```
show spanning-tree                # STP status
show spanning-tree detail         # Detailed STP info
show spanning-tree interface      # STP per interface
show spanning-tree mst            # MSTP status
```

#### LAG Issues
```
show lacp interfaces              # LACP status
show lag 1                        # LAG details
show interface lag 1              # LAG interface info
```

---

### 6.4 Network Layer Troubleshooting

#### IP Connectivity
```
ping 10.0.10.1                    # Test connectivity
ping 10.0.10.1 source 10.0.10.2   # Source-specific ping
traceroute 10.0.10.1              # Trace path
show ip route 10.0.10.0           # Route lookup
show ip arp                       # ARP table
show ip interface brief           # Interface IP status
```

#### OSPF Troubleshooting
```
show ospf neighbor                # Check neighbor status
show ospf database                # Check LSDB
show ospf interface               # Check OSPF interfaces
show ip route ospf                # Check OSPF routes
show ospf statistics              # OSPF statistics
```

#### Common OSPF Issues
| Issue | Cause | Solution |
|-------|-------|----------|
| No neighbor | Area mismatch | Check area configuration |
| No neighbor | Hello/dead mismatch | Match timers |
| No neighbor | Authentication | Check auth config |
| No route | Network statement | Add network |
| No route | Passive interface | Remove passive |

---

### 6.5 Wireless Troubleshooting

#### AP Issues
```
show ap database                  # AP status
show ap active                    # Active APs
show ap radio-database            # Radio information
show ap debug                     # AP debug info
```

#### Client Issues
```
show station-table                # Connected clients
show user-table                   # User sessions
show station mac <mac>            # Client details
show user mac <mac>               # User details
show ap client-stats <mac>        # Client statistics
```

#### Common Wireless Issues
| Issue | Cause | Solution |
|-------|-------|----------|
| No connectivity | DHCP failure | Check DHCP, VLAN |
| Poor performance | Interference | Check channel utilization |
| Roaming issues | Sticky client | Enable ClientMatch |
| Auth failure | RADIUS issue | Check RADIUS server |
| Slow speeds | Low data rate | Check signal strength |

#### Wireless Debug Commands
```
show log all                      # System logs
show log security                 # Security logs
show log ap                       # AP logs
show ap debug client-stats <mac>  # Client debug
show ap debug radio-stats <ap>    # Radio debug
```

---

### 6.6 Security Troubleshooting

#### 802.1X Issues
```
show dot1x authenticator          # 802.1X status
show dot1x authenticator interface 1/1/1  # Per-interface
show dot1x authenticator statistics      # Statistics
show aaa servers                   # RADIUS server status
show aaa authentication            # AAA config
```

#### Common 802.1X Issues
| Issue | Cause | Solution |
|-------|-------|----------|
| Auth failure | Wrong credentials | Check AD/LDAP |
| Auth failure | RADIUS unreachable | Check connectivity |
| Auth failure | Cert issue | Check certificates |
| MAB failure | MAC not in DB | Add MAC to ClearPass |
| Guest access | Portal issue | Check captive portal |

#### RADIUS Troubleshooting
```
show aaa servers                   # Server status
show aaa statistics                # AAA statistics
show radius-server                 # RADIUS config
show radius-server statistics      # RADIUS statistics
```

---

### 6.7 VSX Troubleshooting

#### VSX Status
```
show vsx status                   # VSX operational status
show vsx config-consistency       # Config sync status
show vsx statistics               # VSX statistics
show vsx keepalive                # Keepalive status
```

#### Common VSX Issues
| Issue | Cause | Solution |
|-------|-------|----------|
| Out-of-sync | Config mismatch | Check vsx-sync config |
| Split-brain | Keepalive failure | Check keepalive path |
| ISL failure | Cable/SFP issue | Check physical |
| Role conflict | Priority mismatch | Check role config |

---

### 6.8 ClearPass Troubleshooting

#### ClearPass Status
```
# On ClearPass CLI
show services                     # Service status
show cluster                      # Cluster status
show radiusd                      # RADIUS daemon
show tomcat                       # Web services
```

#### ClearPass Logs
```
/var/log/radius/radius.log        # RADIUS logs
/var/log/tomcat/catalina.out      # Web logs
/var/log/radius/radius-detail.log # Detailed RADIUS
```

#### Common ClearPass Issues
| Issue | Cause | Solution |
|-------|-------|----------|
| Auth failure | Service down | Restart service |
| Profiling failure | SNMP issue | Check SNMP config |
| Guest access | Portal issue | Check portal config |
| Cert issue | Expired cert | Renew certificate |

---

### 6.9 System Troubleshooting

#### System Health
```
show system                       # System info
show version                      # OS version
show running-config               # Current config
show log                          # System log
show environment all              # Environment status
show resource-utilization         # CPU/memory
```

#### Configuration Issues
```
show running-config               # Current config
show startup-config               # Saved config
show configuration log            # Config history
show diff running-config startup-config  # Config diff
```

#### Firmware Issues
```
show version                      # Current version
show firmware                     # Firmware info
copy <source> <destination>       # Firmware update
boot system <image>               # Boot from image
```

---

### 6.10 Troubleshooting Tools

#### Built-in Tools
```
ping                              # Connectivity test
traceroute                        # Path tracing
tcpdump                           # Packet capture
sFlow                             # Traffic sampling
port mirroring                    # Traffic copy
```

#### External Tools
- **Wireshark:** Packet analysis
- **iPerf:** Bandwidth testing
- **Nmap:** Network scanning
- **NetFlow/sFlow collector:** Traffic analysis

#### Port Mirroring Configuration
```
! Create mirror session
switch(config)# mirror session 1
switch(config-mirror)# source interface 1/1/1
switch(config-mirror)# destination interface 1/1/48
switch(config-mirror)# exit

! Verify
show mirror session 1
```

---

### 6.11 Lab Exercise: Troubleshooting Scenarios

#### Scenario 1: No Network Connectivity
```
Symptom: PC cannot access network
Steps:
1. Check physical connection (cable, port LED)
2. Check interface status (show interface)
3. Check VLAN assignment (show vlan)
4. Check DHCP (show dhcp snooping)
5. Check ARP (show ip arp)
6. Check routing (show ip route)
```

#### Scenario 2: Slow Wireless Performance
```
Symptom: Wireless is slow
Steps:
1. Check signal strength (show station-table)
2. Check channel utilization (show ap radio-stats)
3. Check client data rates (show ap client-stats)
4. Check for interference (spectrum analysis)
5. Check QoS configuration
6. Check bandwidth limits
```

#### Scenario 3: 802.1X Authentication Failure
```
Symptom: User cannot authenticate
Steps:
1. Check RADIUS server status (show aaa servers)
2. Check 802.1X config (show dot1x)
3. Check user credentials
4. Check certificates (if EAP-TLS)
5. Check ClearPass logs
6. Test with known-good credentials
```

#### Scenario 4: VSX Out-of-Sync
```
Symptom: VSX pair shows out-of-sync
Steps:
1. Check VSX status (show vsx status)
2. Check config consistency (show vsx config-consistency)
3. Check ISL link (show interface)
4. Check keepalive (show vsx keepalive)
5. Compare configs between peers
6. Re-sync if needed
```

---

### 6.12 Ringkasan Materi

| Topik | Poin Kunci |
|-------|------------|
| Methodology | Define, gather, analyze, solve, verify, document |
| Physical Layer | Cables, SFPs, PoE, interface status |
| Data Link | VLAN, STP, LAG troubleshooting |
| Network Layer | Ping, traceroute, OSPF, routing |
| Wireless | AP status, client debug, performance |
| Security | 802.1X, RADIUS, ClearPass logs |
| VSX | Status, config consistency, keepalive |
| Tools | Ping, traceroute, tcpdump, port mirror |

---

### 6.13 Referensi

1. ArubaOS-CX Troubleshooting Guide
2. Aruba Wireless Troubleshooting Guide
3. ClearPass Troubleshooting Guide
4. Aruba VSX Troubleshooting Guide
5. Network Troubleshooting Best Practices
6. HPE7-A01 Exam Preparation Guide
