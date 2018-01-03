// 05_toolbox.sh.js
// Parked domains

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

var parkedDomains = [
    "example.com",
    "example.net",
    "example.org",
]

var parkedIP = "203.0.113.45";

_.each(parkedDomains, function(d) {
    D(d, REG_NONE, DnsProvider(CFLARE),
        A("@", parkedIP),
        A("*", parkedIP, CF_PROXY_OFF),

        // 301 all subdomains to https://toolbox.sh/
        // Ex: *.example.com/* => https://toolbox.sh/
        CF_REDIRECT("*."+ d +"/*", "https://toolbox.sh/"),
        // 301 domain to https://toolbox.sh/
        // Ex: example.com/* => https://toolbox.sh/
        CF_REDIRECT(d +"/*", "https://toolbox.sh/")
    )
})
