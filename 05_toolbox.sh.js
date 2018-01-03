// 05_toolbox.sh.js
// Variables

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

// Variables
var MAIN_DC = IP("192.0.2.0"); // TEST-NET-1
var BACKUP_DC = IP("198.51.100.0"); // TEST-NET-2

var BaseIP = MAIN_DC;

// Change our S3 location!
var LOCATION = "eu-west-1"; // Ireland
//var LOCATION = "eu-central-1"; // Frankfurt

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND), DnsProvider(CFLARE),
  DefaultTTL("2h"),
  A("@", BaseIP + 34),
  A("no-cloud", BaseIP + 34, CF_PROXY_OFF),
  CNAME("assets", "bucket.s3-" + LOCATION + ".amazonaws.com."),
  CNAME("www","toolbox.sh."),
)
