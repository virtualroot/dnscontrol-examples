// 02_toolbox.sh.js
// DNSControl can manage multiple providers, here we add Cloudflare

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

// Cloudflare provider
var CFLARE = NewDnsProvider('cloudflare.com','CLOUDFLAREAPI', {"manage_redirects": true});

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND), DnsProvider(CFLARE),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","toolbox.sh."),
  CNAME("mail","toolbox.sh."),
  CNAME("no-cloud","toolbox.sh.", CF_PROXY_OFF),
  MX("@",10,"mail.toolbox.sh.")

  CF_REDIRECT("old.toolbox.sh/*", "https://toolbox.sh/$2")
)
