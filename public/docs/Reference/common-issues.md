# Common Issues - Quick Reference

> **Quick Fix Guide**: The 10 most common SuperClaude issues with rapid solutions. Each issue is designed to be resolved in under 2 minutes.

**For Detailed Help**: If these quick fixes don't work, see the [Comprehensive Troubleshooting Guide](troubleshooting.md) for detailed solutions.

> **Command Context**: **🖥️ Terminal Commands** (for installation) vs **💬 Claude Code Commands** (`/sc:` for development)

## Top 10 Quick Fixes

### 1. 🖥️ Permission Denied During Installation
**Error**: `ERROR: Permission denied: '/home/user/.claude/CLAUDE.md'`

**Quick Fix**:
```bash
sudo chown -R $USER ~/.claude && chmod 755 ~/.claude
```

**Alternative**: Use user installation: `pip install --user SuperClaude`

[Detailed Help →](troubleshooting.md#common-installation-problems)

---

### 2. 🖥️ Python Version Too Old  
**Error**: `ERROR: SuperClaude requires Python 3.8+`

**Quick Fix**:
```bash
python3 --version  # Check current version
# If < 3.8, install newer Python:
sudo apt install python3.9 python3.9-pip  # Linux
python3.9 -m pip install SuperClaude
```

[Detailed Help →](troubleshooting.md#python-version-compatibility)

---

### 3. 🖥️ Component Installation Failed
**Error**: `ERROR: Component 'mcp' installation failed`

**Quick Fix**:
```bash
python3 -m SuperClaude install --components core
python3 -m SuperClaude install --components mcp --force
```

[Detailed Help →](troubleshooting.md#component-installation-failures)

---

### 4. 💬 Commands Not Working in Claude Code
**Error**: `/sc:help` command not recognized

**Quick Fix**:
1. Restart Claude Code completely
2. Verify installation: `cat ~/.claude/CLAUDE.md | head -5`
3. If empty, reinstall: `python3 -m SuperClaude install --force`

[Detailed Help →](troubleshooting.md#command-execution-problems)

---

### 5. 🖥️ "SuperClaude" Command Not Found
**Error**: `command not found: SuperClaude`

**Quick Fix**:
```bash
# Try lowercase:
superclaude --version
# Or use module form:
python3 -m SuperClaude --version
```

[Detailed Help →](troubleshooting.md#command-not-found)

---

### 6. 🖥️ Windows Path Problems
**Error**: `Cannot find file 'C:\Users\name\.claude\CLAUDE.md'`

**Quick Fix**:
```cmd
set CLAUDE_CONFIG_DIR=%USERPROFILE%\.claude
python -m SuperClaude install --install-dir "%CLAUDE_CONFIG_DIR%"
```

[Detailed Help →](troubleshooting.md#windows-platform-issues)

---

### 7. 💬 Commands Hang or Timeout
**Error**: Commands start but never complete

**Quick Fix**:
1. Press Ctrl+C to cancel
2. Try smaller scope: `/sc:analyze src/` instead of entire project
3. Restart Claude Code session

[Detailed Help →](troubleshooting.md#command-timeout-or-hanging)

---

### 8. 🖥️ Node.js Missing for MCP Servers
**Error**: `Node.js not found` during MCP installation

**Quick Fix**:

**Linux/macOS**:
```bash
curl -fsSL https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-x64.tar.xz | tar -xJ
```

**Windows**:
```cmd
winget install OpenJS.NodeJS
```

[Detailed Help →](troubleshooting.md#mcp-server-connection-problems)

---

### 9. 💬 Memory/Resource Errors
**Error**: Insufficient memory or resources

**Quick Fix**:

**Linux/macOS**:
```bash
# Clear temporary data:
rm -rf ~/.claude/tmp/ ~/.claude/cache/
# Work with smaller projects
# Close other applications
```

**Windows**:
```cmd
# Clear temporary data:
rmdir /s /q "%USERPROFILE%\.claude\tmp" "%USERPROFILE%\.claude\cache" 2>nul
REM Work with smaller projects
REM Close other applications
```

[Detailed Help →](troubleshooting.md#performance-problems-and-optimization)

---

### 10. 🖥️ Fresh Installation Needed
**Error**: Multiple issues, corrupted installation

**Quick Fix**:

**Linux/macOS**:
```bash
rm -rf ~/.claude/
pip uninstall SuperClaude
pip install SuperClaude
python3 -m SuperClaude install --fresh
```

**Windows**:
```cmd
rmdir /s /q "%USERPROFILE%\.claude"
pip uninstall SuperClaude
pip install SuperClaude
python -m SuperClaude install --fresh
```

[Detailed Help →](troubleshooting.md#reset-and-recovery-procedures)

---

## Emergency Recovery

**Complete Reset** (when everything is broken):

**Linux/macOS**:
```bash
rm -rf ~/.claude/ && pip uninstall SuperClaude && pip install SuperClaude && python3 -m SuperClaude install --fresh
```

**Windows**:
```cmd
rmdir /s /q "%USERPROFILE%\.claude" && pip uninstall SuperClaude && pip install SuperClaude && python -m SuperClaude install --fresh
```

**Test Installation**:

**Linux/macOS**:
```bash
python3 -m SuperClaude --version && echo "✅ Installation OK"
```

**Windows**:
```cmd
python -m SuperClaude --version && echo ✅ Installation OK
```

**Test Claude Code Integration**:
Type `/sc:help` in Claude Code - should show available commands.

---

## Need More Help?

- **🔍 Detailed Solutions**: [Comprehensive Troubleshooting Guide](troubleshooting.md)
- **📖 Setup Help**: [Installation Guide](../Getting-Started/installation.md)  
- **🆘 Report Issues**: [GitHub Issues](https://github.com/SuperClaude-Org/SuperClaude_Framework/issues)
- **📧 Emergency Contact**: anton.knoery@gmail.com