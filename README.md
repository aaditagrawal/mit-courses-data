# Course Explorer

A modern course exploration platform built with Next.js, featuring an interactive network graph visualization of course relationships and a clean, responsive UI.

## About the Project

Course Explorer is designed to help students and educators visualize and explore course relationships across different academic disciplines. The platform provides an intuitive way to understand course prerequisites, dependencies, and connections through an interactive network graph.

## Features

- **Interactive Course Network Visualization**: Explore course relationships through an interactive graph powered by Sigma.js 4
- **Advanced Search**: Quickly find courses using the command menu with fuzzy search capabilities
- **Course Details**: View comprehensive information about each course including prerequisites and descriptions
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Radix UI components and Tailwind CSS for a polished user experience

## Live Demo

The application is live at: [https://courses.coolstuff.work](https://courses.coolstuff.work)

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS
- **Visualization**: Sigma.js 4 for course relationship graphs
- **Icons**: Lucide React
- **State Management**: React Context API
- **Deployment**: Cloudflare Workers via vinext

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js app routes
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and types
│   └── styles/              # Global styles
├── branch-json/             # Course data in JSON format
└── ...
```

## Key Components

### Network Graph
The interactive network graph visualizes course relationships using force-directed layout. Courses are represented as nodes and relationships as edges, allowing users to explore dependencies and connections.

### Command Menu
A powerful search interface that allows users to quickly find courses using fuzzy search. The command menu supports keyboard navigation and provides instant results.

### Course Details
Detailed course information including title, code, description, prerequisites, and related courses. The interface is designed to be clean and easy to navigate.

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/course-web.git
cd course-web

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

### Running the Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun run start
```

### Linting

```bash
npm run lint
```

### Cloudflare build and preview

The deprecated `@cloudflare/next-on-pages` adapter does not support Next.js 16.
The Cloudflare build uses vinext and the Cloudflare Vite plugin. The standard
Next.js development and production build commands still work.

```bash
bun install --frozen-lockfile
bun run workers:build
bunx wrangler deploy --dry-run
bun run workers:preview
```

`workers:build` compiles the client assets and server bundle in `dist/`, generates
Next route types, and checks the application with tsrs. Wrangler reads the Vite
generated deployment config automatically. CI checks this build on every change.

The local config targets the Cloudflare Worker named `mit-courses-data`, with
`nodejs_compat` and the existing `2024-12-16` compatibility date. No bindings or
cloud resources are required for the app's bundled course data.

`bun run workers:deploy` builds and deploys to Workers. It does not update an
existing Pages site or move `courses.coolstuff.work` to the Worker. Moving that
custom domain from Pages is a separate hosting cutover; this dependency migration
has not changed any live deployment or domain configuration.

References: [vinext migration](https://github.com/cloudflare/vinext/tree/main/.agents/skills/migrate-to-vinext),
[Cloudflare Pages to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).

### Transitive security patch

vinext 1.2.1 uses `@vercel/og` 1.0.3, whose Satori 0.33.5 pins `fflate` 0.7.3.
The version-scoped Bun override selects 0.7.5 for affected 0.7 requests to fix
[GHSA-px8p-9vwx-vf98](https://github.com/advisories/GHSA-px8p-9vwx-vf98), a malformed
ZIP64 denial of service in `unzipSync`. It leaves 0.8 consumers unchanged. Remove
the override when upstream requests a patched release. This uses
[Bun's version-scoped overrides](https://bun.sh/docs/pm/overrides#version-scoped-overrides).
Bun writes lockfile version 3 for this selector; use current Bun, as CI does.

## Data Structure

Course data is stored in JSON files in the `branch-json/` directory. Each file represents a different academic branch and contains:

- Course codes
- Course titles
- Prerequisites
- Descriptions
- Relationships to other courses

## Development Guidelines

### Adding New Courses

1. Create a new JSON file in the `branch-json/` directory
2. Follow the existing data structure format
3. Update the course data loader in `src/lib/courses.ts`

### Customizing the UI

- Modify components in the `src/components/` directory
- Update styles in the `src/styles/` directory
- Configure theme in `src/components/theme-provider.tsx`

### Adding New Features

1. Create a new branch for your feature
2. Implement the feature following existing patterns
3. Add appropriate tests
4. Update documentation if needed
5. Submit a pull request

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](contributing.md) file for detailed guidelines on how to contribute to this project.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue on the GitHub repository.

## Acknowledgements

- Built with [Next.js](https://nextjs.org)
- UI components from [Radix UI](https://www.radix-ui.com)
- Network visualization powered by [Sigma.js 4](https://www.sigmajs.org/)
- Icons from [Lucide](https://lucide.dev)

## Future Roadmap

- Add user authentication
- Implement course bookmarking
- Add course reviews and ratings
- Expand course database
- Add academic planning tools
