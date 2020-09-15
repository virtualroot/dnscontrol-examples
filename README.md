# dnscontrol-examples

**DNSControl** is a system for managing DNS zones across multiple providers with a simple DSL.

Here you will find a bunch of examples I been collecting from different places, check [Resources](#resources) for more details.

## Install

Add plugin to [asdf](https://github.com/asdf-vm/asdf).

```bash
asdf plugin-add dnscontrol https://github.com/beardix/asdf-dnscontrol.git
asdf install # takes dnscontrol version from .tool-versions
```

## Examples

1. Simple Bind zone
2. DNSControl can manage multiple providers, here we add Cloudflare
3. Macros and other examples
4. For loop
5. Variables
6. Parked domains on Cloudflare

## Resources

* [Introducing DNSControl](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/)
* [Presentation](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)
* [Documentation](https://stackexchange.github.io/dnscontrol/)
* [Repository](https://github.com/StackExchange/dnscontrol)

## Quote

> How the cloud works: 30 second DNS TTLs and hope.

[source](https://twitter.com/markimbriaco/status/308665700946436097)
