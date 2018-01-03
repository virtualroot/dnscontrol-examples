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
    'ip4:1.2.3.0/24',           // NY mail server
    'ip4:4.3.2.0/24',           // CO mail server
    'include:_spf.google.com',  // Google Apps
    'include:mailgun.org',      // Mailgun (requested by Ticket#12345)
    'include:servers.mcsv.net', // MailChimp (requested by Ticket#54321)
    'include:sendgrid.net',     // SendGrid (requested by Ticket#23456)
    'include:spf.mtasv.net',    // Desk.com (needed by IT team)
    '~all'
].join(' '));

D("toolbox.sh", REG_NONE, DnsProvider(DNS_BIND), DnsProvider(CFLARE),
  DefaultTTL("2h"),
  A("@", "192.0.2.34"), // TEST-NET-1
  CNAME("www","toolbox.sh."),
  CNAME("no-cloud","toolbox.sh.", CF_PROXY_OFF),
  GOOGLE_APPS_RECORDS,
  SPF_RECORDS,

  CF_REDIRECT("old.toolbox.sh/*", "https://toolbox.sh/$2")
)
