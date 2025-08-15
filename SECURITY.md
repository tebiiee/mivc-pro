# Security Policy

## Supported Versions

We actively support the following versions of micv.pro:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | ✅ Yes             |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 Private Disclosure

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email us directly** at: [security@micv.pro] (if available) or create a private security advisory
2. **Use GitHub Security Advisories**: Go to the Security tab in our repository
3. **Include detailed information**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### 📋 What to Include

When reporting a security issue, please provide:

- **Vulnerability type** (e.g., XSS, injection, authentication bypass)
- **Affected components** (frontend, API, dependencies)
- **Attack scenario** and potential impact
- **Proof of concept** (if safe to share)
- **Environment details** (browser, OS, etc.)

### ⏱️ Response Timeline

- **Initial response**: Within 48 hours
- **Vulnerability assessment**: Within 1 week
- **Fix development**: Depends on severity
- **Public disclosure**: After fix is deployed

### 🛡️ Security Measures

micv.pro implements several security measures:

#### Data Protection
- **No persistent storage** of user data on servers
- **Automatic data deletion** after PDF download
- **Client-side processing** when possible
- **Secure API communication** with OpenRouter

#### Input Validation
- **Sanitization** of all user inputs
- **Rate limiting** on API endpoints
- **Content Security Policy** headers
- **XSS protection** measures

#### Infrastructure
- **HTTPS enforcement** in production
- **Environment variable protection**
- **Secure headers** configuration
- **Regular dependency updates**

### 🔍 Common Security Considerations

#### API Keys
- Never commit API keys to version control
- Use environment variables for sensitive data
- Rotate keys regularly
- Monitor API usage for anomalies

#### User Data
- Minimize data collection
- Clear data after use
- No tracking or analytics on sensitive data
- Transparent privacy practices

#### Dependencies
- Regular security audits with `npm audit`
- Automated dependency updates
- Monitoring for known vulnerabilities
- Minimal dependency footprint

### 🚨 Security Best Practices for Contributors

When contributing to micv.pro:

1. **Never commit secrets**
   - Use `.env.local` for local development
   - Check `.gitignore` includes sensitive files
   - Use placeholder values in examples

2. **Validate all inputs**
   - Sanitize user-provided content
   - Validate file uploads
   - Check data types and ranges

3. **Follow secure coding practices**
   - Use TypeScript for type safety
   - Implement proper error handling
   - Avoid eval() and similar functions

4. **Test security implications**
   - Test with malicious inputs
   - Verify authentication flows
   - Check for information leakage

### 📞 Contact Information

For security-related inquiries:

- **GitHub Security Advisories**: Preferred method
- **Email**: Create an issue with [SECURITY] tag
- **Response time**: 48 hours maximum

### 🏆 Recognition

We appreciate security researchers who help keep micv.pro safe:

- Responsible disclosure will be acknowledged
- Contributors will be credited (with permission)
- Serious vulnerabilities may be eligible for recognition

### 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

---

Thank you for helping keep micv.pro and our users safe! 🛡️
