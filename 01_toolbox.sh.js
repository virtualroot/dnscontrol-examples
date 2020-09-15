// 01_toolbox.sh.js
// First define registrar & providers

// No registrar
var REG_NONE = NewRegistrar('none', 'NONE');

// BIND Provider
var DNS_BIND = NewDnsProvider('bind', 'BIND', {
  'default_soa': {
    'master': 'ns1.toolbox.sh.',
    'mbox': 'sysadmin.toolbox.sh.',
    'refresh': 3600,
    'retry': 600,
    'expire': 604800,
    'minttl': 1440,
  },
  'default_ns': [
    'ns1.toolbox.sh.',
    'ns2.toolbox.sh.',
  ]
});

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","toolbox.sh."),
  CNAME("mail","toolbox.sh."),
  MX("@",10,"mail.toolbox.sh.")
)
