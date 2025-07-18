# Development Workflow Guide

## Before Starting ANY Work

### 1. Branch Creation (MANDATORY)

Always create appropriate branch before coding:

```bash
git checkout -b [type]/[component-name]-[description]
```

**Branch naming examples:**

- feature/ui-markdown-component
- refactor/ui-select-simplify
- fix/ui-button-accessibility
- docs/component-documentation

### 2. Understand the Task

- Review existing component (if refactor)
- Check CLAUDE.md for KondoKode principles
- Identify target line counts and success criteria
- Note accessibility requirements

## During Development

### 3. Code Development Standards

- Follow CLAUDE.md KondoKode principles
- Extract complex HTML to template methods
- Accessibility is non-negotiable
- Test frequently in Storybook

### 4. Self-Evaluation

- Create honest report card with grades
- Compare against gold standards (ui-text, ui-card)
- Check KondoKode compliance percentage
- Document any deviations from targets

## When Work is Complete

### 5. Pre-Commit Checklist

- Component works in Storybook
- Accessibility tested (keyboard nav, screen reader)
- Code follows KondoKode principles
- Line counts documented
- Self-grading report completed

### 6. Commit and Push Process

**Use descriptive commit messages:**

```
git add .
git commit -m "refactor(ui-select): reduce complexity from 230 to 150 lines

- Simplified keyboard navigation logic
- Extracted HTML template method
- Improved accessibility compliance
- KondoKode grade: B+ (target exceeded for accessibility)"

git push origin [branch-name]
```

### 7. Documentation Updates

- Update component .md file if needed
- Note any architectural decisions
- Update action plans or progress tracking

**Branch Management**

- When to Merge

**Component fully functional**

- All tests passing
- Accessibility validated
- Human approval received

**Communication**

- Always announce when work is complete
- Provide summary of changes and metrics
- Ask for review/approval before merging

**Emergency Protocols
If Something Goes Wrong**

- Never force push
- Create issue branch to fix problems
- Document what went wrong for learning

**If Scope Creeps**

- Stop and reassess with human
- Don't add features beyond requirements
- Remember: KondoKode over feature completeness
