// 04_toolbox.sh.js
// for 

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

var stage_subdomains = [];

for(var i=100;i<=123;++i){
  stage_subdomains.push( A('s'+i+'', '192.0.2.'+i));
  stage_subdomains.push( A('*.s'+i+'', '192.0.2.'+i));
}

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND), DnsProvider(CFLARE),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","toolbox.sh."),
  CNAME("no-cloud","toolbox.sh.", CF_PROXY_OFF),
  stage_subdomains
)
