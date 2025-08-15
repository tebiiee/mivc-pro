# Changelog

All notable changes to micv.pro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Open source preparation with comprehensive documentation
- Security policy and vulnerability reporting process
- Contributing guidelines for community participation
- Issue and PR templates for better collaboration

## [1.1.0] - 2024-12-15

### Added
- **Bilingual CV Generation**: Simultaneous Spanish and English CV creation
- **Dual PDF Download**: Automatic download of both language versions
- **Language Toggle**: Instant switching between Spanish and English previews
- **Smart Persistence**: localStorage system to avoid unnecessary API calls
- **Modern UI**: Clay Design System with glassmorphism effects
- **Decorative Elements**: SVG flower decorations for visual appeal
- **Mobile Optimization**: Full-width utilization on mobile devices
- **Chronological Sorting**: Improved work experience ordering algorithm

### Changed
- **AI Model**: Upgraded to Google Gemini 2.5 Flash Lite Preview
- **Prompt Engineering**: Enhanced bilingual prompt for better results
- **Template System**: Redesigned all templates for single-page optimization
- **Responsive Design**: Improved mobile and tablet experience
- **Typography**: Switched to Inter font for modern appearance

### Fixed
- **Build Errors**: Resolved all ESLint and TypeScript compilation issues
- **API Key Security**: Removed exposed API keys from example files
- **Template Switching**: Fixed data persistence when changing templates
- **PDF Generation**: Improved reliability and formatting consistency
- **Date Formatting**: Better handling of current positions and date ranges

### Security
- **Input Validation**: Enhanced sanitization of user inputs
- **API Protection**: Improved rate limiting and error handling
- **Data Privacy**: Automatic cleanup of user data after download

## [1.0.0] - 2024-11-30

### Added
- **Initial Release**: Basic CV generation with AI
- **Three Templates**: Harvard, Modern Blue, and Modern Gray designs
- **PDF Export**: Single-page optimized PDF generation
- **Responsive Design**: Mobile-friendly interface
- **OpenRouter Integration**: AI-powered content generation
- **Template Selector**: Visual template preview and selection
- **Form Validation**: Input validation and error handling

### Technical
- **Next.js 15**: Modern React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework
- **React PDF**: Client-side PDF generation
- **Lucide Icons**: Modern icon library

## [0.1.0] - 2024-11-15

### Added
- **Project Setup**: Initial project structure and configuration
- **Basic UI**: Simple form for CV data input
- **Proof of Concept**: Basic AI integration for CV generation

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Release Process

1. Update version in `package.json`
2. Update this CHANGELOG.md
3. Create a new release on GitHub
4. Deploy to production

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to contribute to this project.
