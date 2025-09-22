"use client";

import { TechnologyBuilder } from "./TechnologyBuilder";

export const USED_TECHNOLOGIES = [
  new TechnologyBuilder()
    .setName("Nextjs")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/nextjs/nextjs-original-wordmark.svg"
    )
    .setUrl("https://nextjs.org/")
    .setMono(true)
    .build(),

  new TechnologyBuilder()
    .setName("React")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/react/react-original-wordmark.svg"
    )
    .setUrl("https://react.dev/")
    .build(),
  new TechnologyBuilder()
    .setName("TailwindCSS")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/tailwindcss/tailwindcss-original.svg"
    )
    .setUrl("https://tailwindcss.com/")
    .build(),
  new TechnologyBuilder()
    .setName("EsLint")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/eslint/eslint-original-wordmark.svg"
    )
    .setUrl("https://eslint.org/")
    .build(),

  new TechnologyBuilder()
    .setName("Axios")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/axios/axios-plain-wordmark.svg"
    )
    .setUrl("https://axios-http.com/docs/intro")
    .build(),

  new TechnologyBuilder()
    .setName("React Icons")
    .setPath(
      "https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg"
    )
    .setUrl("https://react-icons.github.io/react-icons/")
    .build(),

  new TechnologyBuilder()
    .setName("Redis")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/redis/redis-plain.svg"
    )
    .setUrl("https://redis.io/")
    .build(),

  new TechnologyBuilder()
    .setName("Framer Motion")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/framermotion/framermotion-original-wordmark.svg"
    )
    .setMono(true)
    .setUrl("https://motion.dev/")
    .build(),

  new TechnologyBuilder()
    .setName("Tanstack React Query")
    .setPath("/svgs/react-query.svg")
    .setUrl("https://tanstack.com/query/latest")
    .build(),
  new TechnologyBuilder()
    .setName("React Hook Form")
    .setPath(
      "https://react-hook-form.com/images/logo/react-hook-form-logo-only.svg"
    )
    .setUrl("https://react-hook-form.com/")
    .build(),

  new TechnologyBuilder()
    .setName("Rechart")
    .setUrl("https://recharts.org/")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/chartjs/chartjs-original.svg"
    )
    .build(),
  new TechnologyBuilder()
    .setName("HeroUI")
    .setPath("/svgs/heroui.svg")
    .setUrl("https://www.heroui.com/")
    .setMono(true)
    .build(),

  new TechnologyBuilder()
    .setName(".NET")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/dotnetcore/dotnetcore-original.svg"
    )
    .setUrl("https://dotnet.microsoft.com/en-us/")
    .build(),

  new TechnologyBuilder()
    .setName("Swagger")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/swagger/swagger-original.svg"
    )
    .setUrl("https://swagger.io/")
    .build(),

  new TechnologyBuilder()
    .setName("Microsoft SQL Server")
    .setPath(
      "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/microsoftsqlserver/microsoftsqlserver-original.svg"
    )
    .setUrl("https://www.microsoft.com/en-us")
    .build(),

  new TechnologyBuilder()
    .setName("Fluent Validation")
    .setPath(
      "https://api.nuget.org/v3-flatcontainer/fluentvalidation/12.0.0/icon"
    )
    .setUrl("https://fluentvalidation.net/")
    .build(),

  new TechnologyBuilder()
    .setName("SeriLog")
    .setPath(
      "https://raw.githubusercontent.com/serilog/serilog.github.io/master/images/serilog-180px.png"
    )
    .setUrl("https://serilog.net/")
    .build(),

  new TechnologyBuilder()
    .setName("Lucene.NET")
    .setPath("/svgs/lucene-net.svg")
    .setUrl("https://lucenenet.apache.org/")
    .build(),
];
