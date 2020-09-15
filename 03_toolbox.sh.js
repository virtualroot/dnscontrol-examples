// 03_toolbox.sh.js
// Macros and other examples

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

// MACROS
var GOOGLE_APPS_RECORDS = [
  MX('@', 1, 'aspmx.l.google.com.'),
  MX('@', 5, 'alt1.aspmx.l.google.com.'),
  MX('@', 5, 'alt2.aspmx.l.google.com.'),
  MX('@', 10, 'alt3.aspmx.l.google.com.'),
  MX('@', 10, 'alt4.aspmx.l.google.com.'),
  CNAME('calendar', 'ghs.googlehosted.com.'),
  CNAME('drive', 'ghs.googlehosted.com.'),
  CNAME('mail', 'ghs.googlehosted.com.'),
  CNAME('groups', 'ghs.googlehosted.com.'),
  CNAME('sites', 'ghs.googlehosted.com.'),
  CNAME('start', 'ghs.googlehosted.com.'),
]

// Complex SPF records with comments
var SPF_RECORDS = TXT('@', [
  'v=spf1',
  'ip4:192.0.2.0/24',         // Mail server
  'include:_spf.google.com',  // Google Apps
  'include:mailgun.org',      // Mailgun - Ticket JIRA-123
  'include:spf.mtasv.net',    // Desk.com - Ticket SUPPORT-123
  '~all'
].join(' '));

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND), DnsProvider(CFLARE),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","toolbox.sh."),
  CNAME("no-cloud","toolbox.sh.", CF_PROXY_OFF),
  GOOGLE_APPS_RECORDS,
  SPF_RECORDS,

  CF_REDIRECT("blog.toolbox.sh/*", "https://toolbox.sh/blog/$2")
)
