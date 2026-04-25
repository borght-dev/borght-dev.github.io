---
title: ".NET 8 migration"
date: 2025-05-16
---

Together with the development team at Gomocha, we successfully migrated over 20 components from .NET Framework 4.8 to .NET 8 within approximately 8 weeks.

During this process, I modernized our logging framework by transitioning from log4net to Serilog and standardized the configuration by consolidating all `appsettings.json` files. Additionally, I introduced `Directory.Build.props` and `Directory.Packages.props` files to facilitate simpler maintenance and dependency management going forward.

I also leveraged this migration as an opportunity to optimize and enhance our build pipeline, significantly streamlining our development and deployment processes.
